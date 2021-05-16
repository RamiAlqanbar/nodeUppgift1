//const express = require('express') old 
import express from 'express'
import helmet from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'


dotenv.config()
const { PORT } = process.env
const application = express()
application.use(helmet())
application.use(morgan('common'))

const IsPay = (request, response, next) => {
	console.log('Paid')
	next()
}


application.get('/order', IsPay, (request, response) =>{
	response.send('ORDER OK: ' + Math.random())
})
const notFound = (request, response, next) =>{
	const error = new Error(`Not Found: ${request.originalUrl}`)
	response.status(404)
	next(error)
}

application.use(notFound)

application.listen(PORT, () => {
	console.log(`✔️ SERVER IS RUNNING ON PORT : ${PORT}`)
})

