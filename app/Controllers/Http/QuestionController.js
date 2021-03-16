'use strict'

const Questions = use("App/Models/Question")
const Resposta = use("App/Models/QuestionResp")
const QuestionResp = use("App/Models/QuestionResp")
const QuestionRespSeq = use("App/Models/QuestionRespSeq")
const UserParameter = use ("App/Models/UserParameter")
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
    //#APIALTERADA#

   const user_id = 25

   // Leitura dos parâmetros do usuário logado para obter primeira questão
   let user_param
   user_param = await UserParameter.query()
    .select(
    'user_parameters.application_config_id',
    'user_parameters.questionnaire_version_id'
    )
    .where('user_parameters.id', '=', user_id)
    .fetch()

    return await Questions.query()
    .innerJoin('application_configs', 'application_configs.question_to_present', 'question.id' )
    .innerJoin('questionnaire_versions', 'questionnaire_versions.id', 'question.questionnaire_version_id' )
    .innerJoin('user_parameters', 'user_parameters.application_config_id', 'application_configs.id' )
    .innerJoin('question_theme', 'question_theme.id', 'question.question_theme_id' )    
    .leftOuterJoin('question_resps', 'question_resps.question_id', 'question.id' )
    .where('user_parameters.id', user_id)
    .andWhere('questionnaire_versions.id', user_param.rows[0].questionnaire_version_id)
    .andWhere('application_configs.id', user_param.rows[0].application_config_id)
    .select(
      'question.id',
      'application_configs.id as application_config_id',
      'user_parameters.id as user_parameter_id',
      'question.question_theme_id',
      'question_theme.question_theme',
      'questionnaire_versions.last_question_number',
      'application_configs.responses_qtd',
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
      'question_resps.answer_observation',
      'application_configs.current_session_start_time',
      'application_configs.current_session_end_time',
      'application_configs.current_session_elapsed_time',
      'application_configs.interview_total_elapsed_time'
      )
    .orderBy('question_edited_number')
    .limit(1)
    .fetch();
  }


  async proxima ({request, auth, response}) {    

    /*
    //Obtém o Id do usuário
    //const usuarioLogado = await auth.getUser()
    //const user_id = usuarioLogado.id;
    //#APIALTERADA#
    */
    const user_id = 25
  
    // Leitura dos parâmetros do usuário logado para obter primeira questão
    let user_param
    user_param = await UserParameter.query()
    .select(
    'user_parameters.application_config_id',
    'user_parameters.questionnaire_version_id'
     )
    .where('user_parameters.id', '=', user_id)
    .fetch()
  
    return await UserParameter.query()
    .innerJoin('application_configs', 'application_configs.id', 'user_parameters.application_config_id' )
    .innerJoin('questionnaire_versions', 'questionnaire_versions.id', 'user_parameters.questionnaire_version_id' )
    .innerJoin('question', 'question.questionnaire_version_id', 'user_parameters.questionnaire_version_id' )
    .innerJoin('question_theme', 'question_theme.id', 'question.question_theme_id' )    
    .leftOuterJoin('question_resps', 'question_resps.question_id', 'question.id' )
    .where('user_parameters.id', user_id)
    .andWhere('questionnaire_versions.id', user_param.rows[0].questionnaire_version_id)
    .andWhere('application_configs.id', user_param.rows[0].application_config_id)
    .andWhere(
      { 
        question_edited_number: request.params.question_edited_number
      }
    )
    .select(
      'question.id',
      'application_configs.id as application_config_id',
      'user_parameters.id as user_parameter_id',
      'question.question_theme_id',
      'question_theme.question_theme',
      'questionnaire_versions.last_question_number',
      'application_configs.responses_qtd',
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
      'question_resps.answer_observation',
      'application_configs.current_session_start_time',
      'application_configs.current_session_end_time',
      'application_configs.current_session_elapsed_time',
      'application_configs.interview_total_elapsed_time'
      )
    .orderBy('question_edited_number')
    .limit(1)
    .fetch();
  }

