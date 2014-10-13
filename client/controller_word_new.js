MeteorApp.controller( 'WordNewCtr', [ '$scope', 'Utils', '$location', function( $scope, Utils, $location ){

    var userId = Meteor.userId();

    $scope.model = {
        newWord: {
            user_id: userId,
            name: 'hello',
            phonetic: '',
            meanings: [],
            tags: [],
            desc: ""
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

            // 处理 tag
            $scope.model.newWord.tags.forEach(function( tag ){
                if( tag ){
                    var exist = Models.tags.findOne( { name: tag, user_id: userId });

                    if( !exist ){
                        Models.tags.insert({ name: tag, user_id: userId });
                    }
                }
            });

            var newWordId = Models.words.insert( Utils.clean( $scope.model.newWord ), function(){
                console.log( arguments, newWordId );
            });

            // 跳转到schema详情页
            $location.path( '/word/edit/' + newWordId ).replace();
        }
    }
}]);