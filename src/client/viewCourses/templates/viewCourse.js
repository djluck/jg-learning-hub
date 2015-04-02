Template.viewCourse.helpers({
	isSignedUpOrOnWaitingList: function(){
		return UserCourseDataService.isSignedUpOrOnWaitingList(Meteor.user(), this._id);
	},
	isSignedUp: function(){
		return UserCourseDataService.isSignedUp(Meteor.user(), this._id);
	},
	isOnWaitingList: function(){
		return UserCourseDataService.isOnWaitingList(Meteor.user(), this._id);
	},
	canEdit: function(){
		return this.createdByUserId === Meteor.userId() || this.details.runByUserId === Meteor.userId() || Roles.userIsInRole(Meteor.user(), "administrator");
	},
	canDelete: function(){
		return Roles.userIsInRole(Meteor.user(), "administrator");
	},
	canSignUpToOrRegignFromCourse: function(){
		return Rules.Courses.canSignUpToCourse(this) || Rules.Courses.canResignFromCourse(this, Meteor.userId());
	},
	courseIsFull: function(){
		return Rules.Courses.isCourseFull(this);
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

	if (Rules.Courses.isCourseFull(course) && Rules.Courses.courseHasWaitingList(course) && UserCourseDataService.isSignedUp(user, courseId)) {
		Dialogs.theresAWaitingListDialog.show(courseId);
	}
	else if (UserCourseDataService.isSignedUpOrOnWaitingList(user, courseId)){
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
		if (!UserCourseDataService.isSignedUpOrOnWaitingList(Meteor.user(), course._id)){
			signUserUpToCourseOrJoinWaitingList(course);
		}
	});
}

function signUserUpToCourseOrJoinWaitingList(course){
	Methods.signUpToCourseOrJoinWaitingList(course._id)
		.then(function(result){
			if (!result.isOnWaitingList)
				return;

			Dialogs.notifyWaitingListPosition.show({waitingListPosition: result.waitingListPosition});
		});
}
