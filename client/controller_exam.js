MeteorApp.controller( 'ExamCtr', [ '$scope', '$collection', function( $scope, $collection ){


    var selector = { user_id: Meteor.userId() };

    $collection( Models.words, selector ).bind( $scope, 'list', true, true );

    $scope.current = 0;

    $scope.action = {
        next: function(){
            if( $scope.userGuess == $scope.list[ $scope.current ].name || $scope.showAnswer ){

                var current = $scope.list[ $scope.current ];

                if( !$scope.showAnswer ){
                    Models.words.update({ _id: current._id}, { $inc: { right: 1 } } );
                }

                $scope.userGuess = '';
                $scope.current++;
                $scope.showAnswer = false;

            }
        },
        showAnswer: function(){
            $scope.showAnswer = true;
            var current = $scope.list[ $scope.current ];
            Models.words.update({ _id: current._id}, { $inc: { wrong: 1 } } );
        }
    }

}]);