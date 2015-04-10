Collections.Courses.helpers({
    isUserSignedUp : function(user){
        user = user || Meteor.user();
        if (!user.profile)
            return false;

        return _.contains(user.profile.takingCourseIds, this._id);
    },
    isUserOnWaitingList: function(user){
        user = user || Meteor.user();
        if (!user.profile)
            return false;

        return _.contains(this.waitingListUserIds, user._id);
    },
    isUserSignedUpOrOnWaitingList : function(user){
        user = user || Meteor.user();

        return this.isUserSignedUp(user) || this.isUserOnWaitingList(user);
    },
    canUserSignUp : function(){
        return this.approved && this.startsAt > new Date();
    },
    canUserResign : function(user){
        user = user || Meteor.user();
        return this.approved && _.contains(this.signedUpUserIds, user._id) && this.startsAt > new Date();
    },
    canSignUpToOrResignFrom : function(){
        return this.canUserSignUp() || this.canUserResign();
    },
    isFull :function(){
        return this.signedUpUserIds.length === this.details.numberOfSpaces;
    },
    hasWaitingList : function(){
        return this.waitingListUserIds && this.waitingListUserIds.length > 0;
    },
    usersPositionInWaitingList : function(user){
        user = user || Meteor.user();
        return _.indexOf(this.waitingListUserIds, user._id) + 1;
    }
});
