// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Models = {
    words: new Mongo.Collection("words"),
    sentences: new Mongo.Collection("sentences"),
    comparison: new Mongo.Collection("comparison"),
    wordGroups: new Mongo.Collection("wordGroups"),
    tags: new Mongo.Collection("tags"),
    relations: new Mongo.Collection("relations")
};

var _word = {
    name: 'hello',
    phonetic: '',
    meanings: [
        {
            "desc": "说明",
            type: "",
            "sentences": [

            ]
        }
    ],
    tags: [],
    desc: ""
};

var _sentence = {
    name: '',
    translation: ""
};

if (Meteor.isClient) {










//
//    Template.word_list.wordList = function(){
//        return Words.find({});
//    };
//
//    Template.word_list.events({
//        'submit form': function( e ){
//            e.preventDefault();
//            var form = e.currentTarget;
//            var name = form.name.value;
//
//            if( name ){
//                Words.insert({
//                    name: name
//                }, function(){
//                    console.log( 'insert callback', arguments );
//                });
//            }
//
//            form.reset();
//        }
//    })
//    Template.leaderboard.players = function () {
//        return Players.find({}, {sort: {score: -1, name: 1}});
//    };
//
//    Template.leaderboard.selected_name = function () {
//        var player = Players.findOne(Session.get("selected_player"));
//        return player && player.name;
//    };
//
//    Template.player.selected = function () {
//        return Session.equals("selected_player", this._id) ? "selected" : '';
//    };
//
//    Template.leaderboard.events({
//        'click button.inc': function () {
//            Players.update(Session.get("selected_player"), {$inc: {score: 5}});
//        }
//    });
//
//    Template.player.events({
//        'click': function () {
//            Session.set("selected_player", this._id);
//        }
//    });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
