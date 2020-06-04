'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ApplicationConfig extends Model {
    static get table() {
        return "application_configs"
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
}

module.exports = ApplicationConfig