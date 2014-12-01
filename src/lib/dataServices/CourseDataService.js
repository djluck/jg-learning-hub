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
	return Collections.Courses.q.insert({
		details : details,
		sessions : sessions
	});
}

function updateCourse(id, details, sessions){
	return Collections.Courses.q.update(
		id,
		{
			$set: { details : details,  sessions : sessions }
		}
	);
}

function approveCourse(id){
	Collections.Courses.q.update(
		id,
		{ $set : { "approved" : true }}
	);
}
