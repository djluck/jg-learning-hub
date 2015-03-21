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
    },
    notifiedStartingSoon: {
        type: Boolean,
        autoValue: function(){
            if (!this.isSet){
                return false;
            }
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
    approved: {
        type: Boolean,
        autoValue: function(){
            if (!this.isSet && this.isInsert){
                console.log("Setting default for approved");
                return false;
            }
        }
    },
    details: {
        type: Schemas.CourseDetails
    },
    createdByUserId: {
        type: String,
        autoValue: function(){
            if (this.isInsert){
                if (!this.isSet)
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
            if (!this.isSet && this.isInsert)
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
    waitingListUserIds: {
        type: [String],
        autoValue: function(){
            if (!this.isSet && this.isInsert)
                return [];
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
    startsAt: {
        type: Date,
        autoValue: function(){
            var sessionsField = this.field("sessions");
            if (!sessionsField.isSet)
                return;

            var firstSession = _.chain(sessionsField.value)
                .sortBy(function(s){ return s.startsAt})
                .first()
                .value();

            return firstSession.startsAt;
        }
    },
    expiresAt: {
        type: Date,
        autoValue: function(){
            var sessionsField = this.field("sessions");
            if (!sessionsField.isSet)
                return;
                
            var lastSession = _.chain(sessionsField.value)
                .sortBy(function(s){ return s.startsAt})
                .last()
                .value();

            var expiresAt = moment(lastSession.startsAt)
                .add(lastSession.durationMinutes, "minutes")
                .toDate();

            return expiresAt;
        }
    }
});
