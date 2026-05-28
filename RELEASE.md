<!-- @format -->

# Release

Use the release scripts from the project root. Each command updates `package.json`
and `package-lock.json`, rebuilds `lib`, creates a git commit, creates a version
tag, and pushes the commit with tags to `origin/main`.

## Patch release

Use this for bug fixes.

```bash
npm run release:patch
```

Example: `0.2.0` becomes `0.2.1` and creates tag `v0.2.1`.

## Minor release

Use this for new backward-compatible features.

```bash
npm run release:minor
```

Example: `0.2.0` becomes `0.3.0` and creates tag `v0.3.0`.

## Major release

Use this for breaking changes.

```bash
npm run release:major
```

Example: `0.2.0` becomes `1.0.0` and creates tag `v1.0.0`.

## Beta release

Use this for prerelease testing.

```bash
npm run release:beta
```

Example: `0.2.0` becomes `0.2.1-beta.0` and creates tag `v0.2.1-beta.0`.

## Manual version

To release an exact version number:

```bash
npm version 0.4.0
git push origin main --follow-tags
```
