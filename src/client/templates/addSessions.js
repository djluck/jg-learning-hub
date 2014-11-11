SessionsKey = "sessions";

Template.addSessions.created = function(){
	Session.setDefault(SessionsKey, createSessionsDictionary());
}

Template.addSessions.events = {
	"click #btnAddSession" : addNewSession
}

Template.addSessions.helpers({
	sessions : function(){
		var idsAndSessions = _.pairs(Session.get(SessionsKey));
		var sorted = _.sortBy(idsAndSessions, function (kv){
			return parseInt(kv[0]);
		});
		return _.map(sorted, function(e){
			return e[1];
		});
	}
})

function addNewSession(event, template){
	var sessions = Session.get(SessionsKey);
	var newSession = createNextSession();
	sessions[newSession.tempId] = newSession;
	Session.set(SessionsKey, sessions);
}

function createSessionsDictionary(){
	var defaultSession = createNextSession();
	var dict = {};
	dict[defaultSession.tempId] = defaultSession;
	return dict;
}

function createNextSession(){
	var sessions = Session.get(SessionsKey) || {};
	var tempIds = _.keys(sessions);
	var isFirst = tempIds.length === 0;
	var tempId = isFirst ? 1 : parseInt(tempIds[tempIds.length - 1]) + 1;
	return {
		isFirst: isFirst,
		tempId: tempId,
		formId: "session" + tempId
	}
}
