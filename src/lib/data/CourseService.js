CourseService = {
	addCourseAndSessions : addCourseAndSessions,
	getCourses : getCourses,
	getCourse : getCourse,
	getCourseCount : getCourseCount,
	getSessions : getSessions
};


function getCourseCount(){
	return Collections.Courses.find().count();
}

function getCourse(courseId){
	return Collections.Courses.findOne(courseId);
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