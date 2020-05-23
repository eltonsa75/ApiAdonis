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


// Rota tras todos os cliente (Customer)
Route.get('/customers', 'CustomerController.index')
// Rota traz os clientes da empresa master passando o ID
Route.get('/customersearch/:id', 'CustomerController.show')
// Rota que cadastra os clientes (Customer)
Route.post('/registercustomer', 'CustomerController.store')
// Rota que atualiza os dados dos Clientes
Route.put('/updatecustomer/:id', 'CustomerController.update')
// Rota que deleta os dados dos Clientes
Route.delete('/deletecustomer/:id', 'CustomerController.destroy')