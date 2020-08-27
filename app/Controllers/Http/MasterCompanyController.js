'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const MasterCompany = use("App/Models/MasterCompany")

/**
 * Resourceful controller for interacting with mastercompanies
 */
class MasterCompanyController {
  /**
   * Show a list of all mastercompanies.
   * GET mastercompanies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   * @param {Object} ctx.pagination
   */
  async index ({ request, response, pagination }) {

    const company_name = request.input('company_name')

    const query = MasterCompany.query()

    if(company_name) {
      query.where('company_name', 'LIKE', `%${company_name}%`)
    }
    const mastercompanies = await query.paginate(pagination.page, pagination.limit)
    return response.send(mastercompanies)

  }

  /**
   * Create/save a new mastercompany.
   * POST mastercompanies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single mastercompany.
   * GET mastercompanies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: { id }, request, response }) {
    const mastercompanies = await MasterCompany.findOrFail(id)
    return response.send(mastercompanies)
  }


  /**
   * Update mastercompany details.
   * PUT or PATCH mastercompanies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: { id }, request, response }) {

  }

  /**
   * Delete a mastercompany with id.
   * DELETE mastercompanies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = MasterCompanyController
