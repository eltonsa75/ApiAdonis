'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const QuestionnaireVersions = use("App/Models/QuestionnaireVersions")

/**
 * Resourceful controller for interacting with questionnaireversions
 */
class QuestionnaireVersionsController {
  /**
   * Show a list of all questionnaireversions.
   * GET questionnaireversions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  /*
  async index ({ request, response}) {
    const questionnaireVersions = await QuestionnaireVersions.all()
    return response.send(questionnaireVersions)
    }
    */

   async index ({ request, response}) {

    //Obtém o Id do usuário
    //const usuarioLogado = await auth.getUser()
    //const user_id = usuarioLogado.id;
    const user_id = 25

    const questionnaireVersions = await QuestionnaireVersions.query()
    .leftJoin('user_parameters', 'user_parameters.questionnaire_version_id', 'questionnaire_versions.id' )
    .where('user_parameters.id', user_id)
    .limit(1)
    .fetch();
    return response.send(questionnaireVersions)
   }
  /**
   * Render a form to be used for creating a new questionnaireversion.
   * GET questionnaireversions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new questionnaireversion.
   * POST questionnaireversions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single questionnaireversion.
   * GET questionnaireversions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing questionnaireversion.
   * GET questionnaireversions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update questionnaireversion details.
   * PUT or PATCH questionnaireversions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a questionnaireversion with id.
   * DELETE questionnaireversions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = QuestionnaireVersionsController
