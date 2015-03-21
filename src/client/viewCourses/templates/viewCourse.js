Template.viewCourse.helpers({
	isSignedUpOrOnWaitingList: function(){
		return UserCourseDataService.isSignedUpOrOnWaitingList(Meteor.user(), this._id);
	},
	isOnWaitingList: function(){
		return UserCourseDataService.isOnWaitingList(Meteor.user(), this._id);
	},
	canEdit: function(){
		return this.createdByUserId === Meteor.userId() || Roles.userIsInRole(Meteor.user(), "administrator");
	},
	canSignUpToOrRegignFromCourse: function(){
		return Rules.Courses.canSignUpToCourse(this) || Rules.Courses.canResignFromCourse(this, Meteor.userId());
	},
	courseIsFull: function(){
		return Rules.Courses.isCourseFull(this);
	},
	createdByUserName: function(){
		return Meteor.users.findOne(this.createdByUserId).profile.name;
	},
	disableUsersAttending: function(){
		if (this.signedUpUserIds.length == 0)
			return "disabled";
		else
			return "";
	}
});

Template.viewCourse.events = {
	"click .btn-sign-up" : function(event, template){
		if (UserCourseDataService.isSignedUpOrOnWaitingList(Meteor.user(), this._id)){
			if (Rules.Courses.isCourseFull(this)){
				Dialogs.theresAWaitingListDialog.show(this._id);
			}
			else {
				Methods.resignFromCourseOrLeaveWaitingList(this._id);
			}
		}
		else{
			var courseId = this._id;
			Methods.signUpToCourseOrJoinWaitingList(this._id)
				.then(function(result){
					if (result.isOnWaitingList) {
						Dialogs.notifyWaitingListPosition.show({waitingListPosition: result.waitingListPosition});
					}
				});
		}
	},
	"click .btn-edit" : function(event, template){
		Router.go("/edit-course/" + this._id);
	},
	"click .lnk-approve-course" : function(){
		Dialogs.approveCourseDialog.show(this._id);
	}
}
