'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ApplicationConfig extends Model {
    static get table() {
        return "application_configs"
    }
}

module.exports = ApplicationConfig