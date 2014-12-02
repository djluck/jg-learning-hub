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
		return Promises.errorPromise("User is already signed up");
	}

	var userUpdatePromise = Meteor.users.q.update(
		user._id,
		{ $push: { "profile.takingCourseIds" : courseId } }
	);
	//validate: false, removeEmptyStrings: false, filter: false, autoConvert: false,
	var updateCoursePromise = Collections.Courses.q.update(
		courseId,
		{ $push : { "signedUpUserIds" : user._id } }
	);

	return Promises.waitAll([userUpdatePromise, updateCoursePromise]);
}

function resignFromCourse(user, courseId){
	if (!isSignedUp(courseId)){
		return Promises.errorPromise("User is not signed up to course");
	}

	var userUpdatePromise = Meteor.users.q.update(
		user._id,
		{ $pull: { "profile.takingCourseIds" : courseId } }
	);

	var updateCoursePromise = Collections.Courses.q.update(
		courseId,
		{ $pull : { "signedUpUserIds" : user._id } }
	);

	return Promises.waitAll([userUpdatePromise, updateCoursePromise]);
}

function getCoursesSignedUpTo(user){
	if (!user || !user.profile.takingCourseIds)
		return [];

	return Collections.Courses.find({ _id: {$in: user.profile.takingCourseIds }});
}

function getSessionsSignedUpTo(){
	var coursesSignedUpTo = getCoursesSignedUpTo();
	if (coursesSignedUpTo instanceof Array)
		return coursesSignedUpTo;

	var sessionsWithCourseName = _.flatten(
		coursesSignedUpTo.map(function(course) {
			var sessions = Collections.Sessions.find({ _id: {$in: course.sessionIds }});

			return sessions.map(function(session){
				session.courseName = course.details.title;
				return session;
			});
		})
	);

	return _.sortBy(sessionsWithCourseName, "startsAt");
}
