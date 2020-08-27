'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerOfficeSchema extends Schema {
  up () {
    this.create('customer_offices', (table) => {
      table.increments()
      table.integer('customer_id')
      table.text('customer_office_name', 400)
      table.text('customer_office_code', 20)
      table.text('fantasy_name', 400)
      table.text('customer_office_address', 400)
      table.text('address_number', 20)
      table.text('address_compl', 20)
      table.text('address_state', 200)
      table.text('address_city', 200)
      table.text('contact_name', 200)
      table.text('contact_position', 200)
      table.text('contact_celular', 20)
      table.text('contact_fone', 20)
      table.text('contact_branch', 10)
      table.text('contact_email', 200)
      table.text('contact_depto', 10)  
      table.timestamps()
    })
  }

  down () {
    this.drop('customer_offices')
  }
}

module.exports = CustomerOfficeSchema
