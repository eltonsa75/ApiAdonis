'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

Route.group(() => {
    Route.post('login', 'UserController.login')
    Route.post('register', 'UserController.register')
    Route.get('getuser/:id', 'UserController.show')
}).prefix('users')


Route.get('/questions', 'QuestionController.index')
Route.post('/question/:id', 'QuestionController.store')
Route.get('/resposta', 'QuestionRespController.index')
Route.post('/resposta', 'QuestionRespController.create')
Route.post('/resposta/:id', 'QuestionRespController.update')
Route.get('/consulta', 'QuestionController.consulta')
Route.get('/primeiraQuestao', 'QuestionController.primeiraQuestao')
Route.get(
    '/proxima/carga/:carga/question_edited_number/:question_edited_number', 
    'QuestionController.proxima'
    )
Route.post(
    '/save_and_next', 
    'QuestionController.save_and_next'
    )


require('./application_configs')

require('./area')

require('./mastercompanies')

require('./customers')

require('./customersoffice')

require('./businessnits')

require('./questionnaireForm')

require('./interviewee')




