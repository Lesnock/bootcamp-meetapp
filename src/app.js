import express from 'express'
import { Public } from './routes'

class App {
    constructor () {
        this.server = express()

        this.middlewares()
        this.routes()
    }

    middlewares () {

    }

    routes () {
        this.server.use(Public)
    }
}

export default new App().server