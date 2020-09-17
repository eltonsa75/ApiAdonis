'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const QuestApplicationLog = use("App/Models/QuestApplicationLog")
const UserParameter = use("App/Models/UserParameter")
const Database = use('Database')


/**
 * Resourceful controller for interacting with applicationconfigs
 */
class QuestApplicationLogController {
  /**
   * Show a list of all applicationconfigs.
   * GET applicationconfigs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
   async index ({ params, request, response}) {
   
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
   async store ({ request, auth, response }) {
    try {
 
     const data = request.only([
       "applicationn_config_id",
       "interviewer_id_log",
       "interviewee_1_id_log",
       "interviewee_2_id_log",
       "interviewee_3_id_log",
       "interviewee_4_id_log",
       "interviewee_5_id_log",
       "location_log",
       "general_considerations_log",
       "other_participants_log"
     ])
     
     //Obtém o Id do usuário
     //const usuarioLogado = await auth.getUser();
     //const user_id = usuarioLogado.id;
 
     const user_id = 25
    
     /* Obtém o application_config_id e o user_id */
     const selected_fields = await Database.select('application_config_id').from('user_parameters').where('id', user_id)
     data.applicationn_config_id = selected_fields[ 0 ].application_config_id
     data.interviewer_id_log = user_id
 
     const ApplicationLog = await QuestApplicationLog.create(data)
     return ApplicationLog
 
     } catch (error) {
         return response.status(400).send({
         message: "Erro ao gravar o log da sessão" })
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
  async show ({ params, request, response}) {
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

module.exports = QuestApplicationLogController
