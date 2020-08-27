'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuestApplicationLog extends Model {
    static get table() {
        return "quest_application_logs"
    }
}

module.exports = QuestApplicationLog