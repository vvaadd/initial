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
    setUserQuery(req);
    db.notes.find(req.query).toArray(function (err, items) {
        res.send(items);
    });
});

app.post("/notes", function (req, res) {
    req.body.name = req.session.name || "demo";
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
    var name = req.session.name || "demo";
    db.users.find({name: name})
        .toArray(function (err, items) {
            var user = items[0];
            res.send(user.sections || []);
        });
});

app.post("/sections/replace", function(req,res) {
    var name = req.session.name || "demo";
    db.users.update({name:name},
        {$set:{sections:req.body}},
        function() {
            res.end();
        });
});

// User
function setUserQuery(req) {
    req.query.name = req.session.name || "demo";
}
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
        req.session.name = req.body.name;
        res.end();
    });
});

// Login logout
app.post("/login", function(req,res) {
    db.users.find(
        {name:req.body.username,
            password:req.body.password})
        .toArray(function(err, items) {
            if (items.length>0) {
                req.session.name = req.body.username;
            }
            res.send(items.length>0);
        });
});

app.get("/logout", function(req, res) {
    req.session.name = null;
    res.end();
});

// Common url
app.get("*", function (req, res, next) {
    res.sendFile('index.html', {root: root});
});