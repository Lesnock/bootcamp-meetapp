import express from 'express'
import { Public } from './routes'

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
    }
}

export default new App().server
