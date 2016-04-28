(function () {
    'use strict';

    angular.module('issueTrackingSystem.projects')
        .directive('removeLabel', removeLabel);

    function removeLabel() {
        var directive = {
            restrict: 'EA',
            link: link,
            controller: 'ProjectController',
            controllerAs: 'vm',
        };

        return directive;


        function link(scope, element, atrs, controller) {
            element.on('click', function (event) {
                var input = this.previousElementSibling;
                var labelForRemove = input.value;            
                var labels = scope.$parent.project.Labels;
                scope.$parent.project.Labels = labels.filter(function (label) {
                    return label.Name !== labelForRemove;
                });

                this.parentElement.removeChild(input);
                this.parentElement.removeChild(this);
            });
        }
    }

} ());