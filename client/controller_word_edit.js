MeteorApp.controller( 'WordEditCtr', [ '$scope', '$routeParams', '$collection', function( $scope, $routeParams, $collection ){

    var wordId = $routeParams.id;
    var userId = Meteor.userId();
    $collection( Models.words).bindOne( $scope, 'word', wordId, true );
    $collection( Models.tags, { user_id: userId }).bind( $scope, 'tags', true, true );

    $scope.options = {
        valueField: 'name',
        labelField: 'name',
        searchField: ['name'],
        options: $scope.tags
    };
}]);