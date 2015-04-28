OutlookEvents = {
    createEvents : function(course){
        _.each(course.sessions, function(session){
            session.outlookEventId = createEvent(course, session).Id;
        })
    },
    deleteEvents : function(course){
        _.chain(course.sessions)
            .filter(function(session){
                return !!session.outlookEventId;
            })
            .each(function(session){
                deleteEvent(course, session);
                session.outlookEventId = null;
            });
    },
    updateEventDetails : function(oldCourse, newCourse){
        //if the user running the course changes, we need to re-create the events.
        //this is a quirk of the office 365 API, we cannot re-assign an events owner
        if (newCourse.details.runByUserId !== oldCourse.details.runByUserId){
            this.deleteEvents(oldCourse);
            this.createEvents(newCourse);
        }
        else{
            _.each(newCourse.sessions, function(session){
                if (!session.outlookEventId){
                    session.outlookEventId = createEvent(newCourse, session).Id;
                }
                else{
                    updateEvent(newCourse, session);
                }
            })
        }
    },
    updateAttendeesForEvents : function(course){
        _.each(course.sessions, updateAttendees.bind(this, course));
    }
}

//we only hold learning hub events in London atm
var timezone = "Europe/London";

function createEvent(course, session){
    var location = Collections.Locations.findOne(session.locationId);
    return Office365.event.runByUser(course.details.runByUserId)
        .subject("JG Learning Hub: " + course.details.title)
        .attendees(getAttendees(course, location))
        .location(location.name)
        .startsAt(moment(session.startsAt).tz(timezone))
        .endsAt(moment(session.startsAt).add(session.durationMinutes, "minutes").tz(timezone))
        .requireAResponse(true)
        .create()
}

function deleteEvent(course, session){
    Office365.event.runByUser(course.details.runByUserId)
        .delete(session.outlookEventId);
}

function updateAttendees(course, session){
    var location = Collections.Locations.findOne(session.locationId);

    Office365.event.runByUser(course.details.runByUserId)
        .attendees(getAttendees(course, location))
        .update(session.outlookEventId);
}

function updateEvent(course, session){
    var location = Collections.Locations.findOne(session.locationId);

    Office365.event.runByUser(course.details.runByUserId)
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

    return _.union(course.details.runByUserId, course.signedUpUserIds || [], roomAddress);
}