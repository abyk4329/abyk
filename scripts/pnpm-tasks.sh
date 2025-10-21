#!/bin/zsh
# Helper script to mirror package.json scripts with pnpm commands.
set -euo pipefail

if [[ $# -lt 1 ]]; then
  cat <<'USAGE'
שימוש: scripts/pnpm-tasks.sh <פקודה>

פקודות זמינות:
  dev                 pnpm dev
  dev:v2              pnpm dev:v2
  build               pnpm build
  build:analyze       pnpm build:analyze
  start               pnpm start
  lint                pnpm lint
  lint:fix            pnpm lint:fix
  typecheck           pnpm typecheck
  test:e2e            pnpm test:e2e
  test:e2e:smoke      pnpm test:e2e:smoke
USAGE
  exit 1
fi

command=$1
shift || true

case "${command}" in
  dev)
    pnpm dev "$@"
    ;;
  dev:v2)
    pnpm dev:v2 "$@"
    ;;
  build)
    pnpm build "$@"
    ;;
  build:analyze)
    pnpm build:analyze "$@"
    ;;
  start)
    pnpm start "$@"
    ;;
  lint)
    pnpm lint "$@"
    ;;
  lint:fix)
    pnpm lint:fix "$@"
    ;;
  typecheck)
    pnpm typecheck "$@"
    ;;
  test:e2e)
    pnpm test:e2e "$@"
    ;;
  test:e2e:smoke)
    pnpm test:e2e:smoke "$@"
    ;;
  list)
    $0
    ;;
  *)
    echo "פקודה לא מוכרת: ${command}" >&2
    exit 1
    ;;
esac
