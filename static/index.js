// to do: 
// abstract template to html file
// use underscore to manipulate JSON instea of object.keys()
// have change_dd1 call a python function (from backbone event handler)
// reroute all other urls, why #table

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
    //template: _.template("hello: <%= val %>"),
    template: _.template("<select class=dd1><% _.each(column, function(colname) { %> <option><%= colname %></option> <% }); %></select></br><select><option></option></select>"),
    initialize: function(){
        this.render();
    },
    render: function(){
        //console.log('success ', this.model.toJSON());
        //$(this.el).html("TEST");
        //$(this.el).html(JSON.stringify(this.model.toJSON()));
        //$(this.el).html(this.template({column: ['moe', 'curly', 'larry']}));
        $(this.el).html(this.template({column: Object.keys(this.model.toJSON())}));
    },
    events: {
        "change .dd1": "change_dd1"
    },
    change_dd1: function(e) {
        console.log(e.originalEvent.srcElement.value);
    },
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

