#!/bin/bash

# Git Subtree Merge Script
# This script merges the "abykonline" repository into the main "abyk" repository
# using git subtree, preserving full commit history.
#
# Prerequisites:
# - Run this script from the root of your "abyk" repository
# - Make sure you have the URL or path to the "abykonline" repository
# - Ensure you have write permissions to both repositories

set -e  # Exit on any error

echo "🚀 Starting git subtree merge process..."

# Configuration - Update these variables as needed
SUBTREE_REPO_NAME="abykonline"
SUBTREE_PREFIX="abykonline"  # This will be the subfolder name in your main repo
BRANCH_NAME="main"           # Branch to merge from the subtree repo

# You need to replace this with the actual URL of your abykonline repository
# Examples:
# - GitHub: https://github.com/username/abykonline.git
# - Local path: /path/to/abykonline
ABYKONLINE_REPO_URL="https://github.com/abyk4329/abykonline.git"

echo "📁 Current directory: $(pwd)"
echo "🎯 Target subfolder: ${SUBTREE_PREFIX}"
echo "🌐 Source repository: ${ABYKONLINE_REPO_URL}"

# Step 1: Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository. Please run this script from your 'abyk' repository root."
    exit 1
fi

# Step 2: Check if the remote already exists
if git remote get-url ${SUBTREE_REPO_NAME} > /dev/null 2>&1; then
    echo "⚠️  Remote '${SUBTREE_REPO_NAME}' already exists. Removing it first..."
    git remote remove ${SUBTREE_REPO_NAME}
fi

# Step 3: Add the abykonline repository as a remote
echo "🔗 Adding '${SUBTREE_REPO_NAME}' as a remote..."
git remote add ${SUBTREE_REPO_NAME} ${ABYKONLINE_REPO_URL}

# Step 4: Verify the remote was added successfully
echo "✅ Verifying remote was added:"
git remote -v | grep ${SUBTREE_REPO_NAME}

# Step 5: Fetch from the remote to ensure we have the latest commits
echo "📥 Fetching from remote '${SUBTREE_REPO_NAME}'..."
git fetch ${SUBTREE_REPO_NAME}

# Step 6: Check if the subtree prefix already exists
if [ -d "${SUBTREE_PREFIX}" ]; then
    echo "⚠️  Directory '${SUBTREE_PREFIX}' already exists!"
    echo "If you want to update an existing subtree, use the update command instead:"
    echo "git subtree pull --prefix=${SUBTREE_PREFIX} ${SUBTREE_REPO_NAME} ${BRANCH_NAME}"
    read -p "Do you want to continue and merge anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Aborted by user"
        exit 1
    fi
fi

# Step 7: Import the abykonline repository as a subtree
echo "🌳 Adding subtree from '${SUBTREE_REPO_NAME}' into '${SUBTREE_PREFIX}' folder..."
echo "This will preserve the full commit history of the abykonline repository."
git subtree add --prefix=${SUBTREE_PREFIX} ${SUBTREE_REPO_NAME} ${BRANCH_NAME} --squash

# Step 8: Verify the merge was successful
if [ -d "${SUBTREE_PREFIX}" ]; then
    echo "✅ Subtree merge completed successfully!"
    echo "📊 Contents of ${SUBTREE_PREFIX}:"
    ls -la ${SUBTREE_PREFIX}
else
    echo "❌ Error: Subtree merge may have failed. Directory '${SUBTREE_PREFIX}' not found."
    exit 1
fi

# Information about future updates
echo ""
echo "📝 FUTURE UPDATES:"
echo "To pull updates from the '${SUBTREE_REPO_NAME}' repository in the future, use:"
echo "git subtree pull --prefix=${SUBTREE_PREFIX} ${SUBTREE_REPO_NAME} ${BRANCH_NAME} --squash"
echo ""
echo "To push changes from the subtree back to the original repository, use:"
echo "git subtree push --prefix=${SUBTREE_PREFIX} ${SUBTREE_REPO_NAME} ${BRANCH_NAME}"
echo ""

# Create a helper script for future updates
HELPER_SCRIPT="update_${SUBTREE_REPO_NAME}.sh"
cat > ${HELPER_SCRIPT} << EOF
#!/bin/bash
# Helper script to update the ${SUBTREE_REPO_NAME} subtree

echo "🔄 Updating ${SUBTREE_REPO_NAME} subtree..."
git subtree pull --prefix=${SUBTREE_PREFIX} ${SUBTREE_REPO_NAME} ${BRANCH_NAME} --squash
echo "✅ Update complete!"
EOF

chmod +x ${HELPER_SCRIPT}
echo "📝 Created helper script '${HELPER_SCRIPT}' for future updates."

echo ""
echo "🎉 Git subtree merge process completed!"
echo "The '${SUBTREE_REPO_NAME}' repository has been merged into the '${SUBTREE_PREFIX}' subfolder"
echo "with full commit history preserved."