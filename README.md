# Documentation Generator
This is a JavaScript project to help you generate a lightweight static documentation site from a markdown and an open API yaml file.

## Demo
### What to do after clone
1. Do not modify any codes
2. Open [./demo/docs.html](./demo/docs.html) using your browser

## For developers
### What to do after clone
1. Install the dependencies: `npm install`
2. If you want to change the markdown content: modify [./content/api.mdx](./content/api.mdx)
3. If you want to change the open API yaml content: modify [./content/openapi.yaml](./content/openapi.yaml)
4. Generate the docs: `npm run generate`
5. Open [./out/docs.html](./out/docs.html) using your browser

#### Folder structure:
* `content`: markdown and open API yaml file
* `demo`: generated files for the demo site
* `out`: generated files for the documentation generator output site
* `src`: logic codes
* `templates`: HTML, CSS, and JavaScript files for the site template