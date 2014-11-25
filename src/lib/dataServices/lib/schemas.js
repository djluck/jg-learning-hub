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
    },
    finishesAt: {
        type: Date,
        autoValue: function(){
            var startsAt = new Date(this.siblingField("startsAt").value);
            var durationMinutes = this.siblingField("durationMinutes").value;
            startsAt.setMinutes(startsAt.getMinutes() + durationMinutes);

            return startsAt;
        }
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
        autoValue: function(){
            if (this.isInsert){
                return Meteor.userId();
            }
            else{
                this.unset();
            }
        },
        denyUpdate: true
    },
    signedUpUserIds: {
        type: [String],
        autoValue: function(){
            if (this.isInsert)
                return [];
            else
                this.unset();
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
        autoValue: function(){
            if (this.isInsert)
                return new Date();
            else
                this.unset();
        },
        denyUpdate: true
    },
    dateModified: {
        type: Date,
        autoValue: DefaultValues.currentDate
    },
    expiresAt: {
        type: Date,
        autoValue: function(){
            var sessions = this.field("sessions").value;
            var lastSession = _.chain(sessions)
                .sortBy(function(s){ return s.startsAt})
                .last();
            console.log("FINISHES AT");
            console.log(sessions)
            var expiresAt = new Date(lastSession.startsAt);
            expiresAt.setMinutes(expiresAt.getMinutes() + lastSession.durationMinutes);
            return expiresAt;
        }
    }
});
