initCollectionAndSchema("Courses", {
    _id: {
        type: String,
        optional: true
    },
    approved: {
        type: Boolean,
        autoValue: function(){
            if (!this.isSet && this.isInsert){
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
