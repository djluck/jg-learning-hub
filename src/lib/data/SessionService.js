SessionService = {
	getNextSessionForCourse : getNextSessionForCourse
}

function getNextSessionForCourse(courseId){
	var sessionIds = Collections.Courses.findOne(courseId).sessionIds;
	return Collections.Sessions.findOne(
		{ _id : { $in : sessionIds }}, //need to add
		{ sort: {startsAt: 1} }
	);
}