// Atualizando o Método save_and_next
 /*************** */
  /* Save_And_Next */
  /*************** */

  async save_and_next ({request, auth, response}) {
    
    const body = JSON.parse(request.body.json);
    console.log(body);
    const now = new Date();
    const user_id = 25 //Id fixo enquanto não houver como obter usuário logado
    
    /* Verifica se a questão já foi respondida para esta aplicação */
    var question_resp_id = 0;
    try {
          /* Obtém o id da resposta se existir, senão inicia com 0 */    
          const query_resp = await Database.select('id')
              .from('question_resps')
              .where(function () {
                this
                .where('application_config_id', body.answer.application_config_id)
                .andWhere('question_id', body.answer.question_id)
              })

          try {
             question_resp_id = query_resp[ 0 ].id
          }  catch(error) {
             question_resp_id = 0
          }
        } catch(error) {
          question_resp_id = 0
        }
    
    if(question_resp_id == 0) {

      /*** Insert na resposta do formulário ***/
      const answer = new QuestionResp();
      answer.fill({
        application_config_id: body.answer.application_config_id,
        question_id: body.answer.question_id,
        phase_id: body.answer.phase_id,
        interviewer_id: body.answer.interviewer_id, //Não é o User_Id
        respondent_id: body.answer.respondent_id,
        answer_yes_no: body.answer.answer_yes_no,
        answer_comments: body.answer.answer_comments,
        answer_observation: body.answer.answer_observation
      })
      try {
        await answer.save();
      } catch(error) {
        return response
        .status(400)
        .send({ message: 'Não foi possível incluir a resposta'})
      }

    } else {

      /*** Update na resposta do formulário, primeiro exclui as respostas filhas ***/
      /*
      try {
            await Database.raw(('exec proc_delete_question_resps :p_user_id, :p_question_edited_number'),[
              ':p_user_id', user_id,
              ':p_question_edited_number', body.next.question_edited_number
            ]);
      */
      try {
        await Database.raw("CALL `proc_delete_question_resps`("+user_id+", '"+body.next.question_edited_number+"%')");
          } catch(error) {
            return response
            .status(400)
            .send({ message: 'Não foi possível excluir as respostas = '+body.answer.application_config_id})
      }

      /*

      SELECT 
      `question_resps`.`id` AS question_resp_id
      from `question` 
      inner join `questionnaire_versions` on `questionnaire_versions`.`id` = `question`.`questionnaire_version_id` 
      inner join `application_configs` on `application_configs`.`questionnaire_version_id` = `questionnaire_versions`.`id` 
      inner join `user_parameters` on `user_parameters`.`application_config_id` = `application_configs`.`id` 
      left outer join `question_resps` on `question_resps`.`question_id` = `question`.`id` 
      where 
      `user_parameters`.`id` = 25 AND 
      `question`.`question_edited_number` LIKE '04%' AND 
      `questionnaire_versions`.`id` = `user_parameters`.`questionnaire_version_id` AND 
      `application_configs`.`id` = `user_parameters`.`application_config_id` AND
      `question_resps`.`answer_yes_no` IS NOT NULL

      */

      /*** Update na resposta do formulário, primeiro exclui as respostas filhas ***/
      //CALL `proc_delete_question_resps`(user_id, body.next.question_edited_number);
      
      /*** Update na resposta do formulário ***/
      const answer = await Resposta.findOrFail(question_resp_id);
      answer.merge({
        phase_id: body.answer.phase_id,
        interviewer_id: body.answer.interviewer_id,  //Não é o User_Id              
        respondent_id: body.answer.respondent_id,
        answer_yes_no: body.answer.answer_yes_no,
        answer_comments: body.answer.answer_comments,
        answer_observation: body.answer.answer_observation
      })              
      try {
          await answer.save();
        } catch(error) {
          return response
          .status(400)
          .send({ message: 'Não foi possível atualizar a resposta de Id = '+question_resp_id})
        }

      /*** Exclusão das respostas que ficaram soltas (filhas)                             ***/
      /*** Se resposta atual for Não, verificar conteudo do campo "question_mother_if_no" ***
       *** Se o campo for preenchido com a questão mãe, as filhas devem ser excluídas     ***/
      /*** Exemplo: Se question_mother_if_no = "01", devem ser excluidas as respostas das ***/
      /***          questões 01.1, 01.2, 01.2.1, etc - utilizar na pesquisa "01.%"        ***/
    }

    /* Obtem o número de respostas para esta aplicação do questionário */ 
    var qtd_respostas = 0
    try {
      /* Obtém a quantidade de respostas para questões-mãe esta aplicação */
      const count_resps = await Database
      .from('question_resps')
      .innerJoin('question', 'question_resps.question_id', 'question.id' )
      .innerJoin('application_configs', 'question_resps.application_config_id', 'application_configs.id' )
      .where(function () {
        this
        .where('question_resps.application_config_id', body.answer.application_config_id)
        .andWhere('question.question_mother', 'Y')
        .andWhere(function() {
          this.where('question_resps.answer_yes_no', '<>', 3)
        })
      })
      .count()
      try {
        qtd_respostas = count_resps[0]['count(*)']  // returns number
      }  catch(error) {
        qtd_respostas = 0
      }
    } catch(error) {
      qtd_respostas = 0
    }    

    //console.log('qtd_respostas: '+qtd_respostas) 

    /* Atualizações na tabela application_configs:
       Status: 1 = Entrevista Em Andamento
       response_qtd: O número de respostas para esta aplicação
       question_to_present: A próxima questão a ser apresentada
       current_session_end_time: Tempo da última resposta
    */
   try {
      const affectedRows = await Database  
      .table('application_configs')
      .where('id', body.answer.application_config_id)
      .update({ 
      status: 1,
      responses_qtd: qtd_respostas,
      question_to_present: body.answer.question_id,
      current_session_end_time: `${now.getHours()}:${now.getMinutes()}`
      })
    } catch(error) {
      return response
      .status(400)
      .send({ message: 'Não foi possível atualizar a aplicação de id = '+body.answer.application_config_id})
    }
 
    /**********************************************************/
    //*          Cálculo do tempo total de entrevista         */
    /**********************************************************/   
    try {
      await Database 
          .raw('UPDATE application_configs SET current_session_elapsed_time = timediff(current_session_end_time, current_session_start_time), interview_total_elapsed_time = ADDTIME(interview_previous_elapsed_time, timediff(current_session_end_time, current_session_start_time)) WHERE id = ?', [body.answer.application_config_id])
        } catch(error) {
          return response
          .status(400)
          .send({ message: 'Não foi possível calcular o tempo decorrido da aplicação do questionário de id = '+body.answer.application_config_id})
    }
 
      /**********************************************************/
      /* Atualiza o registro do Log com o tempo final da sessão */
      /**********************************************************/

    var log_id = 0;
    try {
      /* Obtém o id da sessão mais recente para esta aplicação, 
      se existir, senão inicia com 0 */    
      const query_log = await Database.select('id')
          .from('quest_application_logs')
          .where(function () {
            this
            .where('application_config_id', body.answer.application_config_id)
            .orderBy ('id','desc')
          })

      try {
        log_id = query_log[ 0 ].id
      }  catch(error) {
          log_id = 0
      }
    } catch(error) {
      log_id = 0
    }
    
    try {
      await Database
      .raw("UPDATE quest_application_logs SET session_end_time = '"+`${now.getHours()}:${now.getMinutes()}`+"' WHERE id = ?", [log_id])
        } catch(error) {
        return response
        .status(400)
        .send({ message: 'Não foi possível atualizar o session_end_time da sessão de id = '+log_id})
        }    
  
    try {
        await Database
        .raw('UPDATE quest_application_logs SET session_elapsed_time = timediff(session_end_time, session_start_time) WHERE id = ?', [log_id])
          } catch(error) {
          return response
          .status(400)
          .send({ message: 'Não foi possível calcular o tempo decorrido da sessão de id = '+log_id})
          }
    
  
    /* Retorna a próxima questão, incluindo o cálculo da percentagem referente a barra de progresso */
    return await Questions.query()
    .innerJoin('questionnaire_versions', 'question.questionnaire_version_id', 'questionnaire_versions.id')
    .innerJoin('application_configs', 'application_configs.questionnaire_version_id', 'questionnaire_versions.id')
    .innerJoin('user_parameters', 'user_parameters.application_config_id', 'application_configs.id' )
    .innerJoin('question_theme', 'question.question_theme_id', 'question_theme.id')
    .leftOuterJoin('question_resps', 'question.id', 'question_resps.question_id')
    .where({
        questionnaire_version_id_carga: body.next.carga,
        question_edited_number: body.next.question_edited_number 
      })
    .andWhere(function() {
        this.where('application_configs.id', '=', body.answer.application_config_id)
      })
    .andWhere(function() {
        this.where('user_parameters.id', '=', user_id)
      })      
    .select(
      'question.id',
      'application_configs.id as application_config_id',
      'user_parameters.id as user_parameter_id',
      'question.question_theme_id',
      'question_theme.question_theme',
      'questionnaire_versions.last_question_number',
      'application_configs.responses_qtd',
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
      'question_resps.answer_observation',
      'application_configs.current_session_start_time',
      'application_configs.current_session_end_time',
      'application_configs.current_session_elapsed_time',
      'application_configs.interview_total_elapsed_time',
      'application_configs.status'
    )
    .orderBy('question_edited_number')
    .limit(1)
    .fetch();    
  }


}

module.exports = QuestionController

