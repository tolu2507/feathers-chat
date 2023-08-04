// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Chat, ChatData, ChatPatch, ChatQuery } from './chats.schema'

export type { Chat, ChatData, ChatPatch, ChatQuery }

export interface ChatParams extends MongoDBAdapterParams<ChatQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ChatService<ServiceParams extends Params = ChatParams> extends MongoDBService<
  Chat,
  ChatData,
  ChatParams,
  ChatPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('chats'))
  }
}
