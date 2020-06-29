import { Request, Response } from 'express'
import { success, failure } from '../../lib/response'
import * as CacheService from '../services/cacheService'
import { ICache } from '../models/Cache'
import { logger } from '../../config/winston'

const getValueByKey = async (req: Request, res: Response) => {
  const { key } = req.params
  try {
    const value = await CacheService.fetchValueByKey(key)
    return success({ res, data: value, httpCode: 201 })
  } catch (e) {
    return failure({ res, message: e, httpCode: 400 })
  }
}

const createPair = async (req: Request, res: Response) => {
  const { key, value } = req.body
  try {
    const params = { key, value } as ICache
    const response = await CacheService.createPair(params)
    return success({ res, data: response, httpCode: 201 })
  } catch (e) {
    return failure({ res, message: e, httpCode: 500 })
  }
}

const getAllKeys = async (req: Request, res: Response) => {
  try {
    const keys = await CacheService.fetchAllKeys()
    return success({ res, data: keys, httpCode: 200 })
  } catch (e) {
    return failure({ res, message: 'Failed', errStack: e, httpCode: e.status || 500 })
  }
}

const updateEntry = async (req: Request, res: Response) => {
  const { key, value } = req.body
  try {
    await CacheService.updateEntry({ key, value })
    return success({ res, data: 'Updated', httpCode: 200 })
  } catch (e) {
    return failure({ res, message: 'Failed', errStack: e, httpCode: e.status || 500 })
  }
}

const deleteEntry = async (req: Request, res: Response) => {
  const { key } = req.params
  try {
    await CacheService.deleteEntry(key)
    return success({ res, data: 'Deleted', httpCode: 200 })
  } catch (e) {
    return failure({ res, message: 'Failed', errStack: e, httpCode: e.status || 500 })
  }
}

const deleteAll = async (req: Request, res: Response) => {
  try {
    await CacheService.deleteAll()
    return success({ res, data: 'Deleted', httpCode: 200 })
  } catch (e) {
    return failure({ res, message: 'Failed', errStack: e, httpCode: e.status || 500 })
  }
}

export { getValueByKey, createPair, getAllKeys, updateEntry, deleteEntry, deleteAll }
