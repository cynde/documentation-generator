const apiTemplate = 
    '{{#apis}}' +
    '<div class="api" id={{hrefLink}}>' +
    '    <div class="left">' +
    '        <h3 id="summary">{{summary}}</h3>' +
    '        <p id="description">{{description}}</p>' +
    '        {{#hasPathParameters}}' +
    '        <div class="path-parameters">' +
    '            <p class="parameters-title">Path Parameters</p>' +
    '            <hr />' +
    '            <div class="parameters-content">' +
    '                <ul>' +
    '                   {{#parameters.path}}' +
    '                    <li class="row">' +
    '                        <p class="name">{{name}}{{#required}} <span>(required)</span>{{/required}}</p>' +
    '                        <div class="schema">' +
    '                            <p class="type">{{schema.type}}</p>' +
    '                            <p class="description">{{description}}</p>' +
    '                        </div>' +
    '                    </li>' +
    '                   {{/parameters.path}}' +
    '                </ul>' +
    '            </div>' +
    '        </div>' +
    '        {{/hasPathParameters}}' +
    '        {{#hasQueryParameters}}' +
    '        <div class="query-parameters">' +
    '            <p class="parameters-title">Query Parameters</p>' +
    '            <hr />' +
    '            <div class="parameters-content">' +
    '                <ul>' +
    '                   {{#parameters.query}}' +
    '                    <li class="row">' +
    '                        <p class="name">{{name}}</p>' +
    '                        <div class="schema">' +
    '                            <p class="type">{{schema.type}}</p>' +
    '                            <p class="description">{{description}}</p>' +
    '                            {{#schema.min}}<p class="min">min: {{schema.min}}</p>{{/schema.min}}' +
    '                            {{#schema.max}}<p class="max">max: {{schema.max}}</p>{{/schema.max}}' +
    '                        </div>' +
    '                    </li>' +
    '                   {{/parameters.query}}' +
    '                </ul>' +
    '            </div>' +
    '        </div>' +
    '        {{/hasQueryParameters}}' +
    '        {{#requestBody}}' +
    '        <div class="request-body">' +
    '            <p class="parameters-title">Request Body Schema: <span class="schema">{{schema}}</span>{{#required}} <span class="required">(required)</span>{{/required}}</p>' +
    '            <hr />' +
    '            <div class="parameters-content">' +
    '               <ul>' +
    '                   <p>type: <span class="type">{{type}}</span></p>' +
    '                   {{#properties}}' +
    '                    <li class="row">' +
    '                        <p class="name">{{name}}{{#required}} <span class="required">(required)</span>{{/required}}</p>' +
    '                        <div class="schema">' +
    '                            <p class="type">{{type}}</p>' +
    '                            <p class="description">{{description}}</p>' +
    '                        </div>' +
    '                    </li>' +
    '                   {{/properties}}' +
    '                </ul>' +
    '            </div>' +
    '        </div>' +
    '        {{/requestBody}}' +
    '        {{#hasHeaderParameters}}' +
    '        <div class="headers">' +
    '            <p class="parameters-title">Header Parameters</p>' +
    '            <hr />' +
    '            <div class="parameters-content">' +
    '               <ul>' +
    '                   {{#headers}}' +
    '                    <li class="row">' +
    '                        <p class="name">{{name}}{{#required}} <span class="required">(required)</span>{{/required}}</p>' +
    '                        <div class="schema">' +
    '                            <p class="type">{{type}}</p>' +
    '                            <p class="description">{{description}}</p>' +
    '                        </div>' +
    '                    </li>' +
    '                   {{/headers}}' +
    '                </ul>' +
    '            </div>' +
    '        </div>' +
    '        {{/hasHeaderParameters}}' +
    '        <div class="responses">' +
    '            <h4>Responses</h4>' +
    '            {{#responses}}' +
    '            <div class="item">' +
    '                <p>{{#statusSpan}}{{status}}{{/statusSpan}} <span id="description">{{description}}</span></p>' +
    '                {{#content}}<span class="schema">Response Schema: </span><span id="schema">{{content}}</span>{{/content}}' +
    '            </div>' +
    '            {{/responses}}' +
    '        </div>' +
    '    </div>' +
    '    <div class="right">' +
    '        <div class="method-endpoint">' +
    '            <p>{{#methodSpan}}{{method}}{{/methodSpan}}<span class="endpoint">{{endpoint}}</span></p>' +
    '        </div>' +
    '    </div>' +
    '</div>'+
    '{{/apis}}';

module.exports = apiTemplate;