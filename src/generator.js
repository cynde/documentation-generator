const readFile = (path) => {
    const fs = require('fs');

    return fs.readFileSync(path, 'utf8');
};

const writeFile = (path, data) => {
    const fs = require('fs');

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

const parseMdxContentToHtml = (content) => {
    // Code blocks
    content = content.replace(/```([^ \t\n]+)?\n((?:.|\n)*?)\n```/gm, function(match, language, code) {
        const className = language ? `language-${language.toLowerCase()}` : "";
        return `<pre class="${className}"><code>${code.trim()}</code></pre>`;
    });

    // Inline code
    content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Hash (#) for headings
    content = content.replace(/^(#{1,6}) (.*)$/gm, function(match, hash, content) {
        return `<h${hash.length}>${content}</h${hash.length}>`;
    });

    // Asterisks (*) for bold and italics
    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    content = content.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Underline (_) for italics
    content = content.replace(/\_(.*?)\_/g, "<em>$1</em>");

    // Paragraph
    content = content.replace(/\n\n/g, "</p><p>");

    // Links
    content = content.replace(/(\[(.*?)\]\((.*?)\))|(<(.+?@.+?)>)/g, function(match, innerText, linkText, href, email) {
        if (linkText && href) {
            return `<a href="${href}">${linkText}</a>`;
        } else if (email) {
            return `<a href="mailto:${email}">${email}</a>`;
        }
    });

    return content;
}

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
