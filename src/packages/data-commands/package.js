Package.describe({
    name: 'jg-learninghub-data-commands'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['jg-learninghub-common', 'jg-learninghub-data']);
    api.imply(['jg-learninghub-common', 'jg-learninghub-data']);
    api.addFiles('lib/syncOperations.js');
    api.addFiles('commands/courses.js');
});