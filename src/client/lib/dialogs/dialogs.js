Meteor.startup(function(){
    Dialogs = {};

    var errorDialogInfo = {
        template: "errorDialog",
        title : "Oh Dear :(",
        removeOnHide: true,
        buttons: {
            "ok" : {
                closeModalOnClick: true,
                class : "btn-primary",
                label : "Ok"
            }
        },
        doc : function(){
            return {
                "test" : "value"
            };
        }
    };

    Dialogs.errorDialog = ReactiveModal.initDialog(errorDialogInfo);

    var approveCourseDialogInfo = {
        template: "approveCourseDialog",
        title: "Approve this course",
        removeOnHide: true,
        buttons: {
            approve : {
                closeModalOnClick: true,
                class: "btn-primary",
                label: "Approve"
            },
            cancel : {
                closeModalOnClick: true,
                label: "Cancel"
            }
        }
    };

    Dialogs.approveCourseDialog = ReactiveModal.initDialog(approveCourseDialogInfo);

    Dialogs.approveCourseDialog.buttons.approve.on("click", function(e){
        Methods.approveCourse(e.data);
    });

    var deleteCourseDialogInfo = {
        template: "deleteCourseDialog",
        title: "Delete this course",
        removeOnHide: true,
        buttons: {
            deleteCourse : {
                closeModalOnClick: true,
                class: "btn-danger",
                label: "Delete course"
            },
            cancel : {
                closeModalOnClick: true,
                label: "Keep course"
            }
        }
    };

    Dialogs.deleteCourseDialog = ReactiveModal.initDialog(deleteCourseDialogInfo);

    Dialogs.deleteCourseDialog.buttons.deleteCourse.on("click", function(e){
        Methods.deleteCourse(e.data);
    });

    Dialogs.errorDialog = ReactiveModal.initDialog(errorDialogInfo);

    var notifyWaitingListPosition = {
        template: "notifyWaitingListPosition",
        title: "You're on the waiting list",
        removeOnHide: true,
        buttons: {
            ok : {
                closeModalOnClick: true,
                class: "btn-primary",
                label: "Ok"
            }
        }
    };

    Dialogs.notifyWaitingListPosition = ReactiveModal.initDialog(notifyWaitingListPosition);

    var theresAWaitingListDialog = {
        template: "theresAWaitingListDialog",
        title: "Other people want your space!",
        removeOnHide: true,
        buttons: {
            cancelPlace : {
                closeModalOnClick: true,
                class: "btn-danger",
                label: "Cancel my place"
            },
            keepPlace : {
                closeModalOnClick: true,
                label: "Keep my place"
            }
        }
    };

    Dialogs.theresAWaitingListDialog = ReactiveModal.initDialog(theresAWaitingListDialog);

    Dialogs.theresAWaitingListDialog.buttons.cancelPlace.on("click", function(e){
        Methods.resignFromCourseOrLeaveWaitingList(e.data)
    });

});
