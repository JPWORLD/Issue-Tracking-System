(function () {
    'use strict';

    angular.module('issueTrackingSystem.issues')
        .controller('EditIssueController', EditIssueController);

    EditIssueController.$inject = ['$routeParams', '$q', '$location', 'issues', 'identity', 'projects', 'toaster', 'labels', 'getAllUsersService'];
    function EditIssueController($routeParams, $q, $location, issues, identity, projects, toaster, labels, getAllUsersService) {
        var vm = this;

        vm.issue = {};

        vm.users = getAllUsersService;
        vm.submitIssue = submitIssue;

        vm.addLabel = addLabel;
        vm.removeLabel = removeLabel;
        vm.tags = [];

        activate();

        vm.usersAutocomplete = {
            options: {
                onlySelect: true,
                source: function (request, response) {
                    var data = vm.usernames;
                    data = vm.usersAutocomplete.methods.filter(data, request.term);

                    if (!data.length) {
                        data.push({
                            label: 'not found',
                            value: ''
                        });
                    }
                    response(data);
                },
            }
        };

        function activate() {
            var promises = [getIssueById($routeParams.id), getAvailableLabels(), getUsernames()];
            return $q.all(promises);
        }

        function getIssueById(id) {
            return issues.getIssueById(id).then(function (data) {
                vm.issue = {
                    Title: data.Title,
                    Description: data.Description,
                    AssigneeId: data.Assignee.Id,
                    PriorityId: data.Priority.Id,

                };

                vm.labels = data.Labels;

                return vm.issue;
            });
        }

        function getUsernames() {
            vm.usernames = [];
            vm.users.forEach(function (user) {
                vm.usernames.push(user.Username);
            });
        }

        function editIssue(issue) {
            return issues.editIssue(issue, $routeParams.id).then(function (data) {
                toaster.pop('success', 'Success', 'Issue successfully edited');
                $location.path('/issues/' + $routeParams.id);
            }).catch(function (data) {
                console.error(data);
                toaster.pop('error', 'Error', '');
            });
        }

        function submitIssue() {
            if (vm.newLabels) {
                var newLabels = convertLabelsToObjects(vm.newLabels);
                newLabels.forEach(function (label) {
                    vm.labels.push(label);
                });
            }

            vm.issue.Labels = vm.labels;

            if (vm.assigneeUsername) {
                var assignee = vm.users.filter(function (user) {
                    return user.Username === vm.assigneeUsername;
                })[0];

                if (assignee) {
                    vm.issue.AssigneeId = assignee.Id;
                }
            }

            editIssue(vm.issue);
        }

        function getAvailableLabels() {
            labels.getAvailableLabels().then(function (data) {
                vm.allLabels = data;
            });
        }

        function addLabel(newLabel) {
            if (newLabel !== '' && vm.tags.indexOf(newLabel) === -1) {
                vm.tags.push($('#labels').val());
                vm.newLabels = vm.tags.join();
            }

            vm.newLabel = '';
        }

        function removeLabel(index) {
            vm.tags.splice(index, 1);
            vm.neLabels = vm.tags.join();
        }

        function convertLabelsToObjects(labels) {
            var labelObjects = [];
            var labelNames = labels.split(',');
            labelNames.forEach(function (name, index) {
                labelObjects[index] = { name: name };
            });

            return labelObjects;
        }

    }
})();