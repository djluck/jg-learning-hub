Collections.Courses.commands = {};

Collections.Courses.commands.create = function(details, sessions){
    var toInsert = {
        details : details,
        sessions : sessionsOrderedByStartDate(sessions)
    };
    return Collections.Courses.sync.insert(toInsert);
}

Collections.Courses.commands.updateDetailsAndSessions = function(id, details, sessions){
    var modifier = 	{
        $set: { details : details,  sessions : sessionsOrderedByStartDate(sessions) }
    };
    Collections.Courses.sync.update(id, modifier);
}

Collections.Courses.commands.approve = function(id){
    var modifier = { $set : { "approved" : true }};
    Collections.Courses.sync.update(id, modifier);
}

Collections.Courses.commands.subscribeUserToCourse = function(courseId, userId){
    var modifier = { $push : { "waitingListUserIds" : userId } };
    Collections.Courses.sync.update(courseId, modifier);

    var modifier = { $push: { "profile.takingCourseIds" : courseId } };
    Meteor.users.sync.update(userId, modifier);
}

Collections.Courses.commands.addUserToWaitingList = function(courseId, userId){
    var modifier = { $push : { "waitingListUserIds" : userId } };
    Collections.Courses.sync.update(courseId, modifier);
}


function sessionsOrderedByStartDate(sessions){
    return _.sortBy(sessions, function(s) { return s.startsAt; });
}
