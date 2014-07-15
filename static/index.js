var App = {
            Models: {},
            Collections: {},
            Views: {},
            Router: {}
        };

App.Models.Table = Backbone.Model.extend({
    url: function() {
        return '/tableData';
    }
});

App.Router = Backbone.Router.extend({
    routes: {
        "table":                 "getTable"
    },

    getTable : function() {
        var table = new App.Models.Table();
        table.fetch({
            success: function(model, response, options) {
                console.log('success ', model.toJSON());
            },
            error: function(model, response, options) {
                console.log('error ', response);
            }
        });
    }
});

var router = new App.Router();
Backbone.history.start();

