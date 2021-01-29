'use strict'

const Questions = use("App/Models/Question")
const Resposta = use("App/Models/QuestionResp")
const QuestionResp = use("App/Models/QuestionResp")
const QuestionRespSeq = use("App/Models/QuestionRespSeq")
const Database = use('Database')




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


  // Método retorno da Questão
  async proximaPR ({request}) {

    return await Database
    .select('*')
    .from('question')
    .leftOuterJoin('question_resps', 'question.id', 'question_resps.question_id')
    .leftOuterJoin('application_configs', 'question_resps.application_config_id',
    'application_configs.id')
    .where(
      {
        application_config_id: request.params.carga,
        question_edited_number: request.params.question_edited_number
      }
    )
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
/*
  async primeiraQuestao ({ request, response}) {
    return await Questions.query().where('questionnaire_version_id_carga', 1)
    .orderBy('question_edited_number')
    .limit()
    .fetch();
  }
*/
async primeiraQuestao ({ request, auth, response}) {

  //Obtém o Id do usuário
  //const usuarioLogado = await auth.getUser()
  //const user_id = usuarioLogado.id;

  const user_id = 25

  return await Questions.query()
    .innerJoin('questionnaire_versions', 'question.questionnaire_version_id', 'questionnaire_versions.id' )
    .innerJoin('questionnaire_forms', 'questionnaire_versions.questionnaire_form_id', 'questionnaire_forms.id' )
    .innerJoin('application_configs', 'question.id', 'application_configs.question_to_present' )
    .innerJoin('user_parameters', 'user_parameters.application_config_id', 'application_configs.id' )
    .innerJoin('question_theme', 'question.question_theme_id', 'question_theme.id' )
    .where('user_parameters.id', user_id)
    .select(
      'question.id',
      'application_configs.question_to_present',
      'question.question_theme_id',
      'question_theme.question_theme',
      'question.phase_id',
      'question.question_edited_number',
      'question.if_yes',
      'question.if_no',
      'question.if_back',
      'question.question_enunciation',
      'question.questionnaire_version_id_carga',
      'question.questionnaire_version_id')
    .orderBy('question_edited_number')
    .limit(1)
    .fetch();
}



async proxima ({request}) {
  return await Questions.query()
  .leftOuterJoin('question_resps', 'question.id', 'question_resps.question_id')
  .leftOuterJoin('application_configs', 'question_resps.application_config_id', 'application_configs.id')
      .where(
    {
      questionnaire_version_id_carga: request.params.carga,
      question_edited_number: request.params.question_edited_number 
    }
  )
  .select(
    'question.id',
    'question.question_theme_id',
    'question.phase_id',
    'question.question_edited_number',
    'question.if_yes',
    'question.if_no',
    'question.if_back',
    'question.question_enunciation',
    'question.questionnaire_version_id_carga',
    'question.questionnaire_version_id',
    'question_resps.answer_yes_no',
    'question_resps.answer_comments',
    'question_resps.answer_observation'      
    )
  .fetch();
  }



  async save_and_next_original ({request, auth}) {

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

    /** inicio */

    //Obtém o Id do usuário
    //const usuarioLogado = await auth.getUser();
    //const user_id = usuarioLogado.id;

    const user_id = 25

    //console.log("user_id=", user_id)
    //console.log('Retorno da API com user_id = ',  user_id)
   
    /* Falta agora fazer o select para pegar o application_config_id deste user*/
    const selected_fields = await Database.select('application_config_id').from('user_parameters').where('id', user_id)
    answer.application_config_id = selected_fields[ 0 ].application_config_id
    answer.interviewer_id = user_id
    await answer.save()

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

    /* Retorna a próxima questão */
    return await Questions.query()
    .leftOuterJoin('question_resps', 'question.id', 'question_resps.question_id')
    .where(
      {
        questionnaire_version_id_carga: body.next.carga,
        question_edited_number: body.next.question_edited_number 
      }
    )
    .select(
      'question.id',
      'question.question_theme_id',
      'question.phase_id',
      'question.question_edited_number',
      'question.if_yes',
      'question.if_no',
      'question.if_back',
      'question.question_enunciation',
      'question.questionnaire_version_id_carga',
      'question.questionnaire_version_id',
      'question_resps.answer_yes_no',
      'question_resps.answer_comments',
      'question_resps.answer_observation' )
    .fetch();
  }



// Atualizando o Método save_and_next
async save_and_next ({request, auth}) {

  const body = JSON.parse(request.body.json);

  //Obtém o Id do usuário
  //const usuarioLogado = await auth.getUser();
  //const user_id = usuarioLogado.id;
  const user_id = 25

  /* Select para pegar o application_config_id deste user*/
  const selected_fields = await Database.select('application_config_id').from('user_parameters').where('id', user_id)
  const application_config_id = selected_fields[ 0 ].application_config_id
  //console.log('application_config_id:')
  //console.log(application_config_id)

  //console.log('body.answer.question_id:')
  //console.log(body.answer.question_id)

  /* Faz o FindOrFail para ver se existe resposta */

  /* Busca o id da questão para recuperar */
  var question_resp_id = 0;
  try {
        /* Obtém o id da resposta */    
        const query_resp = await Database.select('id')
            .from('question_resps')
            .where(function () {
              this
              .where('application_config_id', application_config_id)
              .andWhere('question_id', body.answer.question_id)
            })

        try {
           question_resp_id = query_resp[ 0 ].id
        }  catch(error) {
           question_resp_id = 0
        }
      } catch(error) {

        //console.log ('error:')
        //console.log (error)

        question_resp_id = 0

      }

  //console.log('question_resp_id:')
  //console.log(question_resp_id)

  if(question_resp_id == 0) {
      
      /* Deve ser incluído o registro da resposta */
      //console.log('3'); 

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
     
      answer.application_config_id = application_config_id
      answer.interviewer_id = user_id
      await answer.save();
      //console.log('3.1'); 

  } else {

      /* Deve ser feito update no registro da resposta */
      //console.log('4'); 

      const answer = await Resposta.findOrFail(question_resp_id);
      //const answer = await Resposta.findOrFail(1);

      //console.log('4.1'); 
          /*
          const data = request.only([
          "application_config_id",
          "question_id",
          "phase_id",
          "interviewer_id",
          "respondent_id",
          "answer_yes_no",
          "answer_comments",
          "answer_observation"]);
      
          answer.merge(data);
          */
      answer.merge({
            question_id: body.answer.question_id,
            phase_id: body.answer.phase_id,
            respondent_id: body.answer.respondent_id,
            answer_yes_no: body.answer.answer_yes_no,
            answer_comments: body.answer.answer_comments,
            answer_observation: body.answer.answer_observation
      })

      //console.log('4.2'); 
              
      answer.application_config_id = application_config_id
      answer.interviewer_id = user_id

      /* Comando para atualizar ou incluir a resposta */

      //console.log('5.1'); 

      try {
        //console.log('5.1.1'); 
        await answer.save();
      } catch(error) {
        //console.log('5.1.2'); 
        //console.log(error)
        return response
        .status(400)
        .send({ message: 'Não foi possível atualizar a resposta'})
      }

      //console.log('5.1.3'); 

    }
  
  //console.log('5.2'); 

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

  //console.log('6'); 

  /* Retorna a próxima questão */
  return await Questions.query()
  .leftOuterJoin('question_resps', 'question.id', 'question_resps.question_id')
  .where(
    {
      questionnaire_version_id_carga: body.next.carga,
      question_edited_number: body.next.question_edited_number 
    }
  )
  .select(
    'question.id',
    'question.question_theme_id',
    'question.phase_id',
    'question.question_edited_number',
    'question.if_yes',
    'question.if_no',
    'question.if_back',
    'question.question_enunciation',
    'question.questionnaire_version_id_carga',
    'question.questionnaire_version_id',
    'question_resps.answer_yes_no',
    'question_resps.answer_comments',
    'question_resps.answer_observation' )
  .fetch();
}



}

module.exports = QuestionController

