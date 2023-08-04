import type { Params } from '@feathersjs/feathers';
import { MongoDBService } from '@feathersjs/mongodb';
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb';
import type { Application } from '../../declarations';
import type { Chat, ChatData, ChatPatch, ChatQuery } from './chats.schema';
export type { Chat, ChatData, ChatPatch, ChatQuery };
export interface ChatParams extends MongoDBAdapterParams<ChatQuery> {
}
export declare class ChatService<ServiceParams extends Params = ChatParams> extends MongoDBService<Chat, ChatData, ChatParams, ChatPatch> {
}
export declare const getOptions: (app: Application) => MongoDBAdapterOptions;
