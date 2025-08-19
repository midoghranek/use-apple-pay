#!/bin/bash

# Prepare for NPM Publishing Script
# Run this script to prepare the use-apple-pay package for publishing

set -e  # Exit on any error

echo "🚀 Preparing use-apple-pay for NPM publishing..."
echo ""

# Step 1: Clean install
echo "📦 Installing dependencies..."
yarn install

# Step 2: Run tests
echo "🧪 Running tests..."
yarn test

# Step 3: Lint code
echo "🔍 Linting code..."
yarn lint

# Step 4: Build package
echo "🏗️  Building package..."
yarn build

# Step 5: Check bundle size
echo "📏 Checking bundle size..."
yarn size

# Step 6: Dry run package
echo "📋 Checking package contents..."
yarn pack --dry-run

echo ""
echo "✅ Package is ready for publishing!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure you're logged into npm: npm whoami"
echo "2. Bump version if needed: yarn version [patch|minor|major]"
echo "3. Publish: yarn publish"
echo "4. Create git tag: git tag v<version> && git push origin v<version>"
echo ""
echo "🔗 For detailed instructions, see PUBLISHING.md"
