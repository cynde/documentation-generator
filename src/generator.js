const fs = require('fs');
const parseMDXContentToHtml = require('./parser/MDXParser');
const parseYAMLContentToHtml = require('./parser/YAMLParser');
const yaml = require('js-yaml');

const readFile = (path) => {
    return fs.readFileSync(path, 'utf8');
};

const writeFile = (path, data) => {
    fs.copyFile('templates/styles/style.css', 'out/styles/style.css', (error) => {
        if (error) {
            throw error;
        }
        console.log('CSS file is copied');
    });

    return fs.writeFile(path, data, (error) => {
        if (error)
            console.log(`Write file error: ${error}`);
        else {
            console.log('HTML file is generated');
        }
    });
};

const generateDocumentation = () => {
    const mdxFileContent = readFile('content/api.mdx');
    const parsedMDXContent = parseMDXContentToHtml(mdxFileContent);
    const template = readFile('templates/index.html');
    const htmlWithMDXContent = template.replace(/{{ mdx-content }}/g, parsedMDXContent);
    
    const yamlFileContent = readFile('content/openapi.yaml');
    const yamlFileContentObject = yaml.load(yamlFileContent);
    const result = parseYAMLContentToHtml(htmlWithMDXContent, yamlFileContentObject);

    writeFile('out/docs.html', result);
}

generateDocumentation();
