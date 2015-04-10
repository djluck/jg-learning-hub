Schemas.Sessions = new SimpleSchema({
    startsAt: {
        type: Date,
        min: function(){
            return new Date();
        }
    },
    locationId: {
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