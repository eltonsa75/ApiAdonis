'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const BusinessUnit = use('App/Models/BusinessUnit')

/**
 * Resourceful controller for interacting with businessunits
 */
class BusinessUnitController {
  /**
   * Show a list of all businessunits.
   * GET businessunits
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response}) {
    const businessunit = await BusinessUnit.all()
    return response.send(businessunit)
    }

  /**
   * Create/save a new customeroffice.
   * POST customeroffices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // Cadastra novas Unidades de Negócios
  async store ({ request, response }) {
    try {
      const { customer_id, customer_office_id, business_unit_name } = request.all()
      const businessunit = await BusinessUnit.create({ customer_id, customer_office_id, business_unit_name })
      return response.status(201).send(businessunit)
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
   // Busca a lista de Unidade de Negócios
  async show ({ params: { id }, request}) {
    return await BusinessUnit.query()
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
     const businessunit = await BusinessUnit.findOrFail(id)
     try {
       const { customer_id, customer_office_id, business_unit_name } = request.all()
       businessunit.merge({ customer_id, customer_office_id, business_unit_name })
       await businessunit.save()
       return response.send(businessunit)
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
    const businessunit = await BusinessUnit.findOrFail(id)
    try{
      await businessunit.delete()
      return response.status(204).send()
    } catch (error) {
      return response.status(500).send({ message: 'Não fo possivel deletar este produto!'})
    }
   }
 }

module.exports = BusinessUnitController
