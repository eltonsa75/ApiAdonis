'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Area = use("App/Models/Area")

/**
 * Resourceful controller for interacting with areas
 */
class AreaController {
  /**
   * Show a list of all areas.
   * GET areas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
 
   //Lista todos os Customers
   async index ({ request, response}) {
    const areas = await Area.all()
    return response.send(areas)
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
        const {customer_id, customer_office_id, business_unit_id, area_name } = request.all()
        const areas = await Area.create({ customer_id, customer_office_id, business_unit_id, area_name })
        return response.status(201).send(areas)
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
     return await Area.query()
     .where('customer_id', id)
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
      const areas = await Area.findOrFail(id)
      try {
        const { customer_id, customer_office_id, business_unit_id, area_name } = request.all()
        areas.merge({ customer_id, customer_office_id, business_unit_id, area_name })
        await areas.save()
        return response.send(areas)
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
      const areas = await Area.findOrFail(id)
     try{
       await areas.delete()
       return response.status(204).send()
     } catch (error) {
       return response.status(500).send({ message: 'Não fo possivel deletar este produto!'})
     }
    }
  }

module.exports = AreaController
