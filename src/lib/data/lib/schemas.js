initCollectionAndSchema("Departments", {
    name : {
        type: String,
        min: 1
    }
});

initCollectionAndSchema("CourseFormats", {
    type: {
        type: String,
        min: 1
    }
});

initCollectionAndSchema("Locations", {
    name: {
        type: String
    }
});


Schemas.Sessions = new SimpleSchema({
    startsAt: {
        type: Date,
        min: function(){
            return new Date();
        }
    },
    locationName: {
        type: String
    },
    durationMinutes: {
        type: Number,
        min: 1,
        max: 900 //lulz
    }
});

Schemas.CourseDetails = new SimpleSchema({
    title: {
        type: String,
        min: 1
    },
    objectives: {
        type: String,
        min: 1
    },
    intendedLearnings: {
        type: String,
        min: 1
    },
    suitableFor: {
        type: String,
        min: 1
    },
    numberOfSpaces: {
        type: Number,
        min: 1,
        max: 100
    },
    formatType: {
        type: String,
        min: 1
    }
});

initCollectionAndSchema("Courses", {
    _id: {
        type: String,
        optional: true
    },
    details: {
        type: Schemas.CourseDetails
    },
    createdByUser: {
        type: String,
        defaultValue: DefaultValues.userId,
        denyUpdate: true
    },
    signedUpUserIds: {
        type: [String],
        defaultValue: function(){
            return [];
        }
    },
    sessions: {
        type: [Schemas.Sessions],
        min: 1,
        custom: function(){
            //return true if all sessions do not overlap
            return true;
        }
    },
    dateCreated: {
        type: Date,
        defaultValue: DefaultValues.currentDate,
        denyUpdate: true
    },
    dateModified: {
        type: Date,
        autoValue: DefaultValues.currentDate
    },
    expiresAt: {
        type: Date,
        autoValue: function(){
            var sessions = this.field("sessions");
            var lastSession = _.chain(sessions)
                .sortBy(function(s){ return s.startsAt})
                .last();

            var expiresAt = new Date(lastSession.startsAt);
            expiresAt.setMinutes(expiresAt.getMinutes() + lastSession.durationMinutes);
            return expiresAt;
        }
    }
});
