# uDocumentation

## Instruction for install in another repo

1. In your repo directory run command: `git pull https://github.com/uStudioCompany/u-documentation-frontend.git master --allow-unrelated-histories`
2. Create a file `config.json` in the root with the content as `config.example.json`. In this file you can specify the project name, color palette and mandatory settings for the application: name of the repository owner, name of the repository itself, working branch, and name of the folder from which navigation will be built.
3. To install your own logo, place the image with it at the root of the project. The file name must be `logo.svg`.
4. In the repository settings, enable the "GitHub Pages" option, select the branch `gh-pages`, directory `/` (root).
5. Change `REPO_NAME` to your repository name in package.json file (`line 10`).
6. Add new Action to your repository with free name and next content:

```yaml
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      - name: Install and Build 🔧
        run: |
          yarn install --production=true
          yarn build
      - name: GitHub Pages
        uses: crazy-max/ghaction-github-pages@v1.5.1
        with:
          build_dir: dist
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Usage

### Navigation
The left sidebar contains the navigation being built from the existing file structure inside `docsFolder`.
All nested folders are opened by default.

### Path
To properly create a link to the file inside your repo you need to use an absolute path from the root,
for example `[linkName](/data-set/category.json)`.

### CSV Tables
You may need to use CSV tables in your markdown file.
For this case, just create a link to the file appending the '.csv' extension, for example `[](/data-set/PROZORRO-QuestionGroups.csv "Title")`.
Query params for picking single rows/columns (using ',') or ranges ('-') are supported.
For example, if you need only 1,2 rows and 1-3 columns from the table `[](/data-set/PROZORRO-QuestionGroups.csv?r=1,2&c=1-3 "Question Groups")`.

### JSON Schemas
To use JSON Schema you just need to create the file with extension `.schema.json` in your repo and create a link to this file inside of markdown, for example `[](/data-set/category.schema.json)`

### Dropdowns
To render a dropdown panel create a link with '$' prepended to its 'url' section (between '()'). 
Second param will be used to create a title. 
To specify a file extension write it right after the '$'. For example, `[ { name: "12", age: 12 } ]($json "show code")`.

Text inside '[]' will be rendered as a content of this dropdown.

Example for text in dropdown `[## some text]($ "show text")`.

