const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:baza');


const Korisinik = sequelize.define('korisnik', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_username: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    task: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
});


Todo.belongsTo(Korisinik, {
    foreignKey: 'id_username',
    targetKey: 'id'
});

const createTables = function() {

    sequelize.sync({ logging: console.log }).then(fullfil => {

        sequelize
        .authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');

        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
        });
      
    });
};

module.exports.Korisinik = Korisinik;
module.exports.Todo = Todo;
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
module.exports.createTables = createTables;