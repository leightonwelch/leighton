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

App.Views.Table = Backbone.View.extend({
      el: $('#container'),
      initialize: function(){
        this.render();
      },
      render: function(){
        $(this.el).html(this.model.toJSON());
        console.log('success ', this.model.toJSON());
        //$(this.el).html("TEST");
      }
    });

App.Router = Backbone.Router.extend({
    routes: {
        "table" : "getTable"
    },

    getTable : function() {
        var table = new App.Models.Table();
        table.fetch({
            success: function(model, response, options) {
                //console.log('success ', model.toJSON());
                var appView = new App.Views.Table({model:table});
            },
            error: function(model, response, options) {
                console.log('error ', response);
            }
        });
    }
});

var router = new App.Router();
Backbone.history.start();

