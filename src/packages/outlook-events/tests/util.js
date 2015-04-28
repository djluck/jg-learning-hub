

//comparing moments seems to fail, perhaps due to the timezone component.
//just compare based on string values.
momentMatcher = function(expected){
    return sinon.match(function(actual){
        return expected.toString() === actual.toString();
    });
}

arrangeLocations = function(){
    var withResourceAddress = Collections.Locations.insert({
        name : "With resource address",
        outlookResourceEmailAddress : "locationName@justgiving.com"
    });
    var withoutResourceAddress = Collections.Locations.insert({
        name : "Without resource address"
    });

    return {
        withResourceAddress : withResourceAddress,
        withoutResourceAddress : withoutResourceAddress
    }
}

Tinytest.addWithSinon = function(name, fnToRun){
    return Tinytest.add(name, function(test){
        var testContext = this;
        sinon.test(function(){
            fnToRun.call(testContext, test, this);
        })();
    })
}