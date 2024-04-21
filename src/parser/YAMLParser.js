const Mustache = require('mustache');
const apiTemplate = require('../../templates/mustache/api');
const sidebarTemplate = require('../../templates/mustache/sidebar');

const parseYAMLContentToHtml = (htmlWithMDXContent, yamlFileContentObject) => {
    const { paths: pathsObject } = yamlFileContentObject;

    const apis = [];
    Object.keys(pathsObject).forEach((endpoint) => {
        Object.keys(pathsObject[endpoint]).forEach((method) => {
            const api = {
                ...pathsObject[endpoint][method],
                endpoint,
                hrefLink: pathsObject[endpoint][method]['summary'].toLowerCase().replaceAll(' ', '-'),
                method,
                methodSpan: () => {
                    if (method.toLowerCase() === 'get') {
                        return (text, render) => {
                            return '<span class="method green">' + render(text) + '</span>';
                        }
                    }
                    else if (method.toLowerCase() === 'post') {
                        return (text, render) => {
                            return '<span class="method blue">' + render(text) + '</span>';
                        }
                    }
                    else if (method.toLowerCase() === 'put') {
                        return (text, render) => {
                            return '<span class="method purple">' + render(text) + '</span>';
                        }
                    }
                    else if (method.toLowerCase() === 'patch') {
                        return (text, render) => {
                            return '<span class="method orange">' + render(text) + '</span>';
                        }
                    }
                    else if (method.toLowerCase() === 'delete') {
                        return (text, render) => {
                            return '<span class="method red">' + render(text) + '</span>';
                        }
                    }
                }
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
                status,
                statusSpan: () => {
                    if (status.charAt(0) === '2') {
                        return (text, render) => {
                            return '<span id="status" class="status-2xx">' + render(text) + '</span>';
                        }
                    }
                    else if (status.charAt(0) === '3') {
                        return (text, render) => {
                            return '<span id="status" class="status-3xx">' + render(text) + '</span>';
                        }
                    }
                    else {
                        return (text, render) => {
                            return '<span id="status" class="status-4xx">' + render(text) + '</span>';
                        }
                    }
                }
            };
        });

        return {
            ...api,
            responses: mappedResponses
        };
    });

    const apisWithMappedResponsesAndParams = apisWithMappedResponses.map((api) => {
        const { parameters } = api;
        if (parameters) {
            const parametersGroupedByType = parameters.reduce((group, item) => {
                const type = item.in;
                group[type] = group[type] || [];
                group[type].push(item);
                return group;
            }, {});

            return {
                ...api,
                parameters: parametersGroupedByType
            };
        }
        return { ...api };
    });

    const apiList = { apis: apisWithMappedResponsesAndParams };

    const content = Mustache.render(apiTemplate, apiList);
    const contentWithSidebar = Mustache.render(sidebarTemplate, apiList);
    const result = htmlWithMDXContent.replace(/{{ apis }}/g, content);
    return result.replace(/{{ sidebar }}/g, contentWithSidebar);
}

module.exports = parseYAMLContentToHtml;