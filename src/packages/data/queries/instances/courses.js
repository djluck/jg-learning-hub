Collections.Courses.helpers({
    userIsSignedUp : safelyFetchUser(false, function(user){
        return _.contains(user.profile.takingCourseIds, this._id);
    }),
    userIsOnWaitingList: safelyFetchUser(false, function(user){
        return _.contains(this.waitingListUserIds, user._id);
    }),
    userIsSignedUpOrOnWaitingList : safelyFetchUser(false, function(user){
        return this.userIsSignedUp(user) || this.userIsOnWaitingList(user);
    }),
    userCanSignUp : function(){
        return this.approved && this.startsAt > new Date();
    },
    userCanResign : safelyFetchUser(false, function(user){
        return this.approved && _.contains(this.signedUpUserIds, user._id) && this.startsAt > new Date();
    }),
    userCanSignUpToOrResignFrom : safelyFetchUser(false, function(){
        return this.userCanSignUp() || this.userCanResign();
    }),
    isFull : function(){
        return this.signedUpUserIds.length === this.details.numberOfSpaces;
    },
    hasWaitingList : function(){
        return this.waitingListUserIds && this.waitingListUserIds.length > 0;
    },
    usersPositionInWaitingList : function(user){
        user = user || Meteor.user();
        return _.indexOf(this.waitingListUserIds, user._id) + 1;
    },
    createdByUsername : function(user){
        var user = Meteor.users.findOne(this.details.runByUserId);
        return user ? user.profile.name : "";
    }
});

function safelyFetchUser(defaultValue, fn){
    return function(user){
        user = user || Meteor.user();
        if (!user || !user.profile)
            return defaultValue;

        return fn.call(this, user);
    }
}
