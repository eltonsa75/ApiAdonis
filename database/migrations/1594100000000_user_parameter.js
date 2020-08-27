'use strict'

const Schema = use('Schema')

class UserParameterSchema extends Schema {
  up () {
    this.create('user_parameter', (table) => {
      table.integer('application_config_id')
      table.integer('questionnaire_version_id')
    })
  }

  down () {
    this.drop('user_parameter')
  }
}

module.exports = UserParameterSchema

