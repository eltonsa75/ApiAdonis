'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const QuestApplicationLog = use("App/Models/QuestApplicationLog")

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
 async store ({ request, response }) {
  try {
    const { 
      applicationn_config_id,
      interviewer_id_log,
      interviewee_1_id_log,
      interviewee_2_id_log,
      interviewee_3_id_log,
      interviewee_4_id_log,
      interviewee_5_id_log,
      first_question_number,
      last_question_number,
      location_log,
      general_considerations_log,
      other_participants_log
     } = request.all()
    const questApplicationLog = await QuestApplicationLog.create({
      applicationn_config_id,
      interviewer_id_log,
      interviewee_1_id_log,
      interviewee_2_id_log,
      interviewee_3_id_log,
      interviewee_4_id_log,
      interviewee_5_id_log,
      first_question_number,
      last_question_number,
      location_log,
      general_considerations_log,
      other_participants_log
   })
   console.log('teste', questApplicationLog)
    return response.status(201).send(questApplicationLog)
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
