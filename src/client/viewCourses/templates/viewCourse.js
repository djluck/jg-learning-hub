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
	}
}

function subscribeOrUnsubscribeUser(course){
	var user = Meteor.user();
	var courseId = course._id;

	if (Rules.Courses.isCourseFull(course) && Rules.Courses.courseHasWaitingList(course) && UserCourseDataService.isSignedUp(user, courseId)) {
		Dialogs.theresAWaitingListDialog.show(courseId);
	}
	else if (UserCourseDataService.isSignedUpOrOnWaitingList(user, courseId)){
		Methods.resignFromCourseOrLeaveWaitingList(courseId);
	}
	else{
		Methods.signUpToCourseOrJoinWaitingList(courseId)
			.then(function(result){
				if (!result.isOnWaitingList)
					return;

				Dialogs.notifyWaitingListPosition.show({waitingListPosition: result.waitingListPosition});
			});
	}
}
