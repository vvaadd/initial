var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;
var root = __dirname + '/..';

app.use(express.static(path.join(__dirname, '..')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(root));

app.listen(8080);

// Database
var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));

db.open(function () {
    console.log("mongo db is opened!");
    db.collection('notes', function (error, notes) {
        db.notes = notes;
    });
    db.collection('sections', function (error, sections) {
        db.sections = sections;
    });
    db.collection('users', function (error, users) {
        db.users = users;
    });
});

// Notes
var notes_init = [
    {text: "First note"},
    {text: "Second note"},
    {text: "Third note"}
];

app.get("/notes", function (req, res) {
    db.notes.find(req.query).toArray(function (err, items) {
        res.send(items);
    });
});

app.post("/notes", function (req, res) {
    db.notes.insert(req.body);
    res.end();
});

app.delete("/notes", function (req, res) {
    var id = new ObjectID(req.query.id);
    db.notes.remove({_id: id}, function (err) {
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

app.put("/notes", function (req, res) {
    var id = new ObjectID(req.query.id);
    db.notes.update({_id: id}, {$set: {text: req.body.text}}, function (err) {
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});

// Sections
app.get("/sections", function (req, res) {
    db.sections.find(req.query).toArray(function (err, items) {
        res.send(items);
    });
});

app.post("/sections/replace", function (req, resp) {
    // do not clear the list
    if (req.body.length === 0) {
        resp.end();
    }
    db.sections.remove({}, function (err, res) {
        if (err) console.log(err);
        db.sections.insert(req.body, function (err, res) {
            if (err) console.log("err after insert", err);
            resp.end();
        });
    });
});

// User
app.get("/checkUserUnique", function (req, res) {
    // console.log(db.users.count({name: req.query.user}).subscribe());
    db.users.find({name: req.query.user}).count(function (err, count) {
        res.send(count === 0);
    });

    // db.users.find({name: req.query.name}).toArray(function (err, items) {
    //     res.send(items.length > 0);
    // });
});
app.post("/users", function (req, res) {
    db.users.insert(req.body, function (resp) {
        req.session.userName = req.body.userName;
        res.end();
    });
});

// Common url
app.get("*", function (req, res, next) {
    res.sendFile('index.html', {root: root});
});