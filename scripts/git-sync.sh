#!/usr/bin/env bash

set -euo pipefail

# Step 0: verify we are inside a Git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "[git-sync] Error: current directory is not inside a Git repository." >&2
  exit 1
fi

# Step 0b: ensure we are on the main branch (optional safety)
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
  echo "[git-sync] Error: this script is intended to run on the 'main' branch (current: $current_branch)." >&2
  exit 1
fi

# Step 1: ensure no active Git lock files are present
lock_files=(".git/HEAD.lock" ".git/index.lock")
stale_locks=0

for lock_file in "${lock_files[@]}"; do
  if [ -e "$lock_file" ]; then
    stale_locks=1
    echo "[git-sync] Error: detected Git lock file: $lock_file" >&2

    # Prefer detailed modification timestamp when available
    if command -v stat >/dev/null 2>&1; then
      if stat --format='%y' "$lock_file" >/dev/null 2>&1; then
        lock_mtime=$(stat --format='%y' "$lock_file")
        echo "[git-sync]        Last modified: $lock_mtime" >&2
      elif stat -f '%Sm' "$lock_file" >/dev/null 2>&1; then
        lock_mtime=$(stat -f '%Sm' "$lock_file")
        echo "[git-sync]        Last modified: $lock_mtime" >&2
      fi
    fi

    # Provide fallback details if stat is unavailable
    if [ -z "${lock_mtime:-}" ]; then
      ls -l "$lock_file" >&2 || true
    fi

    echo "[git-sync] Please investigate the owning Git process before rerunning this script." >&2
  fi
done

if [ "$stale_locks" -eq 1 ]; then
  echo "[git-sync] Aborting to avoid corrupting the repository. If the lock file is stale, remove it manually after verifying no Git process is using it." >&2
  exit 2
fi

# Step 2: abort any in-progress merge
if [ -f .git/MERGE_HEAD ]; then
  echo "[git-sync] Aborting unfinished merge..."
  git merge --abort || true
fi

# Step 2b: abort any in-progress rebase
if [ -d .git/rebase-apply ] || [ -d .git/rebase-merge ]; then
  echo "[git-sync] Aborting unfinished rebase..."
  git rebase --abort || true
fi

# Step 3: fetch latest updates from origin
echo "[git-sync] Fetching updates from origin..."
git fetch origin

# Step 3b: capture ahead count to know if we rewrote history
read -r ahead_count _ <<EOF
$(git rev-list --left-right --count HEAD...origin/main)
EOF
needs_force_push=0
if [ "${ahead_count}" -gt 0 ]; then
  needs_force_push=1
fi

# Step 4: rebase local main onto origin/main
echo "[git-sync] Rebasing local changes onto origin/main..."
if ! git pull --rebase origin main; then
  echo "[git-sync] Rebase halted due to conflicts." >&2
  echo "[git-sync] Resolve conflicts, run 'git add <files>', then 'git rebase --continue'." >&2
  exit 1
fi

# Step 5: push updated history back to origin
echo "[git-sync] Pushing changes to origin/main..."
if [ "$needs_force_push" -eq 1 ]; then
  git push --force-with-lease origin main
else
  git push origin main
fi

# Step 6: report success
echo "[git-sync] Synchronization finished successfully."
