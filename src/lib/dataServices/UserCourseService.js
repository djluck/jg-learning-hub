UserCourseDataService = {
	isSignedUp : isSignedUp,
	signUpToCourse : signUpToCourse,
	resignFromCourse : resignFromCourse,
	countCoursesSignedUpTo :  function(){
		if (!Meteor.user() || !Meteor.user().profile.takingCourseIds)
			return 0;

		return Meteor.user().profile.takingCourseIds.length;
	},
	getCoursesSignedUpTo : getCoursesSignedUpTo,
	getSessionsSignedUpTo : getSessionsSignedUpTo
}

function isSignedUp(courseId){
	if (Meteor.userId() === null)
		return false;

	return _.contains(Meteor.user().profile.takingCourseIds, courseId);
}


function signUpToCourse(courseId){
	if (isSignedUp(courseId)){
		return ErrorPromise("User is already signed up");
	}

	var userUpdatePromise = Meteor.users.q.update(
		Meteor.userId(),
		{ $push: { "profile.takingCourseIds" : courseId } }
	);
	//validate: false, removeEmptyStrings: false, filter: false, autoConvert: false,
	var updateCoursePromise = Collections.Courses.q.update(
		courseId,
		{ $push : { "signedUpUserIds" : Meteor.userId() } }
	);

	return Promises.waitAll([userUpdatePromise, updateCoursePromise]);
}

function resignFromCourse(courseId){
	if (!isSignedUp(courseId)){
		return ErrorPromise("User is not signed up to course");
	}

	var userUpdatePromise = Meteor.users.q.update(
		Meteor.userId(),
		{ $pull: { "profile.takingCourseIds" : courseId } }
	);

	var updateCoursePromise = Collections.Courses.q.update(
		courseId,
		{ $pull : { "signedUpUserIds" : Meteor.userId() } }
	);

	return Promises.waitAll([userUpdatePromise, updateCoursePromise]);
}

function getCoursesSignedUpTo(){
	if (!Meteor.user() || !Meteor.user().profile.takingCourseIds)
		return [];

	return Collections.Courses.find({ _id: {$in: Meteor.user().profile.takingCourseIds }});
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

	console.log(sessionsWithCourseName);
	return _.sortBy(sessionsWithCourseName, "startsAt");
}
