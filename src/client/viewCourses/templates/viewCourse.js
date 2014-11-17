Template.viewCourse.helpers({
	sessionIdentifiers : function(){
		console.log(this.sessionIds);
		return _.map(this.sessionIds, function(id){
			return { id : id}
		});
	},
	noUser: function(){
		return Meteor.user() === null;
	},
	isSignedUp: function(){
		return UserCourseService.isSignedUp(this._id);
	},
	getSessions: function(){
		return CourseService.getSessions(this.sessionIds);
	},
	canEdit: function(){
		//return this.createdByUser === Meteor.userId();
		return true;
	}
});

Template.viewCourse.events = {
	"click .btn-sign-up" : function(event, template){
		if (UserCourseService.isSignedUp(this._id)){
			UserCourseService.resignFromCourse(this._id);
		}
		else{
			UserCourseService.signUpToCourse(this._id);
		}
	},
	"click .btn-edit" : function(event, template){
		Router.go("/edit-course/" + this._id);
	}
}

