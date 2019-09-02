import { resolve } from 'path'
import express, { Router } from 'express'

// Middlewares
import authMiddleware from './app/middlewares/auth'
import { uploadSingle } from './app/middlewares/upload'

// Controllers
import UserController from './app/controllers/UserController'
import LoginController from './app/controllers/LoginController'
import AvatarController from './app/controllers/AvatarController'
import MeetupController from './app/controllers/MeetupController'
import OrganizingController from './app/controllers/OrganizingController'
import SubscriptionController from './app/controllers/SubscriptionController'

export const Public = new Router()
Public.get('/users', UserController.index)
Public.post('/users', UserController.store)
Public.post('/login', LoginController.store)
Public.use('/avatars', express.static(resolve(__dirname, '..', 'images', 'avatars')))

export const Private = new Router()
Private.use(authMiddleware)
Private.post('/avatars', uploadSingle('file'), AvatarController.store)

Private.get('/meetups', MeetupController.index)
Private.post('/meetups', MeetupController.store)
Private.put('/meetups/:id', MeetupController.update)
Private.delete('/meetups/:id', MeetupController.delete)

Private.get('/organizing', OrganizingController.index)

Private.get('/subscriptions', SubscriptionController.index)
Private.post('/subscribe/:meetupId', SubscriptionController.store)
