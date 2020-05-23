'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Customer = use("App/Models/Customer")
const CustomerOffice = use('App/Models/CustomerOffice')

/**
 * Resourceful controller for interacting with customeroffices
 */
class CustomerOfficeController {
  /**
   * Show a list of all customeroffices.
   * GET customeroffices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
     //Lista todos os CustomerOffice
     async index ({ request, response}) {
      const customersoffice = await CustomerOffice.all()
      return response.send(customersoffice)
      }


  /**
   * Create/save a new customeroffice.
   * POST customeroffices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // Cadastra novas Filiais 
  async store ({ request, response }) {
    try {
      const { customer_id, customer_office_name, customer_office_code, fantasy_name } = request.all()
      const customersoffice = await CustomerOffice.create({ customer_id, customer_office_name, customer_office_code, fantasy_name })
      return response.status(201).send(customersoffice)
    } catch (error) {
      return response.status(400).send({
        message: "Erro a processar a sua solicitação!"
      })
    }
  }

  /**
   * Display a single customeroffice.
   * GET customeroffices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   // Busca a lista de Filiais do cliente
  async show ({ params: { id }, request}) {
    return await CustomerOffice.query()
    .where('customer_id', id)
    .fetch();
  }

  /**
   * Update customeroffice details.
   * PUT or PATCH customeroffices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {
     //pega o ID
     const customeroffice = await CustomerOffice.findOrFail(id)
     try {
       const { customer_id, customer_office_name, customer_office_code, fantasy_name } = request.all()
       customeroffice.merge({ customer_id, customer_office_name, customer_office_code, fantasy_name })
       await customeroffice.save()
       return response.send(customeroffice)
     } catch(error) {
       return response
       .status(400)
       .send({ message: 'Não foi possível atualizar este produto!'})
     }
  }

  /**
   * Delete a customeroffice with id.
   * DELETE customeroffices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params: { id }, request, response }) {
    const customeroffice = await CustomerOffice.findOrFail(id)
    try{
      await customeroffice.delete()
      return response.status(204).send({ message: 'Cliente deletado com sucesso!'})
    } catch (error) {
      return response.status(500).send({ message: 'Não fo possivel deletar este produto!'})
    }
   }
 }

module.exports = CustomerOfficeController
