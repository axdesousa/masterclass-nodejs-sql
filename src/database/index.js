const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename)
const Sequelize = require("sequelize")
const dbConfig = require("../config/database")

const connection = new Sequelize(dbConfig)

const models = []
const dirModels = __dirname + `/../models`
fs.readdirSync(dirModels)
    .filter(file => {
        return file.slice(-3) === ".js"
    })
    .forEach(file => {
        models.push(require(`${dirModels}/${file}`))
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
