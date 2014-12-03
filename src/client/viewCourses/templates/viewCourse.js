Template.viewCourse.helpers({
	isSignedUp: function(){
		return UserCourseDataService.isSignedUp(Meteor.user(), this._id);
	},
	canEdit: function(){
		return this.createdByUser === Meteor.userId() || Roles.userIsInRole(Meteor.user(), "administrator");
	},
	canSignUptoOrRegignFromCourse: function(){
		return Rules.Courses.canSignUpToCourse(this) || Rules.Courses.canResignFromCourse(this, Meteor.userId());
	},
	courseIsFull: function(){
		return Rules.Courses.isCourseFull(this);
	}
});

Template.viewCourse.events = {
	"click .btn-sign-up" : function(event, template){
		if (UserCourseDataService.isSignedUp(Meteor.user(), this._id)){
			UserCourseDataService.resignFromCourse(Meteor.user(), this._id);
		}
		else{
			UserCourseDataService.signUpToCourse(Meteor.user(), this._id);
		}
	},
	"click .btn-edit" : function(event, template){
		Router.go("/edit-course/" + this._id);
	},
	"click .lnk-approve-course" : function(){
		Dialogs.approveCourseDialog.show(this._id);
	}
}
