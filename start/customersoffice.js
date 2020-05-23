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


// Rota tras todas as Filiais (CustomerOffice)
Route.get('/customersoffice', 'CustomerOfficeController.index')
// Rota traser filial passando ID (CustomerOffice)
Route.get('/customersofficesearch/:id', 'CustomerOfficeController.show')
// Rota que cadastra as filiais (CustomerOffice)
Route.post('/registercustomeroffice', 'CustomerOfficeController.store')
// Rota que atualiza os dados das Filiais
Route.put('/updatecustomeroffice/:id', 'CustomerOfficeController.update')
// Rota que deleta os dados das Filiais
Route.delete('/deletecustomeroffice/:id', 'CustomerOfficeController.destroy')