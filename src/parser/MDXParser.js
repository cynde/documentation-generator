const parseMDXContentToHtml = (content) => {
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

module.exports = parseMDXContentToHtml;