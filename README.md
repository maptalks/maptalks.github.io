# maptalks.github.io

Source repository of [maptalks.js's web site](https://maptalks.org).

## Setup

1. At root directory

```bash
npm install
```

2. run

```bash
gulp
```
* Compile sources in `src`, generate html files to `dist`
* Start gulp-connet on port 2000, begin to watch file changes to rebuild

3. Open the browser at
(http://localhost:2000/)[http://localhost:2000/]

## Contribute and Publish

Due to [github's requirements](https://help.github.com/articles/user-organization-and-project-pages/#user--organization-pages), source files are stored in `source` branch. Once `source` branch is updated with new commits, examples will be compiled and published to `master` branch automatically.

Any form of contribution is warmly welcomed any time, please submit your pull request to `source` branch (NOT `master` branch). 
