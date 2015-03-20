Template.viewMyCourses.helpers({
	courses : function(){
		return UserCourseDataService.getCoursesSignedUpTo(Meteor.user())
	},
	nextSessionDateForCourse : function(){
		var nextSession = _.chain(this.sessions)
		 	.filter(function(e){
				return e.startsAt > new Date();
			})
			.sortBy(function(e){
				return e.startsAt;
			})
			.first()
			.value();

		return moment(nextSession.startsAt);
	}
})

Template.viewMyCourses.events = {
	"click .btn-resign" : function(){
		Methods.resignFromCourse(this._id);
	}
}
