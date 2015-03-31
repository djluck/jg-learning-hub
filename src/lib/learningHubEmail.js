if (Meteor.isServer) {
    Email.sendLearningHubNotification = function(to, subject, message){

        var toAddresses;
        if (_.isArray(to)){
            toAddresses =
                _.chain(to)
                .filter(function(user){ return !!user.emails; })
                .map(function(user){ return user.emails[0].address; })
                .value();
        }
        else if (!!to.emails){
            toAddresses = to.emails[0].address;
        }

        if (!toAddresses || toAddresses.length === 0){
            Log.info("Couldn't find anyone to email. Not sending notification {0}", subject);
        }

        Log.info("Sending the notification '{0}' to {1}", subject, toAddresses);
        Email.send({
            from : "learninghub@justgiving.com",
            to : toAddresses,
            subject: subject,
            text : message
        });
    };
}

