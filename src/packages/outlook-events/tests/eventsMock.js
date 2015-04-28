//replace Office365.event.runByUser with our stub that
var original = Office365.event.runByUser;
var currentCall = 0;
var tinyTest = null;
var sinonSandbox = null;

Office365.event.setup = function(test, sinonSandboxParam){
    tinyTest = test;
    currentCall = 0;
    sinonSandbox = sinonSandboxParam;
    runByUserStub = sinonSandbox.stub(Office365.event, "runByUser");
};

Office365.event.mocks = {};
Office365.event.mocks.arrangeRunByUser = function(withUserId){
    var fluentApi = createFluentApi();
    var fluentStub = sinonSandbox.stub(fluentApi);

    runByUserStub
        .withArgs(withUserId)
        .onCall(currentCall)
        .returns(fluentApi);

    _.chain(fluentApi)
        .keys()
        .difference(["create", "update", "delete", "get"])
        .each(function(property){
            fluentStub[property].withArgs(sinon.match.any).returnsThis();
            fluentStub.calledWith
        });

    fluentStub.create.returns(getDummyEvent(currentCall));
    fluentStub.update.withArgs(sinon.match.any).returns(getDummyEvent(currentCall));
    fluentStub.delete.withArgs(sinon.match.any).returns(getDummyEvent(currentCall));

    currentCall += 1;

    extendAllCalledWith(fluentStub);

    return fluentStub;
};

function createFluentApi(){
    var dummyUser = {
        _id : "azureAd",
        services : {
            azureAd : {
                refreshToken : ""
            }
        }
    };
    //we pass in a dummy user so we can retrieve the fluent api and mock it
    var result = original(dummyUser);
    return result;
}

function getDummyEvent(id){
    return {
        Id : id
    };
}

function extendAllCalledWith(fluentStub){
    _.chain(fluentStub)
        .values()
        .filter(function(v){
            return "calledWith" in v;
        })
        .each(function(spy){
            var old = spy.calledWith;
            spy.calledWith = function(){
                var args = _.toArray(arguments);
                var result = old.apply(this, args);
                tinyTest.isTrue(result, spy.printf("Expected %n to be called with " + JSON.stringify(args) + ", actually called with: %C"));
            }

            spy.notCalled = function(){
                var args = _.toArray(arguments);
                tinyTest.isFalse(spy.called, spy.printf("Expected %n to be never called, actually called with: " + JSON.stringify(args)));
            }
        })
}