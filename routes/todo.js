const express = require('express');
const router = express.Router();
const db = require('../helpers/baza');


router.get('/', function(req, res, next) {
    const username = req.session.username;

    db.getTasks(username, function (izgradjena_lista) {
        res.render('todo', {
            lista: izgradjena_lista,
            username: username
        });
    });
});

router.get('/json', function(req, res, next) {
    const username = req.session.username;

    db.getTasks(username, function (izgradjena_lista) {
        res.send(izgradjena_lista);
    });
});


router.post('/', function(req, res, next){
    const type = req.body.requestType;
    const username = req.session.username;
    const novi_task = req.body.task;

    if (type === "delete") {
        console.log("Brisem task ...");
        db.deleteTask(username, novi_task, function() {
            res.send({});
        })
    } else {
        db.addTask(username, novi_task, function () {
            res.send({});
        });
    }
});



module.exports = router;
