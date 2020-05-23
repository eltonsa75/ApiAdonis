'use strict'

const Questions = use("App/Models/Question")
const QuestionResp = use("App/Models/QuestionResp")
const QuestionRespSeq = use("App/Models/QuestionRespSeq")



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with questions
 */
class QuestionController {
  /**
   * Show a list of all questions.
   * GET questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({request}) {
    const questions = await Questions.all();
    return questions
  }
 
  /**
   * Create/save a new question.
   * POST questions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params: { id } }) {
    const question = await Questions.findOrFail(id);
    return question
   
  }

  /**
   * Display a single question.
   * GET questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing question.
   * GET questions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update question details.
   * PUT or PATCH questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a question with id.
   * DELETE questions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }


  async consulta ({request}) {
    const questionsrespseq = await QuestionRespSeq.all();
    return questionsrespseq
  }

  async primeiraQuestao ({ request, response}) {
    return await Questions.query().where('questionnaire_version_id_carga', 1)
    .orderBy('question_edited_number')
    .limit(1)
    .fetch();
  }

  async proxima ({request}) {
    return await Questions.query()
    .where(
      {
        questionnaire_version_id_carga: request.params.carga,
        question_edited_number: request.params.question_edited_number 
      }
    )
    .fetch();
  }

  async save_and_next ({request}) {
    const body = JSON.parse(request.body.json);
    const answer = new QuestionResp();
    answer.fill({
      application_config_id: body.answer.application_config_id,
      question_id: body.answer.question_id,
      phase_id: body.answer.phase_id,
      interviewer_id: body.answer.interviewer_id,
      respondent_id: body.answer.respondent_id,
      answer_yes_no: body.answer.answer_yes_no,
      answer_comments: body.answer.answer_comments,
      answer_observation: body.answer.answer_observation
    })
    await answer.save()
    return await Questions.query()
    .where(
      {
        questionnaire_version_id_carga: body.next.carga,
        question_edited_number: body.next.question_edited_number 
      }
    )
    .fetch();
  }
}

module.exports = QuestionController

