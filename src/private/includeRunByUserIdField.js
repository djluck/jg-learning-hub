var cursor = db.Courses.find();
while (cursor.hasNext()){
    var toUpdate = cursor.next();
    toUpdate.details.runByUserId = toUpdate.createdByUserId;
    print(toUpdate.createdByUserId);
    db.Courses.save(toUpdate);
}
