Template.viewSessions.helpers({
    "locationName" : function(){
        var location = Collections.Locations.findOne(this.locationId);
        if (!location)
            return "";

return location.name;
}
})