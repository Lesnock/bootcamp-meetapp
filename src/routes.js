import { Router } from 'express'

// Middlewares

// Controllers
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'

export const Public = new Router()
Public.get('/users', UserController.index)
Public.post('/users', UserController.store)
Public.post('/login', LoginController.store)
