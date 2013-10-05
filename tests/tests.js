module("FirebaseAdapter");

test("exists", function(){
    ok(DS.FirebaseAdapter);
});

test("is a function", function () {
    ok(typeof DS.FirebaseAdapter === "function");
});

test("is a constructor", function () {
    ok(typeof new DS.FirebaseAdapter() === "object");
});

test("can be extended", function () {
    ok(typeof DS.FirebaseAdapter.extend === "function");
});

var fba = DS.FirebaseAdapter.extend({
    firebaseURL: "https://publicdata-weather.firebaseio.com"
});
var store = new fba();

module("FirebaseAdapter instance");

test("has the correct interface", function () {
    var methods = [
        "find",
        "findMany",
        "findQuery",
        "query",
        "findAll",
        "createRecord",
        "updateRecord",
        "deleteRecord"
    ];
    expect(methods.length);
    methods.map(function (method) {
        ok(typeof store[method] === "function", method + " -- okay");
    });
});

module("find");

asyncTest("can retrieve a single value", function () {
    store.find(null, "chicago", "currently/temperature").then(function (temp) {
        ok(typeof temp === "number");
        start();
    });
});