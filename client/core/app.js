if (Meteor.isClient) {

    MeteorApp = angular.module('meteorapp', [
        'angular-meteor',
        'ngCookies',
        'ngSanitize',
        'ngRoute'
    ]);

    Meteor.startup(function () {
        angular.bootstrap( document, [ 'meteorapp' ] );
    });
}