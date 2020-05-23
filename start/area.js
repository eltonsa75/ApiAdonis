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

// Rota tras todas as Areas (areas)
Route.get('/area', 'AreaController.index')
// Rota traser Unidade de Negócio passando ID (business_units)
Route.get('/areasearch/:id', 'AreaController.show')
// Rota que cadastra a Unidade de Negócio (business_units)
Route.post('/registerarea', 'AreaController.store')
// Rota que atualiza os dados da Unidade de Negócio
Route.put('/updatearea/:id', 'AreaController.update')
// Rota que deleta os dados da Unidade de Negócio
Route.delete('/deletearea/:id', 'AreaController.destroy')


