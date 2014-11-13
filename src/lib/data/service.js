Service = {
	addCourseAndSessions : addCourseAndSessions,
	getCourses : getCourses,
	getSessions : getSessions
};

SignUpService = {
	isSignedUp : isSignedUp,
	signUpToCourse : signUpToCourse,
	resignFromCourse : resignFromCourse
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
		{  $push : { "signedUpUserIds" : Meteor.userId() } }
	);

	return Q.all([userUpdatePromise, updateCoursePromise])
		.fail(function (error) {
	     	console.log(error);
		});
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

	return Q.all([userUpdatePromise, updateCoursePromise])
		.fail(function (error) {
	     	console.log(error);
		});
}

function getCourses(){
	return Collections.Courses.find();
}

function getSessions(sessionIds){
	return Collections.Sessions.find(
		{
			_id : {$in: sessionIds}
		},
		{ sort: {startsAt: 1} }
	);
};

function addCourseAndSessions(courseDetails, sessions){
	var promise = Q.fcall(function(){
		return {
			details : courseDetails,
			sessionIds : []
		};
	});

	var promise = insertSessions(promise, sessions)
		.then(function(course){
			return Collections.Courses.q.insert(course);
		});

	return promise;
}


function insertSessions(promise, sessions){
	var promisesChained = _.reduce(
		sessions, 
		function(promiseChain, session){
			return promiseChain.then(function(course){
				var addSessionIdToCourse = function(id){
					course.sessionIds.push(id);
					return course;
				};
				return Collections.Sessions.q.insert(session, addSessionIdToCourse);
			})
		}, 
		promise
	);

	return promisesChained;
}