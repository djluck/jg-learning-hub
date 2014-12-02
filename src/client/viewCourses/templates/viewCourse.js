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
		return UserCourseDataService.isSignedUp(Meteor.user(), this._id);
	},
	canEdit: function(){
		return this.createdByUser === Meteor.userId();
	}
});

Template.viewCourse.events = {
	"click .btn-sign-up" : function(event, template){
		if (UserCourseDataService.isSignedUp(Meteor.user(), this._id)){
			UserCourseDataService.resignFromCourse(this._id);
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
