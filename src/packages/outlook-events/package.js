Package.describe({
  name: 'jg-learninghub-outlook-events'
});

Package.onUse(function(api) {
    setupCommon(api);
});


Package.onTest(function (api) {
    setupCommon(api);
    api.imply(["meteor-platform"])
    api.use(["tinytest", "accounts-password", "underscore@1.0.3", "check", "practicalmeteor:sinon@1.10.3_2"]);
    api.addFiles([
            "tests/eventsMock.js",
            "tests/util.js",
            "tests/updateEventDetails.js",
            "tests/deleteEvents.js",
            "tests/createEvents.js",
            "tests/updateEventAttendees.js"
        ],
        "server"
    );
});

function setupCommon(api){
    api.versionsFrom('1.1.0.2');
    api.use(['jg-learninghub-common', 'jg-learninghub-data', 'email', 'wiseguyeh:office-365-events@0.1.2']);
    api.addFiles('outlookEvents.js');
}