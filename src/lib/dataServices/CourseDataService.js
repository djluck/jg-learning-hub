CourseDataService = {
	createCourse : createCourse,
	updateCourse : updateCourse,
	getCourses : getCourses,
	getCourse : getCourse,
	getCourseCount : getCourseCount
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

function createCourse(details, sessions){
	return Collections.Courses.q.insert({
		details : details,
		sessions : sessions
	});
}

function updateCourse(id, details, sessions){
	console.log(sessions);
	return Collections.Courses.q.update(
		id,
		{
			$set: { details : details,  sessions : sessions }
		}
	);
}
