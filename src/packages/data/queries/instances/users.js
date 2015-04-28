if (!!Meteor.users) {
    //temporary fix to get tests running

    Meteor.users.helpers({
        countCoursesSignedUpTo: function () {
            if (!this.profile || !this.profile.takingCourseIds)
                return 0;

            return this.profile.takingCourseIds.length;
        },
        getSessionsSignedUpTo: function getSessionsSignedUpTo() {
            var courses = this.getCoursesSignedUpTo();

            var sessions = courses.map(function (c) {
                _.each(c.sessions, function (s) {
                    s.courseName = c.details.title;
                    s.courseId = c._id;
                });

                return c.sessions;
            });

            var sortedSessions =
                _.chain(sessions)
                    .flatten()
                    .sortBy("startsAt")
                    .value();

            return sortedSessions;
        },
        getCoursesSignedUpTo: function getCoursesSignedUpTo() {
            if (!this.profile.takingCourseIds)
                return [];

            var query = {_id: {$in: this.profile.takingCourseIds}};
            var options = {sort: {"startsAt": 1}}
            return Collections.Courses.find(query, options);
        }
    });
}