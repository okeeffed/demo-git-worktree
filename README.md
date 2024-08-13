# Git tree demo

This demo walks through using Git worktree with an example using different npm dependencies to demonstrate a use case for multiple worktrees.

Our demonstration will emulate (albeit contrived and small) a "major" change within the repository. We're going to dumb it down to something contrived like migrating from [Lodash](https://lodash.com/) to [es-toolkit](https://es-toolkit.slash.page/), but you'll need to use your imagination and pretend like our work may take something like a week or so to complete, and that you may need to ship other features while doing the migration.

It really doesn't matter which language you're working with, but I'm using JavaScript to demonstrate here because you have likely found yourself jump between trees and needing to re-install different dependencies at some stage as you switch back-and-forth.

The process will look like this:

1. Have a base worktree with Lodash.
2. Create a separate worktree for the migration.
3. Re-enact the process where we need to need to add a new feature on the base tree.
4. Continue on with the migration.

## Getting started

```sh
# Configure git, initialise the project
$ mkdir demo-git-worktree
$ cd demo-git-worktree
$ npm init -y
$ npm install lodash
$ touch index.js README.md
$ git init
$ echo node_modules > .gitignore
```

In `index.js`, add the following to represent our large repository code:

```js
const _ = require("lodash");

function main() {
  console.log(_.camelCase("Our crazy big home project"));
}

main();
```

You can now run this code to see what the project is doing:

```sh
$ node index.js
ourCrazyBigHomeProject
```

Let's commit what's we've got:

```sh
# Add our commits
$ git add --all
$ git commit -m "feat: first commit"
[main (root-commit) 3fd5292] feat: first commit
 5 files changed, 86 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 index.js
 create mode 100644 package-lock.json
 create mode 100644 package.json
```

Perfect! At this stage, you git log should show something like this:

```sh
# Show git log
$ git log
commit 3fd5292b0a49ed8a5a6c4a5e2b9ee7394453e290 (HEAD -> main)
Author: Dennis O'Keeffe <hello@dennisokeeffe.com>
Date:   Wed Aug 14 08:20:12 2024 +1000

    feat: first commit
```

Now let's emulate our project to migrate over.

## Using Git worktree

We're creating a new worktree for this.

Run the following:

```sh
# List our worktree
$ git worktree list
/path/to/okeeffed/demo-git-worktree  3fd5292 [main]

# Create a new branch for our migration
$ git branch feat/estoolkit-migration

# Create a new worktree
$ git worktree add ../demo-git-worktree-estoolkit-migration feat/estoolkit-migration
Preparing worktree (checking out 'feat/estoolkit-migration')
HEAD is now at 3fd5292 feat: first commit


# List our trees again
$ git worktree list
git worktree list
/path/to/okeeffed/demo-git-worktree                      3fd5292 [main]
/path/to/okeeffed/demo-git-worktree-estoolkit-migration  3fd5292 [feat/estoolkit-migration]
```

Great! At this point, we now have another directory at `../demo-git-worktree-estoolkit-migration` which represents our estoolkit-migration worktree. It is checked out onto `feat/estoolkit-migration`.

Git operates differently between the main worktree and a linked worktree. It's best to reference the docs, but here are some quick pointers.

Git worktree is a feature that allows you to have multiple working directories associated with a single Git repository. This means you can check out different branches or commits into separate directories on your filesystem, all linked to the same repository.

The main differences in created linked work trees are:

1. **Separate working directories**: Each worktree has its own working directory, allowing you to work on different branches simultaneously without switching.
2. **Shared repository**: All worktrees share the same Git repository (objects and refs).
3. **Independent HEAD**: Each worktree has its own HEAD, index, and config file.
4. **Branch isolation**: You can't check out the same branch in multiple worktrees simultaneously (except for bare repositories).

At this point, we can work separately between the two folders for our changes.

## Making our updates for the toolkit migration

Heading into `../demo-git-worktree-estoolkit-migration` and make the following changes:

```sh
# Change into our linked worktree directory
$ cd ../demo-git-worktree-estoolkit-migration

# Add es-toolkit and remove Lodash
$ npm install es-toolkit

# Remove Lodash
$ npm uninstall lodash
```

Now let's update `index.js`:

```js
const { camelCase } = require("es-toolkit");

function main() {
  console.log(camelCase("Our crazy big home project"));
}

main();
```

If we run `node index.js` again, we'll notice that nothing has changed:

```sh
$ node index.js
ourCrazyBigHomeProject
```

Great!

## Going back for our "new feature"

Let's say now that we need to pivot midway through our migration for something else.

Back in the main worktree, let's go through a flow of adding another feature. Again, this will be contrived, but work with me.

```sh
# Back to our main worktree
$ cd ../demo-git-worktree
```

Even though Lodash is used in the repo, notice that if we run `index.js`, everything still works even though we remove that dependency in the linked worktree:

```sh
# Running on our main worktree without re-installations
$ node index.js
ourCrazyBigHomeProject
```

Great! Let's branch off, create a new feature and then merge back in.

```sh
# Create a new branch
$ git branch feat/snakecase
$ git checkout feat/snakecase
```

Let's update our `index.js` file:

```js
const _ = require("lodash");

function main() {
  console.log(_.camelCase("Our crazy big home project"));
  console.log(_.snakeCase("Our crazy big feature update"));
}

main();
```

Running this will log out the following:

```sh
$ node index.js
ourCrazyBigHomeProject
our_crazy_big_feature_update
```

Let's commit and merge to main:

```sh
# Commit
$ git commit -m "feat: added snakecase"
```

## Further links and resources

- [Git worktree documentation](https://git-scm.com/docs/git-worktree)
- [GitKraken | worktree](https://www.gitkraken.com/learn/git/git-worktree)
