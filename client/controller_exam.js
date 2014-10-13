MeteorApp.controller( 'ExamCtr', [ '$scope', '$collection', function( $scope, $collection ){


    var selector = { user_id: Meteor.userId() };

    $collection( Models.words, selector ).bind( $scope, 'list', true, true );

    $scope.current = 0;

    $scope.action = {
        next: function(){

            $scope.userGuess = '';
            $scope.current++;
        }
    }

}]);