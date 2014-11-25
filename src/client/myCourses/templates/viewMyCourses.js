Template.viewMyCourses.helpers({
	courses : UserCourseService.getCoursesSignedUpTo,
	getNextSessionDateForCourse : function(){
		var nextSession = _.chain(this.sessions)
			.sortBy(function(){
				return this.startsAt;
			})
		 	.filter(function(){
				return this.startsAt > new Date();
			})
			.first();
			
		return DateTimeHelpers.dateAndTime(nextSession.startsAt);
	}
})
