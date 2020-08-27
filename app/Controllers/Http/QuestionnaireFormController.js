'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const QuestionnaireForm = use("App/Models/QuestionnaireForm")

/**
 * Resourceful controller for interacting with questionnaireforms
 */
class QuestionnaireFormController {
  /**
   * Show a list of all questionnaireforms.
   * GET questionnaireforms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  /*
  async index ({ request, response}) {
    const questionnaireForm = await QuestionnaireForm.all()
    return response.send(questionnaireForm)
    }
*/
async index ({ request, auth, response}) {

  //Obtém o Id do usuário
  //const usuarioLogado = await auth.getUser()
  //const user_id = usuarioLogado.id;

  const user_id = 25
  return await QuestionnaireForm.query()
  .leftJoin('questionnaire_versions', 'questionnaire_versions.questionnaire_form_id', 'questionnaire_forms.id' )
  .leftJoin('user_parameters', 'user_parameters.questionnaire_version_id', 'questionnaire_versions.id' )
  .where('user_parameters.id', user_id)
  .limit(1)
  .fetch();
}


  /**
   * Render a form to be used for creating a new questionnaireform.
   * GET questionnaireforms/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new questionnaireform.
   * POST questionnaireforms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single questionnaireform.
   * GET questionnaireforms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing questionnaireform.
   * GET questionnaireforms/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update questionnaireform details.
   * PUT or PATCH questionnaireforms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a questionnaireform with id.
   * DELETE questionnaireforms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = QuestionnaireFormController
