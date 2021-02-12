# Workflow-dispatch

This repository is for the **GitHub Action** to run a **Workflow-dispatch**.
Which is simple action to trigger a dependent workflow using the [workflow dispatch event](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch).

**The end goal of this tool:**

- Provide a generalized mechanism to trigger workflows that are dependent on a particular workflow.
- Address use cases where `workflow_run` event is not a good fit, such as, when we want more control based on the status of the triggering workflow.

**Constraints**
- We need a personal access token because [events raised from workflows using the GITHUB_TOKEN do not currently trigger other workflows](https://github.community/t/action-does-not-trigger-another-on-push-tag-action/17148/4)

## Table of Contents

- [Workflow-dispatch](#workflow-dispatch)
  - [Table of Contents](#table-of-contents)
  - [How it Works](#how-it-works)
  - [How to use](#how-to-use)
    - [Example connecting GitHub Action Workflow](#example-connecting-github-action-workflow)
  - [Limitations](#limitations)
  - [How to contribute](#how-to-contribute)
    - [License](#license)

## How it Works

The action takes 

## How to use

To use this **GitHub** Action you will need to complete the following:

1. Create a **secret** to pass as input for  `token`. This **cannot** be the **GITHUB_TOKEN** secret that is implicitly created in the workflow.
2. Add the task in your workflow where you see fit. You can use the example below as a reference.
3. Modify the example to pass the correct values for `workflow`,`ref`, `token`, and `inputs`

### Example connecting GitHub Action Workflow

In your repository you should have a `.github/workflows` folder with **GitHub** Action similar to below:

- `.github/workflows/test.yml`

This file should look like the following:

```yml
---
name: "sample-workflow"
on:
  pull_request:
  push:
    branches:
      - main
      - 'releases/*'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: decyjphr-actions/repository-dispatch
      with:
        workflow: dispatch-test.yml
        token: ${{secrets.pat}}
        ref: main
        inputs: '{"status":"passed"}'
```


## Limitations


## How to contribute

If you would like to help contribute to this **GitHub** Action, please see [CONTRIBUTING](https://github.com/decyjphr-actions/workflow-dispatch/blob/master/.github/CONTRIBUTING.md)

---

### License

- [MIT License](https://github.com/decyjphr-actions/workflow-dispatch/blob/master/LICENSE)
