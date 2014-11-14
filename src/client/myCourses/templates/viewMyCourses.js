Template.viewMyCourses.helpers({
	courses : UserCourseService.getCoursesSignedUpTo,
	getNextSessionDateForCourse : function(){
		var nextSession = SessionService.getNextSessionForCourse(this._id);
		return DateTimeHelpers.dateAndTime(nextSession.startsAt);
	}
})