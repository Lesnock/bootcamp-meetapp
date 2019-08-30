import { Router } from 'express'

export const Public = new Router()
Public.get('/users', (req, res) => {
    res.json({ok:true})
})