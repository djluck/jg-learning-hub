UserCourseDataService = {
	isSignedUp : isSignedUp,
	signUpToCourse : signUpToCourse,
	resignFromCourse : resignFromCourse,
	countCoursesSignedUpTo :  function(user){
		if (!user || !user.profile || !user.profile.takingCourseIds)
			return 0;

		return user.profile.takingCourseIds.length;
	},
	getCoursesSignedUpTo : getCoursesSignedUpTo,
	getSessionsSignedUpTo : getSessionsSignedUpTo
}

function isSignedUp(user, courseId){
	if (user === null || user.profile === undefined)
		return false;

	return _.contains(user.profile.takingCourseIds, courseId);
}


function signUpToCourse(user, courseId){
	if (isSignedUp(user, courseId)){
		throw new Meteor.Error("CouldNotSignUpToCourse", "User is already signed up");
	}

	Meteor.users.signUpUserToCourse(user, courseId);
	var modifier = { $push : { "signedUpUserIds" : user._id } };
	Meteor.wrapAsync(Collections.Courses.update.bind(Collections.Courses, courseId, modifier));
}

function resignFromCourse(user, courseId){
	if (!isSignedUp(user, courseId)){
		throw new Meteor.Error("CouldNotResignFromCourse", "User is not signed up to course");
	}

	Meteor.users.resignUserFromCourse(user, courseId);

	var modifier = { $pull : { "signedUpUserIds" : user._id } };
	Meteor.wrapAsync(Collections.Courses.update.bind(Collections.Courses, courseId, modifier));
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
