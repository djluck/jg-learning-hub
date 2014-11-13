var sessionsKey = "sessions";

Sessions = {
	getSessions : getSessions,
	getSession : getSession,
	addNewEmptySession : addNewEmptySession,
	initSessions : initSessions,
	removeSession : removeSession,
	updateSession : updateSession,
	getSessionsForStorage : getSessionsForStorage,
	getSessionsReadyForStorage : getSessionsReadyForStorage
};


function addNewEmptySession(){
	var sessions = Session.get(sessionsKey);
	var newSession = createNextSession();
	sessions[newSession.tempId] = newSession;
	Session.set(sessionsKey, sessions);
}

function initSessions(){
	var sessions = Session.get(sessionsKey);
	if (!sessions){
		var defaultSession = createNextSession();
		var dict = {};
		dict[defaultSession.tempId] = defaultSession;
		Session.set(sessionsKey, dict);
	}
}

function createNextSession(){
	var sessions = Session.get(sessionsKey) || {};
	var tempIds = _.keys(sessions);
	var isFirst = tempIds.length === 0;
	var tempId = isFirst ? 1 : parseInt(tempIds[tempIds.length - 1]) + 1;
	return {
		isFirst: isFirst,
		tempId: tempId,
		formId: "session" + tempId
	}
}

function getSessions(){
	var idsAndSessions = _.pairs(Session.get(sessionsKey));
	var sorted = _.sortBy(idsAndSessions, function (kv){
		return parseInt(kv[0]);
	});
	return _.map(sorted, function(e){
		return e[1];
	});
}

function getSession(id){
	return Session.get(sessionsKey)[id];
}

function updateSession(session){
	var sessions = Session.get(sessionsKey);
	sessions[session.tempId] = session;
	Session.set(sessionsKey, sessions);
}

function removeSession(session){
	var sessions = Session.get(sessionsKey);
	delete sessions[session.tempId];
	Session.set(sessionsKey, sessions);
}

function getSessionsForStorage(){
	return null;
}

function getSessionsReadyForStorage(course){
	var sessions = getSessions();

	var cleanedSessions = _.map(sessions, function(session){
		delete session["tempId"];
		delete session["formId"];
		delete session["isFirst"];

		return session;
	});
	return cleanedSessions;
}