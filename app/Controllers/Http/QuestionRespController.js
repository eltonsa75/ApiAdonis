'use strict'


const QuestionResp = use("App/Models/QuestionResp")
const Resposta = use("App/Models/QuestionResp")
const UserParameter = use("App/Models/UserParameter")
const Database = use('Database')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questionresps
 */
class QuestionRespController {
  /**
   * Show a list of all questionresps.
   * GET questionresps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //const respostas = await Resposta.all();
    const respostas = await Resposta.readById(1);
    return respostas
  }

  /**
   * Render a form to be used for creating a new questionresp.
   * GET questionresps/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  
  async create ({ request, auth }) {

    const data = request.only([
      "application_config_id",
      "question_id",
      "phase_id",
      "respondent_id",
      "answer_yes_no",
      "answer_comments",
      "answer_observation",
      "interviewer_id"
    ])

    
    //Obtém o Id do usuário
    const usuarioLogado = await auth.getUser();
    const user_id = usuarioLogado.id;

    console.log("user_id=", user_id)
    //console.log('Retorno da API com user_id = ',  user_id)
   
    /* Falta agora fazer o select para pegar o application_config_id deste user*/
    const selected_fields = await Database.select('application_config_id').from('user_parameters').where('id', user_id)
    data.application_config_id = selected_fields[ 0 ].application_config_id
    data.interviewer_id = user_id

    //const resposta = await Resposta.create(data)

    /* Sinaliza que a entrevista começou */
    try {

      const affectedRows = await Database  
      .table('application_configs')
      .where('id', selected_fields[ 0 ].application_config_id)
      .update({ status: 1 })

        } catch(error) {
          return response
          .status(400)
          .send({ message: 'Não foi possível atualizar o status da entrevista'})
        }

    /* Retorna */

    return resposta
  }



 

  /**
   * Create/save a new questionresp.
   * POST questionresps
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single questionresp.
   * GET questionresps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing questionresp.
   * GET questionresps/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update questionresp details.
   * PUT or PATCH questionresps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {

    const resposta = await Resposta.findOrFail(params.id);

    const data = request.only([
    "application_config_id",
    "question_id",
    "phase_id",
    "interviewer_id",
    "respondent_id",
    "answer_yes_no",
    "answer_comments",
    "answer_observation"]);

    resposta.merge(data);

    //Obtém o Id do usuário
    //const usuarioLogado = await auth.getUser();
    //const user_id = usuarioLogado.id;

    const user_id = 25
   
    /* Falta agora fazer o select para pegar o application_config_id deste user*/
    const selected_fields = await Database.select('application_config_id').from('user_parameters').where('id', user_id)
    resposta.application_config_id = selected_fields[ 0 ].application_config_id
    resposta.interviewer_id = user_id
    await resposta.save()

    return resposta

  }


  /**
   * Delete a questionresp with id.
   * DELETE questionresps/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const resposta = await Resposta.findOrFail (params.id);
    await resposta.delete();
  }
}

module.exports = QuestionRespController
