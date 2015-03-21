if (Meteor.isServer) {
    Email.sendLearningHubNotification = function(to, subject, message){
        if (_.isArray(to)){
            to = _.map(to, function(user){ return user.emails[0].address; });
        }
        else{
            to = to.emails[0].address;
        }

        Log.info("Sending the notification '{0}' to {1}", subject, to);
        Email.send({
            from : "learninghub@justgiving.com",
            to : to,
            subject: subject,
            text : message
        });
    };
}

