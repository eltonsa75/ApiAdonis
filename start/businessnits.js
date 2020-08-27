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


// Rota tras todas as Unidade de Negócio (business_units)
Route.get('/businessunits', 'BusinessUnitController.index')
// Rota traser Unidade de Negócio passando ID (business_units)
Route.get('/businessunitssearch/:id', 'BusinessUnitController.show')
// Rota que cadastra a Unidade de Negócio (business_units)
Route.post('/registerbusinessunits', 'BusinessUnitController.store')
// Rota que atualiza os dados da Unidade de Negócio
Route.put('/updatebusinessunits/:id', 'BusinessUnitController.update')
// Rota que deleta os dados da Unidade de Negócio
Route.delete('/deletebusinessunits/:id', 'BusinessUnitController.destroy')