import {Schema, Document, model, Model} from 'mongoose'
import { config } from '../../config/settings'

interface ICache extends Document {
  key: string
  value: string
  ttl: number
  createdAt?: Date
  updatedAt?: Date
}
interface ICacheModel extends Model<ICache> {}

const cacheSchema = new Schema(
  {
    key: { type: String, unique: true },
    value: String,
    ttl: { type: Number, default: config.ttl },
  },
  { timestamps: true, capped: { size: 5000, max: 5000 } }
)

const Cache = model<ICache, ICacheModel>('Cache', cacheSchema)

export { Cache, ICache }
