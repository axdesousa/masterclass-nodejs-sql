const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename)
const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const connection = new Sequelize(dbConfig)

const models = []

fs.readdirSync(__dirname)
    .filter(file => {
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    })
    .forEach(file => {
        models.push(require(file))
    })

models.forEach(model => {
    model.init(connection)
})

Object.keys(connection.models).forEach(modelName => {
    if (connection.models[modelName].associate) {
        connection.models[modelName].associate(connection.models)
    }
})

module.exports = connection
