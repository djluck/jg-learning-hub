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

Collections.Courses.commands.signUserUpToCourse = function(courseId, userId){
    var modifier = { $push : { "signedUpUserIds" : userId } };
    Collections.Courses.sync.update(courseId, modifier);

    var modifier = { $push: { "profile.takingCourseIds" : courseId } };
    Meteor.users.sync.update(userId, modifier);
}

Collections.Courses.commands.addUserToWaitingList = function(courseId, userId){
    var modifier = { $push : { "waitingListUserIds" : userId } };
    Collections.Courses.sync.update(courseId, modifier);
}

Collections.Courses.commands.removeUserFromWaitingList = function(courseId, user){
    var modifier = { $pull : { "waitingListUserIds" : user._id } };
    Collections.Courses.sync.update(courseId, modifier);
}

Collections.Courses.commands.resignUserFromCourse = function(courseId, user){
    var modifier = { $pull: { "profile.takingCourseIds" : courseId } };
    Meteor.users.sync.update(user._id, modifier);

    var modifier = { $pull : { "signedUpUserIds" : user._id } };
    Collections.Courses.sync.update(courseId, modifier);
}

Collections.Courses.commands.updateSessions = function(id, sessions){
    var modifier = 	{
        $set: { sessions : sessionsOrderedByStartDate(sessions) }
    };
    Collections.Courses.sync.update(id, modifier);
}

Collections.Courses.commands.popNextUserFromWaitingList = function(course){
    var nextUserInLine = Meteor.users.findOne(course.waitingListUserIds[0]);
    var modifier = { $pop : { "waitingListUserIds" : -1 } };
    Collections.Courses.sync.update(course._id, modifier);

    return nextUserInLine;
}


function sessionsOrderedByStartDate(sessions){
    return _.sortBy(sessions, function(s) { return s.startsAt; });
}
