'use strict'

const Resposta = use("App/Models/QuestionResp")

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
  async create ({ request }) {
    const data = request.only([
      "response_id",
      "application_config_id",
      "question_id",
      "phase_id",
      "interviewer_id",
      "respondent_id",
      "answer_yes_no",
      "answer_comments",
      "answer_observation"
    ])
    const resposta = await Resposta.create(data)
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
  async update ({ params, request, response }) {
    const resposta = await Resposta.findOrFail(params.id);
    const data = request.only([
    "response_id",
    "application_config_id",
    "question_id",
    "phase_id",
    "interviewer_id",
    "respondent_id",
    "answer_yes_no",
    "answer_comments",
    "answer_observation"]);
    resposta.merge(data);
    await resposta.save();

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
