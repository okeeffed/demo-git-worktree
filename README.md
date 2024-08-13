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
$ npm init -y
$ npm install lodash
$ touch index.js
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

## Further links and resources

- [Git worktree documentation](https://git-scm.com/docs/git-worktree)
- [GitKraken | worktree](https://www.gitkraken.com/learn/git/git-worktree)
