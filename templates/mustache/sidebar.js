const sidebarTemplate = 
    '<div class="sidebar">' +
    '   <ul>' +
    '   {{#apis}}' +
    '       <li><a href="#{{hrefLink}}">{{summary}}</a></li>' +
    '   {{/apis}}' +
    '   </ul>'+
    '</div>';

module.exports = sidebarTemplate;