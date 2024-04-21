const Mustache = require('mustache');
const apiTemplate = require('../../templates/mustache/api');
const sidebarTemplate = require('../../templates/mustache/sidebar');

const mapResponses = (apis) => {
    return apis.map((api) => {
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
};

const mapParameters = (apis) => {
    return apis.map((api) => {
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
                parameters: parametersGroupedByType,
                hasPathParameters: Object.keys(parametersGroupedByType).includes('path'),
                hasQueryParameters: Object.keys(parametersGroupedByType).includes('query'),
            };
        }
        return { ...api };
    });
};

const mapRequestBody = (apis) => {
    return apis.map((api) => {
        const { requestBody } = api;
        if (requestBody) {
            const properties = requestBody['content'][Object.keys(requestBody.content)[0]]?.schema?.properties;
            let mappedProperties = [];
            if (properties) {
                mappedProperties = Object.keys(properties).map((name) => {
                    return {
                        name,
                        type: properties[name].type,
                        required: properties[name].required,
                        description: properties[name].description,
                    }
                });
            }

            const mappedRequestBody = {
                required: requestBody.required,
                schema: Object.keys(requestBody.content)[0],
                type: requestBody['content'][Object.keys(requestBody.content)[0]]?.schema?.type,
                properties: mappedProperties
            };

            return {
                ...api,
                requestBody: mappedRequestBody
            }
        };
        return { ...api };
    });
};

const mapHeaders = (apis) => {
    return apis.map((api) => {
        const { headers } = api;
        if (headers) {
            const mappedHeaders = Object.keys(headers).map((name) => {
                return {
                    name,
                    required: headers[name].required,
                    description: headers[name].description,
                    type: headers[name].schema?.type,
                }
            });
            
            return {
                ...api,
                hasHeaderParameters: true,
                headers: mappedHeaders
            }
        }
        return { ...api };
    });
};

const parseYAMLContentToHtml = (htmlWithMDXContent, yamlFileContentObject) => {
    const { paths: pathsObject } = yamlFileContentObject;

    const apis = [];
    const colors = {
        'get': 'green',
        'post': 'blue',
        'put': 'purple',
        'patch': 'orange',
        'delete': 'red',
    }
    Object.keys(pathsObject).forEach((endpoint) => {
        Object.keys(pathsObject[endpoint]).forEach((method) => {
            const api = {
                ...pathsObject[endpoint][method],
                endpoint,
                hrefLink: pathsObject[endpoint][method]['summary']?.toLowerCase().replaceAll(' ', '-'),
                method,
                methodSpan: () => {
                    return (text, render) => {
                        const content = render(text).length > 5 ? render(text).substring(0,3) : render(text);
                        return `<span class="method ${colors[method.toLowerCase()]}">${content}</span>`;
                    }
                }
            };
            apis.push(api);
        });
    });

    const apisWithMappedResponses = mapResponses(apis);
    const apisWithMappedResponsesAndParams = mapParameters(apisWithMappedResponses);
    const apisWithMappedResponsesAndParamsAndRequestBody = mapRequestBody(apisWithMappedResponsesAndParams);
    const apisWithMappedResponsesAndParamsAndRequestBodyAndHeaders = mapHeaders(apisWithMappedResponsesAndParamsAndRequestBody);

    const apiList = { apis: apisWithMappedResponsesAndParamsAndRequestBodyAndHeaders };
    const content = Mustache.render(apiTemplate, apiList);
    const contentWithSidebar = Mustache.render(sidebarTemplate, apiList);
    const result = htmlWithMDXContent.replace(/{{ apis }}/g, content);
    return result.replace(/{{ sidebar }}/g, contentWithSidebar);
}

module.exports = parseYAMLContentToHtml;