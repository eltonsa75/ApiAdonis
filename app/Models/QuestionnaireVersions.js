'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuestionnaireVersions extends Model {
    static get table() {
        return "questionnaire_versions"
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
}

module.exports = QuestionnaireVersions
