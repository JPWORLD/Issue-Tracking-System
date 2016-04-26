(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .factory('projects', projects);

    projects.$inject = ['$http', '$q', 'identity', 'BASE_SERVICE_URL'];

    function projects($http, $q, identity, BASE_SERVICE_URL) {
        var service = {
            getAllProjects: getAllProjects,
            getUserProjects: getUserProjects,
            getProjectById: getProjectById,
            addProject: addProject,
            editProject: editProject
        };

        return service;

        function getUserProjects(params, id) {
            var request = {
                method: 'GET',
                url: BASE_SERVICE_URL + '/projects?filter=Lead.Id="' + id + '"',
                params: params
            };

            return $http(request).then(function (response) {
                return response.data;
            });

        }

        function getAllProjects() {
            var url = BASE_SERVICE_URL + '/projects/';

            return $http.get(url).then(function (response) {
                return response.data;
            });
        }

        function getProjectById(id) {
            var url = BASE_SERVICE_URL + '/projects/' + id;

            return $http.get(url).then(function (response) {
                return response.data;
            });
        }

        function addProject() {

        }

        function editProject() {

        }
    }

} ());