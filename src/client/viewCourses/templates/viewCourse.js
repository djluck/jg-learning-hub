Template.viewCourse.helpers({
	canEdit: function(){
		return this.createdByUserId === Meteor.userId() || this.details.runByUserId === Meteor.userId() || Roles.userIsInRole(Meteor.user(), "administrator");
	},
	canDelete: function(){
		return Roles.userIsInRole(Meteor.user(), "administrator");
	},
	createdByUserName: function(){
		return Meteor.users.findOne(this.details.runByUserId).profile.name;
	},
	disableUsersAttending: function(){
		if (this.signedUpUserIds.length == 0)
			return "disabled";
		else
			return "";
	},
	numUsersSignedUpOrOnWaitingList : function() {
		return (this.waitingListUserIds || []).length + this.signedUpUserIds.length;
	},
	signUpTooltip : function(){
		if (Meteor.user())
			return {};

		return {
			"data-toggle" : "tooltip",
			"data-placement" : "top",
			"title" : "You must be logged in to sign up for a course"
		}
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

	if (course.isFull() && course.hasWaitingList() && course.isUserSignedUp()) {
		Dialogs.theresAWaitingListDialog.show(courseId);
	}
	else if (course.isUserSignedUpOrOnWaitingList()){
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
		if (!course.isUserSignedUpOrOnWaitingList()){
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
