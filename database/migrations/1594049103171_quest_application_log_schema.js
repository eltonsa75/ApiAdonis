'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestApplicationLogSchema extends Schema {
  up () {
    this.create('quest_application_logs', (table) => {
      table.increments()
      table.integer('applicationn_config_id')
      table.integer('interviewer_id_log')
      table.integer('interviewee_1_id_log')
      table.integer('interviewee_2_id_log')
      table.integer('interviewee_3_id_log')
      table.integer('interviewee_4_id_log')
      table.integer('interviewee_5_id_log')
      table.integer('first_question_number')
      table.integer('last_question_number')
      table.text('location_log', 200)
      table.text('general_considerations_log', 200)
      table.text('other_participants_log', 200)
      table.timestamps()
    })
  }

  down () {
    this.drop('quest_application_logs')
  }
}

module.exports = QuestApplicationLogSchema
