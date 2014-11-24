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
        type: Date
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
        autoValue: function(){
            if (this.isInsert){
                return DefaultValues.userId();
            }
            else {
                this.unset();
            }
        },
        denyUpdate: true
    },
    signedUpUserIds: {
        type: [String],
        autoValue: function(){
            if (this.isInsert) {
                return [];
            }
            else{
                this.unset();
            }
        }
    },
    sessions: {
        type: [Schemas.Sessions],
        min: 1
    },
    dateCreated: {
        type: Date,
        autoValue: function(){;
            if (this.isInsert){
                return DefaultValues.currentDate();
            }
            else{
                this.unset();
            }
        },
        denyUpdate: true
    },
    dateModified: {
        type: Date,
        autoValue: DefaultValues.currentDate
    }
});
