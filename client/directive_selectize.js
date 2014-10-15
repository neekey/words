MeteorApp.directive('mSelectize', [ 'Utils', function ( Utils ) {

    return {
        restrict: 'A',
        require: '?ngModel',
        priority: 1,
        scope: {
            options: '='
        },
        link: function (scope, element, attrs, ngModel ) {

            /**
             * 初始化组建
             */
            function init(){
                var el = $(element).selectize(
                    angular.extend({
                        delimiter: ',',
                        create: true,
                        onChange: function (value) {
                            Utils.safeApply(scope, function () {
                                ngModel.$setViewValue(value || [])
                            });
                        }
                    }, scope.options )
                ).css({
                    height: '20px'
                });

                scope.$watch( 'options', function( options ){
                    console.log( 'option update', options );
                    el[0].selectize.refreshOptions( false );
                });
            }

            // 数据到达后进行渲染，不过需要异步，因为数据到达，select节点还没渲染好
            ngModel.$render = function(){
                var value = ngModel.$viewValue;
                if( value ){
                    setTimeout(function(){
                        init();
                    }, 0)
                }
            }

        }
    };
}]);
