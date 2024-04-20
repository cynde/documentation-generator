const apiTemplate = 
    '{{#apis}}' +
    '<div class="api">' +
    '    <div class="left">' +
    '        <h3 id="summary">{{summary}}</h3>' +
    '        <p id="description">{{description}}</p>' +
    '        <div class="path-parameters">' +
    '            <p class="parameters-title">Path Parameters</p>' +
    '            <hr />' +
    '            <div class="parameters-content">' +
    '                <ul>' +
    '                    <li class="row">' +
    '                        <p class="name">page <span>(required)</span></p>' +
    '                        <div class="schema">' +
    '                            <p class="type">integer</p>' +
    '                            <p class="description">Page number (optional)</p>' +
    '                        </div>' +
    '                    </li>' +
    '                </ul>' +
    '            </div>' +
    '        </div>' +
    '        <div class="query-parameters">' +
    '            <p class="parameters-title">Query Parameters</p>' +
    '            <hr />' +
    '            <div class="parameters-content">' +
    '                <ul>' +
    '                    <li class="row">' +
    '                        <p class="name">page</p>' +
    '                        <div class="schema">' +
    '                            <p class="type">integer</p>' +
    '                            <p class="description">Page number (optional)</p>' +
    '                            <p class="min">min: 1</p>' +
    '                            <p class="max">max: 100</p>' +
    '                        </div>' +
    '                    </li>' +
    '                    <li class="row">' +
    '                        <p class="name">page</p>' +
    '                        <div class="schema">' +
    '                            <p class="type">integer</p>' +
    '                            <p class="description">Page number (optional)</p>' +
    '                        </div>' +
    '                    </li>' +
    '                </ul>' +
    '            </div>' +
    '        </div>' +
    '        <div class="responses">' +
    '            <h4>Responses</h4>' +
    '            {{#responses}}' +
    '            <div class="item">' +
    '                <p><span id="status" class="success">{{status}}</span> <span id="description">{{description}}</span></p>' +
    '                {{#content}}<span class="schema">Response Schema: </span><span id="schema">{{content}}</span>{{/content}}' +
    '            </div>' +
    '            {{/responses}}' +
    '        </div>' +
    '    </div>' +
    '    <div class="right">' +
    '        <div class="method-endpoint">' +
    '            <p><span class="method green">{{method}}</span><span class="endpoint">{{endpoint}}</span></p>' +
    '        </div>' +
    '    </div>' +
    '</div>'+
    '{{/apis}}';

module.exports = apiTemplate;