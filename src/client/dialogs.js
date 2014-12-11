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
});
