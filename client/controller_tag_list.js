MeteorApp.controller( 'TagListCtr', [ '$scope', '$collection', function( $scope, $collection ){

    $collection( Models.tags, { user_id: Meteor.userId() } ).bind( $scope, 'tags', true, true );

    $scope.action = {
    }
}]);