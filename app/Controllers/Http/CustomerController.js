'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Customer = use("App/Models/Customer")
const MasterCompany = use("App/Models/MasterCompany")

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

   //Lista todos os Customers
  async index ({ request, response}) {
  const customers = await Customer.all()
  return response.send(customers)
  }

    /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // Cadastra novos Clientes 
  async store ({ request, response }) {
    try {
      const {master_company_id, customer_name, customer_code, fantasy_name } = request.all()
      const customer = await Customer.create({ master_company_id, customer_name, customer_code, fantasy_name })
      return response.status(201).send(customer)
    } catch (error) {
      return response.status(400).send({
        message: "Erro a processar a sua solicitação!"
      })
    }
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // Busca a lista de Clientes da empresa master selecionada
  async show ({ params: { id }, request}) {
   return await Customer.query()
   .where('master_company_id', id)
   .limit()
   .fetch();
  }


  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
    //pega o ID
    const customer = await Customer.findOrFail(id)
    try {
      const {master_company_id, customer_name, fantasy_name } = request.all()
      customer.merge({ master_company_id, customer_name, fantasy_name })
      await customer.save()
      return response.send(customer)
    } catch(error) {
      return response
      .status(400)
      .send({ message: 'Não foi possível atualizar este produto!'})
    }

  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    const customer = await Customer.findOrFail(id)
   try{
     await customer.delete()
     return response.status(204).send({ message: 'Cliente deletado com sucesso!'})
   } catch (error) {
     return response.status(500).send({ message: 'Não fo possivel deletar este produto!'})
   }
  }
}

module.exports = CustomerController
