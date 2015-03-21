UserCourseDataService = {

	//all belong on user

	isSignedUpOrOnWaitingList : function(user, courseId){
		var course = Collections.Courses.findOne(courseId);
		return this.isSignedUp(user, courseId) || this.isOnWaitingList(user, course);
	},
	countCoursesSignedUpTo :  function(user){
		if (!user || !user.profile || !user.profile.takingCourseIds)
			return 0;

		return user.profile.takingCourseIds.length;
	},
	getCoursesSignedUpTo : getCoursesSignedUpTo,
	getSessionsSignedUpTo : getSessionsSignedUpTo,
	isSignedUp : function(user, courseId){
		if (!user || !user.profile)
			return false;

		return _.contains(user.profile.takingCourseIds, courseId);
	},
	isOnWaitingList: function(user, course){
		if (!user || !user.profile)
			return false;

		if (_.isString(course))
			course = Collections.Courses.findOne(course);

		return _.contains(course.waitingListUserIds, user._id);
	},
	signUpToCourse : function(user, courseId){
		Log.info("Signing user {0} up to course {1}", user._id, courseId);

		Meteor.users.signUpUserToCourse(user, courseId);
		var modifier = { $push : { "signedUpUserIds" : user._id } };
		Collections.Courses.sync.update(courseId, modifier);
	}
}


function getCoursesSignedUpTo(user){
	if (!user || !user.profile.takingCourseIds)
		return [];

	var query = { _id: { $in: user.profile.takingCourseIds } };
	var options = { sort : { "startsAt" : 1 } }
	return Collections.Courses.find(query, options);
}

function getSessionsSignedUpTo(user){
	var courses = getCoursesSignedUpTo(user);

	var sessions = courses.map(function(c) {
		_.each(c.sessions, function(s){
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
}
