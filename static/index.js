// to do: 
// walkthrough of code structure thus far 
// abstract template to html file
// have change_dd1 modify dd_2 (can we call python func in between?)
// set up go button with form and ajax 
    // get values of objects on form at time of click
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
    template: _.template("<select class=dd1><% _.each(columns, function(colname) { %> <option><%= colname %></option> <% }); %></select></br><select><option></option></select>"),
    initialize: function(){
        this.render();
    },
    render: function(){
        //console.log('success ', this.model.toJSON());
        //$(this.el).html("TEST");
        //$(this.el).html(JSON.stringify(this.model.toJSON()));
        //$(this.el).html(this.template({column: ['moe', 'curly', 'larry']}));
        $(this.el).html(this.template({columns: _.keys(this.model.toJSON())}));
    },
    events: {
        "change .dd1": "change_dd1"
    },
    change_dd1: function(e) {
        console.log(e.originalEvent.srcElement.value);
        console.log()
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

