import { Router } from 'express'

// Middlewares
import authMiddleware from './app/middlewares/auth'
import { uploadSingle } from './app/middlewares/upload'

// Controllers
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import AvatarController from './app/controllers/AvatarController'

export const Public = new Router()
Public.get('/users', UserController.index)
Public.post('/users', UserController.store)
Public.post('/login', LoginController.store)

export const Private = new Router()
Private.use(authMiddleware)

Private.post('/avatar', uploadSingle('file'), AvatarController.store)
