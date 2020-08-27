'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserParameter extends Model {
    static get table() {
        return "user_parameters"
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }
}

module.exports = UserParameter