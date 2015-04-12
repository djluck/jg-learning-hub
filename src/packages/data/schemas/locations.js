initCollectionAndSchema("Locations", {
    name: {
        type: String,
        min : 1
    },
    //the email address that identifies this room in outlook. We can attach this to events to get email if the
    //room is booked or not.
    outlookResourceEmailAddress : {
        type: String,
        optional: true
    }
});