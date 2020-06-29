import express from 'express'
import { constants } from './constants'

const { SUCCESSFUL } = constants


interface IData {
  data?: [] | string
  error: boolean
  message: string
  errStack?: any
}

function respond(res: express.Response, httpCode: number, data: IData) {
  const response = {
    code: httpCode,
    data: data.data,
    error: data.error,
    message: data.message,
  }
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Method', '*')
  return res.status(httpCode).send(response)
}

export const success = (res: express.Response, data: any, httpCode = 200) => {
  const dataToSend: IData = {
    data,
    error: false,
    message: SUCCESSFUL,
  }
  respond(res, httpCode, dataToSend)
}

export const failure = (res: express.Response, message: string, errStack: any, httpCode = 503) => {
  const dataToSend: IData = {
    error: true,
    message,
    errStack,
  }
  respond(res, httpCode, dataToSend)
}
