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


// Rota tras a Empresa Master (MasterCompany)
Route.get('/mastercompanies', 'MasterCompanyController.index')
Route.get('/mastercompaniessearch/:id', 'MasterCompanyController.show')
