const sidebarTemplate = 
    '<div class="sidebar">' +
    '   <ul>' +
    '   {{#apis}}' +
    '       <a href="#{{hrefLink}}"><li>{{#methodSpan}}{{method}}{{/methodSpan}}{{summary}}</li></a>' +
    '   {{/apis}}' +
    '   </ul>'+
    '</div>';

module.exports = sidebarTemplate;