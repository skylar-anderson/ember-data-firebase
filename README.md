Ember Data + Firebase
===================

Ember Data v1.0.0+ Beta adapter for working with your Firebase backend.  Inspired by [ember-firebase-adapter](https://github.com/thomasboyt/ember-firebase-adapter) and [ember-localstorage-adapter](https://github.com/rpflorence/ember-localstorage-adapter).

## Getting Started

```
bower install
npm install
grunt
```

## Example Usage:

Setup your app to use the FirebaseAdapter:

```
App.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebaseURL: 'https://FIREBASE_NAME.firebaseio.com'
});
```

Setup your models to use `FirebaseModel` or `FirebaseLiveModel`:

```
var UserModel = DS.FirebaseLiveModel.extend({
    name: DS.attr(),
    email: DS.attr(),
    posts: DS.hasMany('post', { embedded: 'always' })
});

var PostModel = DS.FirebaseLiveModel.extend({
    title: DS.attr(),
    body: DS.attr()
});

```

Now, you can use your models as you wish:

```
var newPost = this.store.createRecord('post', {
    title: 'Hello World!',
    body: 'My First Post!'
});

newPost.save();

var newUser = this.store.createRecord('user', {
    name: 'Skylar'
    email: 'Skylar@Anderson.is'
});

newUser.get('posts').addObject(newPost);
newUser.save();

```

Use `FirebaseLiveModel` if you wish for your model to receive live updates from Firebase.
