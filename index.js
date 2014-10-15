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
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
    Meteor.startup(function () {

        /**
         * 监控word变化更新tag
         * @param userId
         * @param tags
         */
        function updateTags( userId, tags ){
            tags.forEach(function( tag ){
                if( tag ){
                    var exist = Models.tags.findOne( { name: tag, user_id: userId });

                    if( !exist ){
                        Models.tags.insert({ name: tag, user_id: userId });
                    }
                }
            });
        }

        Models.words.allow({
            remove: function(){
                return true;
            },
            insert: function( userId, doc ){
                updateTags( userId, doc.tags );
                return true;
            },
            update: function( userId, doc, fields, modifier ){

                if( modifier && modifier.$set && modifier.$set.tags ){
                    var tags = modifier.$set.tags;
                    tags && updateTags( userId, modifier.$set.tags )
                }

                return true;
            }
        });

        Models.tags.allow({
            remove: function( userId, doc ){
                Models.words.find( { user_id: userId, tags: { $all: [ doc.name ] } }).forEach(function( word ){
                    word.tags.forEach( function( tag, index ){
                        if( doc.name == tag ){
                            word.tags.splice( index, 1 );
                            Models.words.update({ _id: word._id }, word );
                        }
                    });
                });

                return true;
            }
        })
    });
}
