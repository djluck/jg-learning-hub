Accounts.onLogin(function(details) {
    var user = details.user;
    if (isPotentialAdminUser(user)) {
        console.log("Making " + user.services.azureAd.mail + " an administrator");
        Roles.addUsersToRoles(user, ["administrator"]);
    }
    console.log(user)
});


function isPotentialAdminUser(user){
    var validUserEmails = ["james.luck@justgiving.com", "emily@justgiving.com"];
    return _.contains(validUserEmails, user.services.azureAd.mail.toLowerCase()) && !Roles.userIsInRole(user, "administrator");
}

