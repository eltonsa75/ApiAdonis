'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ApplicationConfig = use("App/Models/ApplicationConfig")

/**
 * Resourceful controller for interacting with applicationconfigs
 */
class ApplicationConfigController {
  /**
   * Show a list of all applicationconfigs.
   * GET applicationconfigs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ request, response}) {
    const applicationconfigs = await ApplicationConfig.all()
    return response.send(applicationconfigs)
    }


  /**
   * Create/save a new applicationconfig.
   * POST applicationconfigs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
 // Salvar os dados da Aplicação
 async store ({ request, response }) {
  try {
    const { questionnaire_version_id,
      application_phases_list,
      customer_id,
      customer_office_id,
      business_unit_id,
      area_id,
      interviewer_id,
      interviewee_1_id,
      interviewee_2_id,
      interviewee_3_id,
      interviewee_4_id,
      interviewee_5_id,
      location,
      general_considerations,
      other_participants } = request.all()
      let app
      const applicationconfigs = await 
      ApplicationConfig.create({ 
      questionnaire_version_id,
      application_phases_list,
      customer_id,
      customer_office_id,
      business_unit_id,
      area_id,
      interviewer_id,
      interviewee_1_id,
      interviewee_2_id,
      interviewee_3_id,
      interviewee_4_id,
      interviewee_5_id,
      location,
      general_considerations,
      other_participants
    })
    // Retorno da API
      app = await ApplicationConfig.query()
      .select('customers.fantasy_name', 'customer_offices.customer_office_name', 'business_units.business_unit_name', 'areas.area_name', 'questionnaire_forms.questionnaire_form_name')
      .leftJoin('customers', 'application_configs.customer_id', 'customers.id')
      .leftJoin('customer_offices', 'application_configs.customer_office_id', 'customer_offices.id')
      .leftJoin('business_units', 'application_configs.business_unit_id', 'business_units.id')
      .leftJoin('areas', 'application_configs.area_id', 'areas.id')
      .leftJoin('questionnaire_forms', 'application_configs.questionnaire_version_id', 'questionnaire_forms.id' )
      .where('application_configs.id', '=', applicationconfigs.id)
      .limit(1)
      .fetch()

    console.log('Retorno da API',  app.rows[0])
    return response.status(201).send(app.rows[0])
  } catch (error) {
    return response.status(400).send({
      message: "Erro a processar a sua solicitação!"
    })
  }
}

  /**
   * Display a single applicationconfig.
   * GET applicationconfigs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // Retorno do forrmulário Entrevista
  async show ({ params: { id }, request, response}) {
    const applicationconfigs = await ApplicationConfig.query()
    .select('customers.fantasy_name', 'customer_offices.customer_office_name', 'business_units.business_unit_name', 'areas.area_name')
    .leftJoin('customers', 'application_configs.customer_id', 'customers.id')
    .leftJoin('customer_offices', 'application_configs.customer_office_id', 'customer_offices.id')
    .leftJoin('business_units', 'application_configs.business_unit_id', 'business_units.id')
    .leftJoin('areas', 'application_configs.area_id', 'areas.id')
    .where('application_configs.id', '=', request.params.id)
    .limit(1)
    .fetch()
    return response.send(applicationconfigs)
  }

  /**
   * Update applicationconfig details.
   * PUT or PATCH applicationconfigs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a applicationconfig with id.
   * DELETE applicationconfigs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ApplicationConfigController
