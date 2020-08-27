'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionRespsSeqSchema extends Schema {
  up () {
    this.create('question_resps_seqs', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('question_resps_seqs')
  }
}

module.exports = QuestionRespsSeqSchema
