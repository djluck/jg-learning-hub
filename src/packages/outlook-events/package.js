Package.describe({
  name: 'jg-learninghub-outlook-events'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['jg-learninghub-common', 'jg-learninghub-data', 'email', 'wiseguyeh:office-365-events@0.1.0']);
    api.addFiles('outlookEvents.js');
});