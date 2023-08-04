import type { Params } from '@feathersjs/feathers';
import type { ClientApplication } from '../../client';
import type { Chat, ChatData, ChatPatch, ChatQuery, ChatService } from './chats.class';
export type { Chat, ChatData, ChatPatch, ChatQuery };
export type ChatClientService = Pick<ChatService<Params<ChatQuery>>, (typeof chatMethods)[number]>;
export declare const chatPath = "chats";
export declare const chatMethods: readonly ["find", "get", "create", "patch", "remove"];
export declare const chatClient: (client: ClientApplication) => void;
declare module '../../client' {
    interface ServiceTypes {
        [chatPath]: ChatClientService;
    }
}
