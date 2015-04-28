Meteor.users.queries = {};

Meteor.users.queries.findAdmins = function(){
    return Meteor.users.find({ roles : {$in : ["administrator"]}});
}

