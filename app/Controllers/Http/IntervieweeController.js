'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Interviewee = use("App/Models/Interviewee")

/**
 * Resourceful controller for interacting with interviewees
 */
class IntervieweeController {
  /**
   * Show a list of all interviewees.
   * GET interviewees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response}) {
    const interviewees = await Interviewee.all()
    return response.send(interviewees)
    }


  /**
   * Create/save a new interviewee.
   * POST interviewees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { interviewee_name, interviewee_position, interviewee_celular, interviewee_fone, interviewee_branch, interviewee_email, interviewee_depto } = request.all()
      const interviewee = await Interviewee.create({ interviewee_name, interviewee_position, interviewee_celular, interviewee_fone, interviewee_branch, interviewee_email, interviewee_depto })
      return response.status(201).send(interviewee)
    } catch (error) {
      return response.status(400).send({
        message: "Erro a processar a sua solicitação!"
      })
    }
  }

  /**
   * Display a single interviewee.
   * GET interviewees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }


  /**
   * Update interviewee details.
   * PUT or PATCH interviewees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a interviewee with id.
   * DELETE interviewees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = IntervieweeController
