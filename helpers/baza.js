const orm = require('../models/models');


const getUserID = async function (user) {
    const k = await orm.Korisinik.findAll(
        {where: {
            username: user
        }, limit: 1}).then(korisnik => {
            return korisnik;
        });

    const id = k[0].dataValues.id;
    console.log(id);
    return id;
};

const addUser = function (user, pass, log_in){
    //na ovaj nacin mi kreiramo korisnika i ubacujemo u bazu

    orm.Korisinik.create({username: user, password: pass})
    .catch(err => {
        return console.log(err.message);
    }).then(c => {
        console.log("Korisnik uspjesno dodat u tabelu");
        log_in();
    });
};

const checkUser = function (user, exists) {
    // s ovim pri registraciji provjeravamo da li je zauzeto korisnicko ime ili ne
    orm.Korisinik.find({
        where: {
            username: user
        }
    }).then(k => {
        if (k == null) {
            exists(false)
        } else {
            exists(true)
        }
    });
};

const checkUserPass = function (user, pass, ispravno) {
    // s ovim provjeravamo da li postoji user u nasoj bazi
    orm.Korisinik.findAll({
        where: {
            username: user,
            password: pass
        }, limit: 1
    }).catch(err => {
        return console.log(err.message)
    }).then(rows => {
        if (rows.length === 1) {
            ispravno(true);
        } else {
            ispravno(false);
        }
    })
};

const addTask = async function (user, task, reload){
    const userID = await getUserID(user);
    console.log("userid ");
    console.log(userID);
    orm.Todo.create({id_username: userID, task: task})
    .catch(err => {
        console.log(console.error);
        return console.log(err.message);
    })
    .then(row => {
        console.log("Task uspjesno dodat u tabelu");
        reload();
    })
};

const getTasks = async function(user, render_tasks){
    // s ovim dobijamo spisak taskova,
    // ovo koristimo kada zelimo ispisati sve taskove korisniku
    console.log(user);
    const userID = await getUserID(user);

    orm.Todo.findAll({
        where: {
            id_username: userID
        }}).catch(err => {
        console.log(err.message);
    }).then(rows => {
        var user_tasks = [];
        rows.forEach(function (row) {
            console.log(row);
            user_tasks.push(row);
        });

        render_tasks(user_tasks);
    })
};

const deleteTask = async function(user, taskId, reload) {
    const userID = await getUserID(user);
    orm.Todo.destroy({
        where: {
           id: taskId,
           id_username: userID 
        }
    }).catch(err => {
        console.log(err.message)
    }).then(r => {
        console.log("Task uspjesno izbrisan iz baze");
        reload();
    });
};

module.exports = {
    "addUser": addUser,
    "addTask": addTask,
    "getUserID": getUserID,
    "checkUserPass": checkUserPass,
    "checkUser": checkUser,
    "getTasks": getTasks,
    "deleteTask": deleteTask
};