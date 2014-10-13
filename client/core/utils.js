MeteorApp.service( 'Utils', [function(){

    return {
        clean: function( data ){
            return angular.fromJson( angular.toJson( data ) );
        },

        safeApply: function( scope, fn) {
            var phase = scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) { fn();
                }
            } else {
                scope.$apply(fn);
            }
        }
    }

}]);