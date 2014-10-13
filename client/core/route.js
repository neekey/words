MeteorApp.config([ '$interpolateProvider', '$routeProvider', function ( $interpolateProvider, $routeProvider ) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $routeProvider
        .when('/word/list/:tag', {
            templateUrl: 'view/word_list.html',
            controller: 'WordListCtr'
        })
        .when('/', {
            templateUrl: 'view/index.html',
            controller: 'IndexCtr'
        })
        .when('/word/list', {
            templateUrl: 'view/word_list.html',
            controller: 'WordListCtr'
        })
        .when('/word/new', {
            templateUrl: 'view/word_new.html',
            controller: 'WordNewCtr'
        })
        .when('/word/edit/:id', {
            templateUrl: 'view/word_edit.html',
            controller: 'WordEditCtr'
        })
        .when('/tag/list', {
            templateUrl: 'view/tag_list.html',
            controller: 'TagListCtr'
        })
        .when('/exam', {
            templateUrl: 'view/exam.html',
            controller: 'ExamCtr'
        })
        .otherwise({
            redirectTo: '/'
        });


}]).run([ '$rootScope', '$location', function( $rootScope, $location ){

    $rootScope.$on( '$routeChangeSuccess', function( e, route ){

        if( route.$$route && route.$$route.originalPath && route.$$route.originalPath != '/' && !Meteor.userId() ){
            e.preventDefault();
            location.hash = '';
        }
    });

    var currentUserId = !!Meteor.userId();

    // 监控用户的登陆状态
    Tracker.autorun(function () {

        var userId = Meteor.userId();

        // 当登陆状态变化且
        if (userId != currentUserId && !userId ) {
            location.hash = '';
        }

        currentUserId = userId;
    });

}]);