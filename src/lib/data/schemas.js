//need a type for departments + format + session

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


initCollectionAndSchema("Sessions", {
    startsAt: {
        type: Date
    },
    locationName: {
        type: String
    },
    durationMinutes: {
        type: Number,
        min: 1,
        max: 900
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
    },
    dateCreated: {
        type: Date,
        autoValue: DefaultValues.currentDate,
        denyUpdate: true
    },
    dateModified: {
        type: Date,
        autoValue: DefaultValues.currentDate
    }
});

initCollectionAndSchema("Courses", {
    details: {
        type: Schemas.CourseDetails,
        min: 1
    },
    createdByUser: {
        type: String,
        autoValue: DefaultValues.userId,
        denyUpdate: true
    },
    signedUpUserIds: {
        type: [String],
        autoValue: function(){
            return [];
        }
    },
    sessionIds: {
        type: [String]
    }
});

// Collections.Courses.addPrediction = function(prediction){
// 	Schemas.Predictions.clean(prediction);
// 	Collections.Predictions.insert(prediction, handleError);
// };

// Collections.Predictions.orderedByNewest = function(){
// 	return _.map(
// 		Collections.Predictions.find({}, {sort: { dateCreated : -1 }}).fetch(),
// 		function(p){
// 			p.user = Meteor.users.findOne({_id: p.userId});
// 			return p;
// 		}
// 	);
// };