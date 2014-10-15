MeteorApp.controller( 'WordNewCtr', [ '$scope', 'Utils', '$location', '$collection', function( $scope, Utils, $location, $collection ){

    var userId = Meteor.userId();
    $collection( Models.tags, { user_id: userId }).bind( $scope, 'tags', true, true );

    $scope.model = {
        newWord: {
            user_id: userId,
            name: '',
            phonetic: '',
            meanings: [
                {
                    desc: "",
                    type: "",
                    sentences: []
                }
            ],
            wrong: 0,
            right: 0,
            tags: [],
            desc: ""
        },

        options: {
            valueField: 'name',
            labelField: 'name',
            searchField: ['name'],
            options: $scope.tags
        }
    };

    $scope.action = {
        add: function(){

            // 处理 例句
            $scope.model.newWord.meanings.forEach(function( meaning ){
                var sentences = [];
                meaning.sentences && meaning.sentences.forEach(function( sent ){
                    var newSentId = Models.sentences.insert( Utils.clean( sent ) );
                    sentences.push( newSentId );
                });

                meaning.sentences = sentences;
            });

            var newWordId = Models.words.insert( Utils.clean( $scope.model.newWord ));

            // 跳转到schema详情页
            $location.path( '/word/edit/' + newWordId ).replace();
        }
    }
}]);