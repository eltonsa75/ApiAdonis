'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionRespsSeqSchema extends Schema {
  up () {
    this.table('question_resps_seq', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('question_resps_seq')
  }
}

module.exports = QuestionRespsSeqSchema
