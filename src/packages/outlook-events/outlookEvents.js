OutlookEvents = {
    createEvents : function(courseOrId){
        var course = getCourse(courseOrId);
        _.each(course.session, function(session){
            session.outlookEventId = createEventForSession(course, session).Id;
        })

        Collections.Courses.commands.saveOutlookEventIds(course._id, sessions);
    },
    deleteEvents : function(courseOrId){
        var course = getCourse(courseOrId);

        _.each(course.session, function(session){
            deleteEvent(course, session);
            session.outlookEventId = null;
        });

        Collections.Courses.commands.saveOutlookEventIds(course._id, sessions);
    },
    updateEvents : function(courseOrId, updatedCourseDetails){
        var course = getCourse(courseOrId);

        if (course.runByUserId !== updatedCourseDetails.runByUserId){
            this.deleteEvents(course);
            
            //delete, re-create
        }
        else{
            //update, create
        }
    },
    updateDetailsForEvents : function(courseOrId){
        _.each(course.session, updateEvent.bind(this, course));
    },
    updateAttendees : function(courseOrId){
        var course = getCourse(courseOrId);

        _.each(course.session, updateAttendees.bind(this, course));
    }
}

//we only hold learning hub events in London atm
var timezone = "Europe/London";

function createEventForSession(course, session){
    var location = Collections.Locations.findOne(session.locationId);

    return Office365.event.runByUser(course.runByUserId)
        .subject("JG Learning Hub: " + course.details.title)
        .attendees(getAttendees(course, location))
        .location(location.name)
        .startsAt(moment(session.startsAt).tz(timezone))
        .endsAt(moment(session.startsAt).add(session.durationMinutes, "minutes").tz(timezone))
        .requireAResponse(true)
        .create()
}

function deleteEvent(course, session){
    Office365.event.runByUser(course.runByUserId)
        .delete(session.outlookEventId);
}

function updateEvent(course, session){
    Office365.event.runByUser(course.runByUserId)
        .attendees(getAttendees(course, location))
        .update(session.outlookEventId);
}

function updateAttendees(course, session){
    Office365.event.runByUser(course.runByUserId)
        .location(location.name)
        .startsAt(moment(session.startsAt).tz(timezone))
        .endsAt(moment(session.startsAt).add(session.durationMinutes, "minutes").tz(timezone))
        .update(session.outlookEventId);
}

function getAttendees(course, location){
    var roomAddress = [];

    //if the location has an resource address defined, add it as an attendee- this way the location will respond
    //if it is not available for the selected times
    if ("outlookResourceEmailAddress" in location){
        roomAddress.push(location.outlookResourceEmailAddress)
    }

    return _.union(course.signedUpUserIds || [], course.runByUserId, roomAddress);
}

function getCourse(courseOrId){
    if (_.isString(courseId)){
        return Collections.Courses.findOne(courseOrId);
    }
    return courseOrId;
}