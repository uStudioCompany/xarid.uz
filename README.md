# uDocumentation

## Instruction for install in another repo

1. In your repo directory run command: `git clone https://github.com/uStudioCompany/u-documentation-frontend.git master --allow-unrelated-histories`
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
