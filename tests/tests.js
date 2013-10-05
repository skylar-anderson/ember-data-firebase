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
    store.find(null, "chicago/currently", "temperature").then(function (temp) {
        ok(typeof temp === "number");
        start();
    });
});

module("findMany");

asyncTest("can retrieve multiple values", function () {
    expect(2);
    store.findMany(null, "chicago/currently", ["temperature", "summary"]).then(function (vals) {
        ok(typeof vals[0] === "number");
        ok(typeof vals[1] === "string");
        start();
    });
});

module("findAll");

asyncTest("can retrieve all values", function () {
    store.findAll(null, "chicago/daily/data").then(function (days) {
        ok(days.length === 8);
        start();
    });
});
