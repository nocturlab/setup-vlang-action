# ✨ Contributing to setup-vlang-action ✨

## Structure of the repository
We'll use the Git method called `Gitflow'.

The Git flow method results in the creation of a branch for each feature.
Each feature can be the object of multiple pull requests (PRs).

A branch should be called by `<issue_number>-<feature_name>`.

For example:

`1-create-a-simple-neuron`

## GitHub Projects

GitHub project is a Kanban board connected to GitHub exits! 
For the best progress of the project, please create your tasks in the Backlog or To Do box.

### Using Kanban 
- [x] If you wish to perform a task, click the `Assign Yourself' button.
- [x] To display keyboard shortcuts press the <kbd>?</kbd> key.
- [x] To change the status of a task drag and drop it to an other column.
- [x] To create an issue, create a task and do `Convert to Issue'.
- [x] To make a Merge Request, make sure the branch you are trying to use has the following format:
      `<issue number> - <name of the issue>`
      For example: `1-create-a-simple-neurone`

## Using Git

To start, clone the repository into a folder with your name.

For me: `git clone https://github.com/nocturlab/setup-vlang-action.git`

Now several cases are possible:
 - You want to retrieve someone else's modifications:
   `git pull`
 - You have conflicts: 
   Conflicts marked with a `C` in the vscode git tab must be resolved.
   You must choose between incomming and current for each file conflict.
   To commit them, save your files and click the "+" on the vscode git tab.
 - You want to send your changes: 
   git status will list the modified files, you can also see them in the vscode git tab.
   `git add <my-file> [<my-other-file> ...]` will prepare your files for upload. You can also do this via the `+` in the vscode git tab.
   `git commit -m "<my message>"` add files to a commit, you can do this via the `✓` button at the top of the vscode git tab.
   git push will send all your pending commits to git so that others can get them back, you can do this via the reload button at the bottom left of the blue vscode bar.
 - You want to send your changes to the main git branch:
   On the github.com project page, click `new pull request`,
   Choose the start branch (the one you want to send your changes to) and the end branch (the one you want to send your changes to).
   Put an understandable name, click on `Assign Yourself` on the right,
   At the bottom of the description, note the id of your github issue like this: `Related issues: #1` or `Close #1`.
