MeteorApp.controller( 'TagListCtr', [ '$scope', '$collection', function( $scope, $collection ){

    $collection( Models.tags, { user_id: Meteor.userId() } ).bind( $scope, 'tags', true, true );

    $scope.tagCount = {};

    Models.tags.find({ user_id: Meteor.userId() }).forEach(function( tag ){
        $scope.tagCount[ tag.name ] = Models.words.find({ tags: { $all: [ tag.name ] }}).count();
    });

}]);