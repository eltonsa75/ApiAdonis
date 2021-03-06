'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const ApplicationConfig = use("App/Models/ApplicationConfig")
const UserParameter = use("App/Models/UserParameter")
const Database = use('Database')

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
   * PUT applicationconfigs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
   // Salvar os dados da Aplicação
   // Antes: Store, Agora Save

   async store ({ params: { id }, request, auth, response}) {

    // Retorno da API
    let app2
    app2 = await ApplicationConfig.query()
     .select('customers.fantasy_name', 
     'customer_offices.customer_office_name', 
     'business_units.business_unit_name', 
     'areas.area_name', 
     'questionnaire_forms.questionnaire_form_name',
     'application_configs.questionnaire_version_id',
     'question.id as question_id'
     )
     .leftJoin('customers', 'application_configs.customer_id', 'customers.id')
     .leftJoin('customer_offices', 'application_configs.customer_office_id', 'customer_offices.id')
     .leftJoin('business_units', 'application_configs.business_unit_id', 'business_units.id')
     .leftJoin('areas', 'application_configs.area_id', 'areas.id')
     .leftJoin('questionnaire_versions', 'application_configs.questionnaire_version_id', 'questionnaire_versions.id' )
     .leftJoin('questionnaire_forms', 'questionnaire_versions.questionnaire_form_id', 'questionnaire_forms.id' )
     .leftJoin('question', 'question.questionnaire_version_id', 'questionnaire_versions.id' )  
     .where('application_configs.id', '=', request.params.id)
     .orderBy('question.question_edited_number')
     .limit(1)  
     .fetch()
  
    //Obtém o Id do usuário
    //const usuarioLogado = await auth.getUser()
    //const user_id = usuarioLogado.id;
    const user_id = 25
    
    /* Atualiza o registro de user_parameters */
    const affectedRows = await Database  
    .table('user_parameters')
    .where('id', user_id)
    .update({ application_config_id: request.params.id, 
              questionnaire_version_id: app2.rows[0].questionnaire_version_id })
 
    /* Inicia a primeira questão do formulário - somente quando inicia o questionário  */
    /***UPDATE QUESTION_TO_PRESENT***/
    
    try {
     const affectedRows2 = await Database  
     .table('application_configs')
     .where('id', request.params.id)
     .andWhere('question_to_present', 0)
     .update({ question_to_present: app2.rows[0].question_id }) 
     } catch (error) {
 
     }   
    
     console.log('register_ question_to_present: '+app2.rows[0].question_id)
     console.log('register_ application_config_id: '+request.params.id)
 
    //console.log('Retorno da API',  app2.rows[0])
    return response.status(201).send(app2.rows[0])
 
  }

  // Retorno do formulário Entrevista
  async show ({ params: { id }, request, response}) {
    const applicationconfigs = await ApplicationConfig.query()
    .select('customers.fantasy_name', 
    'customer_offices.customer_office_name', 
    'business_units.business_unit_name', 
    'areas.area_name', 'application_configs.id')
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
   * Display a single applicationconfig.
   * GET applicationconfigs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
    // Retorno das Entrevistas disponibilizadas para o consultor para determinado cliente
    async showapp ({ request, response}) {
      const applicationconfigs = await ApplicationConfig.query()
      .select('application_configs.id',  
      'application_configs.status', 
      'questionnaire_forms.questionnaire_form_name',
      'questionnaire_versions.questionnaire_version_name',
      'questionnaire_versions.id as questionnaire_version_id',
      'customers.fantasy_name', 
      'customer_offices.customer_office_name', 
      'business_units.business_unit_name',
      'areas.area_name')
      .leftJoin('questionnaire_versions', 'application_configs.questionnaire_version_id', 'questionnaire_versions.id')
      .leftJoin('questionnaire_forms', 'questionnaire_versions.questionnaire_form_id', 'questionnaire_forms.id')
      .leftJoin('customers', 'application_configs.customer_id', 'customers.id')
      .leftJoin('customer_offices', 'application_configs.customer_office_id', 'customer_offices.id')
      .leftJoin('business_units', 'application_configs.business_unit_id', 'business_units.id')
      .leftJoin('areas', 'application_configs.area_id', 'areas.id')
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

}

module.exports = ApplicationConfigController
