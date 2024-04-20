const Mustache = require('mustache');
const apiTemplate = require('../../templates/mustache/api');

const parseYAMLContentToHtml = (htmlWithMDXContent, yamlFileContentObject) => {
    const { paths: pathsObject } = yamlFileContentObject;

    const apis = [];
    Object.keys(pathsObject).forEach((endpoint) => {
        Object.keys(pathsObject[endpoint]).forEach((method) => {
            const api = {
                ...pathsObject[endpoint][method],
                method,
                endpoint
            };
            apis.push(api);
        });
    });

    const apisWithMappedResponses = apis.map((api) => {
        const { responses } = api;
        const mappedResponses = Object.keys(responses).map((status) => {
            return {
                ...responses[status],
                content: responses[status]['content'] ? { content: Object.keys(responses[status]['content'])[0] } : null,
                status
            };
        });
        return {
            ...api,
            responses: mappedResponses
        };
    });

    const apiList = { apis: apisWithMappedResponses };

    const output = Mustache.render(apiTemplate, apiList);
    return htmlWithMDXContent.replace(/{{ apis }}/g, output);
}

module.exports = parseYAMLContentToHtml;