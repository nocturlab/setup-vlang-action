# setup-vlang-action
Github Action that allow you to compile v programs without the use of docker (because it's very slow)

## Usage
You just have to setup your workflow like this :

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
    - name: Set up V version 0.1.24
      uses: nocturlab/setup-vlang-action@1.0.0
      with:
        v-version: 0.1.24
      id: v
    - name: Build repository app
      run: v build .
    - name: Run V tests
      run: v test .
```
