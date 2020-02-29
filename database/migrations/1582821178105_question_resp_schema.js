'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionRespSchema extends Schema {
  up () {
    this.create('question_resps', (table) => {
      table.increments()
      table.integer('application_config_id', 11)
      table.integer('question_id', 11)
      table.integer('phase_id', 11)
      table.integer('interviewer_id', 11)
      table.integer('respondent_id', 11)
      table.integer('answer_yes_no', 1)
      table.text('answer_comments', 64000) 
      table.text('answer_observation', 64000)
      table.timestamps()
    })
  }

  down () {
    this.drop('question_resps')
  }
}

module.exports = QuestionRespSchema
