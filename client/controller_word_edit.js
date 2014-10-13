MeteorApp.controller( 'WordEditCtr', [ '$scope', '$routeParams', '$collection', function( $scope, $routeParams, $collection ){

    var wordId = $routeParams.id;
    var userId = Meteor.userId();

    $collection( Models.words).bindOne( $scope, 'word', wordId, true );

//    $scope.$watch( 'word.tags', function( tags ){
//        tags.forEach(function( tag ){
//            if( tag ){
//                var exist = Models.tags.findOne( { name: tag, user_id: userId });
//
//                if( !exist ){
//                    Models.tags.insert({ name: tag, user_id: userId });
//                }
//            }
//
//        });
//    });

    $scope.action = {
        tagChange: function(){
            $scope.word.tags.forEach(function( tag ){
                if( tag ){
                    var exist = Models.tags.findOne( { name: tag, user_id: userId });

                    if( !exist ){
                        Models.tags.insert({ name: tag, user_id: userId });
                    }
                }

            });
        }
    }
}]);