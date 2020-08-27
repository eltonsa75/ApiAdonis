'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AreaSchema extends Schema {
  up () {
    this.create('areas', (table) => {
      table.increments()
      table.integer('customer_id')
      table.integer('customer_office_id')
      table.integer('business_unit_id')      
      table.text('area_name', 400)    
      table.text('responsible_name', 200)
      table.text('responsible_position', 200)
      table.text('responsible_celular', 20)
      table.text('responsible_fone', 20)
      table.text('responsible_branch', 10)
      table.text('responsible_email', 200)
      table.text('responsible_depto', 10)  
      table.timestamps()
    })
  }

  down () {
    this.drop('areas')
  }
}

module.exports = AreaSchema
