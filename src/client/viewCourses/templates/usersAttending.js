Template.usersAttending.helpers({
    "signedUpUsers" : function(){
        return _.map(
            this.signedUpUserIds,
            function(userId){
                return Meteor.users.findOne(userId);
            }
        );
    },
    "usersOnWaitingList": function(){
        return _.map(
            this.waitingListUserIds,
            function(userId, index){
                return { user : Meteor.users.findOne(userId), position : index + 1 };
            }
        );
    },
    "hasWaitingList" : function(){
        return this.waitingListUserIds.length > 0;
    }
})