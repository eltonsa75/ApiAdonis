'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionnaireVersionSchema extends Schema {
  up () {
    this.create('questionnaire_versions', (table) => {
      table.increments()
      table.integer('questionnaire_form_id')
      table.text('questionnaire_version_name', 200)
      table.text('questionnaire_version_code', 20)
      table.text('questionnaire_version_date_from', 20)
      table.integer('lgpd_version_id')
      table.integer('sector_id')     
      table.integer('segment_id')
      table.integer('quest_area_id')
      table.integer('quest_functional_id')
      table.integer('quest_technical_id')
      table.integer('evaluation_type_id')
      table.integer('system_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('questionnaire_versions')
  }
}

module.exports = QuestionnaireVersionSchema
