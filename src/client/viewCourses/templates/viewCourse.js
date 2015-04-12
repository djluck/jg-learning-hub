Template.viewCourse.helpers({
	canEdit: function(){
		return this.createdByUserId === Meteor.userId() || this.details.runByUserId === Meteor.userId() || Roles.userIsInRole(Meteor.user(), "administrator");
	},
	canDelete: function(){
		return Roles.userIsInRole(Meteor.user(), "administrator");
	},
	disableUsersAttending: function(){
		if (this.signedUpUserIds.length == 0)
			return "disabled";
		else
			return "";
	},
	numUsersSignedUpOrOnWaitingList : function() {
		return (this.waitingListUserIds || []).length + this.signedUpUserIds.length;
	}
});

Template.viewCourse.events = {
	"click .btn-sign-up" : function(event, template){
		subscribeOrUnsubscribeUser(this);
	},
	"click .btn-edit" : function(event, template){
		Router.go("/edit-course/" + this._id);
	},
	"click .lnk-approve-course" : function(){
		Dialogs.approveCourseDialog.show(this._id);
	},
	"click .btn-delete" : function(event, template){
		Dialogs.deleteCourseDialog.show(this._id);
	}
}

function subscribeOrUnsubscribeUser(course){
	var user = Meteor.user();

	//handle case where user is not yet logged in
	if (!user) {
		return handleUserNotLoggedIn(course);
	}

	var courseId = course._id;

	if (course.isFull() && course.hasWaitingList() && course.userIsSignedUp()) {
		Dialogs.theresAWaitingListDialog.show(courseId);
	}
	else if (course.userIsSignedUpOrOnWaitingList()){
		Methods.resignFromCourseOrLeaveWaitingList(courseId);
	}
	else{
		signUserUpToCourseOrJoinWaitingList(course);
	}
}

function handleUserNotLoggedIn(course){
	Meteor.loginWithAzureAd(function(err){
		if (err){
			return;
		}

		//only sign up a user, otherwise we might confuse users!
		if (!course.userIsSignedUpOrOnWaitingList()){
			signUserUpToCourseOrJoinWaitingList(course);
		}
	});
}

function signUserUpToCourseOrJoinWaitingList(course){
	Methods.signUpToCourseOrJoinWaitingList(course._id)
		.then(function(result){
			if (!result.isOnWaitingList) {
				return;
			}

			Dialogs.notifyWaitingListPosition.show({waitingListPosition: result.waitingListPosition});
		});
}
