# Setup V environment ![Latest version][githubBadge] ![Build][Build] ![Tests][Tests]

GitHub Action that allows you to compile V programs without the use of Docker (because it's very slow).

[githubBadge]: https://img.shields.io/github/v/release/nocturlab/setup-vlang-action
[Build]: https://github.com/nocturlab/setup-vlang-action/workflows/Build/badge.svg 
[Tests]: https://github.com/nocturlab/setup-vlang-action/workflows/Tests/badge.svg

## Usage
You just have to setup your workflow like this:

```yml
# file: .github/workflows/vlang-build-pipeline.yml
name: vlang-build-pipeline

on:
  push:
    paths-ignore:
      - '**.md'

jobs:
  run:
    name: Run
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Set up V version latest
      uses: nocturlab/setup-vlang-action@v1
      with:
        v-version: latest
      id: v
    - name: Build repository app
      run: v .
    - name: Run V tests
      run: v test .
```

## Inputs

- `v-version`: V version. Can be either exact version number, `latest` (by default), or `master` (use the master branch instead of release).
