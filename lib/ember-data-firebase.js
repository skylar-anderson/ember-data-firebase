/*global Ember*/
/*global DS*/
'use strict';

DS.FirebaseAdapter = DS.Adapter.extend(Ember.Evented, {

    find: function (store, type, id) {

        var url = this._buildFirebaseURL(type, null, id),
            fb = new Firebase(url);

        return new Ember.RSVP.Promise(function(resolve, reject) {
            fb.on("value", function(snapshot) {
                resolve(snapshot.val());
            }, function(error) { reject(error) });
        });

    },

    findMany: function (store, type, ids) {

        var promises = [];

        Ember.forEach(ids, function(id) {
            console.log("Finding ID " + id);
            promises.push(this.find(store, type, id));
        }).bind(this);

        return Ember.RSVP.all(promises);
    },

    findQuery: function (store, type, query, recordArray) {
        // TODO
    },

    query: function (records, query) {
        // TODO
        // Firebase does not support querying
        // Will have to build client side querying
    },

    findAll: function (store, type) {

        var url = this._buildFirebaseURL(type),
            fb = new Firebase(url);

        return new Ember.RSVP.Promise(function(resolve, reject) {

            fb.once("value", function(snapshot) {

                var results = [];

                snapshot.forEach(function(child) {
                    var data = child.val();
                    data.id = child.name();
                    results.push(Ember.copy(data))
                });

                resolve(results);

            }, function(error) { reject(error); });
        });

    },

    createRecord: function (store, type, record) {

        var url = this._buildFirebaseURL(type, record.constructor),
            fb = new Firebase(url),
            data = record.serialize({ includeId: true }),
            fbRecord;

        if(data.id) {
            fbRecord = fb.child(data.id);
        } else {
            fbRecord = fb.push();
        }

        return new Ember.RSVP.Promise(function(resolve, reject) {
            fbRecord.set(data, function(error) {
                if(error) {
                    throw new Error("Firebase error: ", error);
                    reject();
                } else {
                    resolve();
                }
            });
        });

    },

    updateRecord: function (store, type, record) {

        var url = this._buildFirebaseURL(type, record.constructor, record.get('id')),
            fb = new Firebase(url),
            data = record.serialize({ includeId: true });

        return new Ember.RSVP.Promise(function(resolve, reject) {

            fb.update(data, function(error) {
                if(error) {
                    throw new Error("Firebase error: ", error);
                    reject();
                } else {
                    resolve();
                }
            });

        });
    },

    deleteRecord: function (store, type, record) {

        var url = this._buildFirebaseURL(type, record.constructor, record.get('id')),
            fb = new Firebase(url);

        return new Ember.RSVP.Promise(function(resolve, reject) {

            fb.set(null, function(error) {

                if(error) {
                    throw new Error("Firebase error: ", error);
                    reject();
                } else {
                    resolve();
                }

            });

        });
    },

  // private

    _buildFirebaseURL: function(type, klass, id) {

        var fbURL = this.firebaseURL,
            modelURL = (klass && klass.url) ? klass.url : type;

        if (!fbURL) {
            throw new Error("DS.FirebaseAdapter requires a FirebaseURL to be specified");
        }

        if (id) {
            return "%@/%@/%@".fmt(fbURL, modelURL, id);
        } else {
            return "%@/%@".fmt(fbURL, modelURL);
        }

    }
});