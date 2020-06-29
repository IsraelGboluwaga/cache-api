import { Request, Response } from 'express'
import { success, failure } from '../../lib/response'
import * as CacheService from '../services/cacheService'
import { ICache } from '../models/Cache'

const getValueByKey = async (req: Request, res: Response) => {
  const { key } = req.params
  try {
    const value = CacheService.fetchValueByKey(key)
    return success({ res, data: value, httpCode: 201 })
  } catch (e) {
    return failure({ res, message: e, httpCode: 400 })
  }
}

const createPair = async (req: Request, res: Response) => {
  const { key, value } = req.body
  try {
    const params = { key, value } as ICache
    const response = CacheService.createPair(params)
    return success({ res, data: response, httpCode: 201 })
  } catch (e) {
    return failure({ res, message: e, httpCode: 500 })
  }
}

export { getValueByKey, createPair }
