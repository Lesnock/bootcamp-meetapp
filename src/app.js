import express from 'express'
import { resolve } from 'path'
import { Public, Private } from './routes'

import './database'

class App {
    constructor () {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares () {
        this.server.use(express.json())
    }

    routes () {
        this.server.use(Public)
        this.server.use(Private)
    }
}

export default new App().server
