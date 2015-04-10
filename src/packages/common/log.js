Log = {
    info : function(){
        var argumentsArray = _.toArray(arguments)
        var msg = argumentsArray.slice(0, 1)[0];

        var args = [];
        if(argumentsArray.length > 1)
            args = argumentsArray.slice(1, argumentsArray.length);

        var toLog = _.reduce(args, formatArg, msg);

        console.log(toLog);
    }
}

function formatArg(msg, arg, index){
    var regex = new RegExp("\\{" + index + "\\}");
    if (_.isObject(arg)){
        arg = JSON.stringify(arg);
    }

    return msg.replace(regex,"'" + arg + "'");
}