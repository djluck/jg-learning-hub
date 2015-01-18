Template.viewCourse.helpers({
	isSignedUp: function(){
		return UserCourseDataService.isSignedUp(Meteor.user(), this._id);
	},
	canEdit: function(){
		return this.createdByUserId === Meteor.userId() || Roles.userIsInRole(Meteor.user(), "administrator");
	},
	canSignUptoOrRegignFromCourse: function(){
		return Rules.Courses.canSignUpToCourse(this) || Rules.Courses.canResignFromCourse(this, Meteor.userId());
	},
	courseIsFull: function(){
		return Rules.Courses.isCourseFull(this);
	},
	createdByUserName: function(){
		return Meteor.users.findOne(this.createdByUserId).profile.name;
	}
});

Template.viewCourse.events = {
	"click .btn-sign-up" : function(event, template){
		if (UserCourseDataService.isSignedUp(Meteor.user(), this._id)){
			Methods.resignFromCourse(this._id);
		}
		else{
			Methods.signUpToCourse(this._id);
		}
	},
	"click .btn-edit" : function(event, template){
		Router.go("/edit-course/" + this._id);
	},
	"click .lnk-approve-course" : function(){
		Dialogs.approveCourseDialog.show(this._id);
	}
}
