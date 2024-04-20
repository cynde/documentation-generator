const fs = require('fs');
const parseMdxContentToHtml = require('./parser/MDXParser');

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
            console.log('HTML file is generated successfully');
        }
    });
};

const generateHTML = (template, content) => {
    return template.replace(/{{ mdx-content }}/g, content);
};

const generateDocumentation = () => {
    const mdxFileContent = readFile('content/api.mdx');
    const processedContent = parseMdxContentToHtml(mdxFileContent);
    const generatedHtml = generateHTML(readFile('templates/index.html'), processedContent);

    writeFile('out/docs.html', generatedHtml);
}

generateDocumentation();
