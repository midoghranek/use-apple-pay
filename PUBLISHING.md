# Publishing Checklist for use-apple-pay

## Pre-Publishing Steps

### 1. Verify Package Configuration
- [x] Package.json is properly configured with all required fields
- [x] Version number is appropriate (currently 0.1.0)
- [x] Keywords are relevant for discoverability
- [x] Repository and homepage URLs are correct
- [x] License is included (MIT)

### 2. Build and Test
```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Run linting
yarn lint

# Build the package
yarn build

# Check bundle size
yarn size
```

### 3. Verify Package Contents
```bash
# Dry run to see what files will be included
yarn pack --dry-run

# Extract and inspect the tarball
tar -tzf use-apple-pay-v0.1.0.tgz
```

Expected files in the package:
- `dist/` - Built JavaScript and TypeScript declaration files
- `src/` - Source TypeScript files
- `README.md` - Documentation
- `LICENSE` - MIT license
- `package.json` - Package configuration

### 4. Version Management
```bash
# For patch version (0.1.0 -> 0.1.1)
yarn version --patch

# For minor version (0.1.0 -> 0.2.0)
yarn version --minor

# For major version (0.1.0 -> 1.0.0)
yarn version --major
```

## Publishing to NPM

### Option 1: Using yarn publish
```bash
# Login to npm (if not already logged in)
npm login

# Publish the package
yarn publish

# For beta/alpha releases
yarn publish --tag beta
```

### Option 2: Using npm publish
```bash
# Login to npm (if not already logged in)
npm login

# Build first
yarn build

# Publish the package
npm publish

# For beta/alpha releases
npm publish --tag beta
```

## Post-Publishing Steps

1. **Create a Git Tag**
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

2. **Create a GitHub Release**
   - Go to GitHub repository
   - Click "Releases" → "Create a new release"
   - Use the tag you just created
   - Add release notes

3. **Update Documentation**
   - Verify the README displays correctly on npm
   - Update any version references if needed

## Publishing Commands Summary

```bash
# Complete publication workflow
yarn install          # Install dependencies
yarn test             # Run tests
yarn lint             # Check code quality
yarn build            # Build the package
yarn pack --dry-run   # Verify package contents
yarn version patch    # Bump version (if needed)
yarn publish          # Publish to npm
git push origin master --tags  # Push tags to GitHub
```

## Important Notes

- Make sure you're logged into npm: `npm whoami`
- The package name "use-apple-pay" must be available on npm
- The `prepublishOnly` script will automatically run build, test, and lint
- Consider using `npm publish --dry-run` first to test without actually publishing
- You can unpublish within 24 hours if there are issues: `npm unpublish use-apple-pay@0.1.0`

## Security Considerations

- Never publish sensitive information (API keys, tokens, etc.)
- Review .npmignore to ensure only necessary files are included
- Consider enabling 2FA on your npm account
- Use scoped packages (@username/package-name) for organization packages
