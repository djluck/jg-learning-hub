Package.describe({
    name: 'jg-learninghub-data'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use(['jg-learninghub-common', 'dburles:collection-helpers']);
    api.imply(['aldeed:collection2']);
    api.addFiles('lib/common.js');
    api.addFiles([
        'schemas/departments.js',
        'schemas/locations.js',
        'schemas/courseFormats.js',
        'schemas/courseDetails.js',
        'schemas/sessions.js',
        'schemas/courses.js'
    ]);
    api.addFiles([
        'queries/collections/courses.js',
        'queries/instances/courses.js',
        'queries/instances/users.js'
    ]);
});