CourseDataService = {
	createCourse : createCourse,
	updateCourse : updateCourse,
	getCourses : getCourses,
	getCourse : getCourse,
	getCourseCount : getCourseCount,
	approveCourse : approveCourse
};


function getCourseCount(){
	return Collections.Courses.find().count();
}

function getCourse(courseId){
	return Collections.Courses.findOne(courseId);
}

function getCourses(){
	return Collections.Courses.find(
		{},
		{ sort : { startsAt : 1 } }
	);
}

function createCourse(details, sessions){
	var toInsert = {
		details : details,
		sessions : sessions
	};
	Collections.Courses.sync.insert(toInsert);
}

function updateCourse(id, details, sessions){
	var modifier = 	{
		$set: { details : details,  sessions : sessions }
	};
	Collections.Courses.sync.update(id, modifier);
}

function approveCourse(id){
	var modifier = { $set : { "approved" : true }};
	Collections.Courses.sync.update(id, modifier);
}
