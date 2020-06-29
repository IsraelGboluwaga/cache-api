import express from 'express'
import { constants } from './constants'

const { SUCCESSFUL } = constants

interface IData {
  data?: [] | string
  error: boolean
  message: string
  errStack?: any
}

interface IRespond {
  res: express.Response
  data: IData
  httpCode: number
}

function respond({ res, httpCode, data }: IRespond) {
  const response = {
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

interface ISuccess {
  res: express.Response
  data: any
  httpCode: number
  message?: string
}

export const success = ({ res, data, message, httpCode }: ISuccess) => {
  const dataToSend: IData = {
    data,
    error: false,
    message: SUCCESSFUL,
  }
  respond({ res, httpCode, data: dataToSend })
}

interface IFail {
  res: express.Response
  message: string
  errStack?: any
  httpCode: number
}
export const failure = ({ res, message, errStack, httpCode }: IFail) => {
  const dataToSend: IData = {
    error: true,
    message,
    errStack,
  }
  respond({ res, httpCode, data: dataToSend })
}
