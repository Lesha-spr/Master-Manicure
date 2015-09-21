module.exports["component"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div></div>";
},"useData":true});
module.exports["mini-cart"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"mini-cart__entries\">"
    + container.escapeExpression(((helper = (helper = helpers.entries || (depth0 != null ? depth0.entries : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"entries","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});