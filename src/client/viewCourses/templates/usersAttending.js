Template.usersAttending.helpers({
    "attendants" : function(){
        return _.map(
            this.signedUpUserIds,
            function(userId){
                return Meteor.users.findOne(userId);
            }
        );
    }
})