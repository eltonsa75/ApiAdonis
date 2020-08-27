'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.create('customers', (table) => {
      table.increments()
      table.integer('master_company_id')
      table.text('customer_name', 400)
      table.text('customer_code', 20)
      table.text('fantasy_name', 400)
      table.integer('segment_id', 20)
      table.integer('sector_id', 20)
      table.text('customer_address', 400)
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
    this.drop('customers')
  }
}

module.exports = CustomerSchema
