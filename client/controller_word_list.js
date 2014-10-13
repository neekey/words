MeteorApp.controller( 'WordListCtr', [ '$scope', '$collection', '$routeParams', function( $scope, $collection, $routeParams ){

    var selector = { user_id: Meteor.userId() };

    if( $routeParams.tag ){
        selector.tags = { $all: [ $routeParams.tag ] };
    }

    $collection( Models.words, selector ).bind( $scope, 'list', true, true );

    $scope.action = {
    }
}]);