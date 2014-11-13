Service = {
	addCourseAndSessions : addCourseAndSessions,
	getCourses : getCourses,
	getSessions : getSessions
};


function addCourseAndSessions(courseDetails, sessions){
	saveSessions(sessions, function(sessionIds){
		var course = {
			details : courseDetails,
			sessionIds : sessionIds
		};
		console.log("course");
		console.log(course);
		Collections.Courses.insert(course, handleError);
	});
}

function saveSessions(sessionsToSave, saveCourseCallback, sessionIds){
	if (sessionIds === undefined)
		sessionIds = [];

	var session = sessionsToSave.pop();
	if (session === undefined){
		saveCourseCallback(sessionIds);
	}

	Collections.Sessions.insert(session, function(err, id){
		handleError(err);
		sessionIds.push(id);
		saveSessions(sessionsToSave, saveCourseCallback, sessionIds);
	});
}

function getCourses(){
	return Collections.Courses.find().fetch();
}

function getSessions(sessionIds){
	console.log(sessionIds)
	return Collections.Sessions.find(
		{
			_id : {$in: sessionIds}
		},
		{ sort: {startsAt: 1} }
	).fetch();
};