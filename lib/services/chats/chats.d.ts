import type { Application } from '../../declarations';
import { ChatService } from './chats.class';
import { chatPath } from './chats.shared';
export * from './chats.class';
export * from './chats.schema';
export declare const chat: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [chatPath]: ChatService;
    }
}
