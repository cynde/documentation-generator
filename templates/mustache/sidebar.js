const sidebarTemplate = 
    '<div class="sidebar">' +
    '   <ul>' +
    '   {{#apis}}' +
    '       <a href="#{{hrefLink}}"><li>{{summary}}</li></a>' +
    '   {{/apis}}' +
    '   </ul>'+
    '</div>';

module.exports = sidebarTemplate;