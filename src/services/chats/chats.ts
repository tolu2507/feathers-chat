// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  chatDataValidator,
  chatPatchValidator,
  chatQueryValidator,
  chatResolver,
  chatExternalResolver,
  chatDataResolver,
  chatPatchResolver,
  chatQueryResolver
} from './chats.schema'

import type { Application } from '../../declarations'
import { ChatService, getOptions } from './chats.class'
import { chatPath, chatMethods } from './chats.shared'
import { logRuntime } from '../../hooks/log-runtime';

export * from './chats.class'
export * from './chats.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const chat = (app: Application) => {
  // Register our service on the Feathers application
  app.use(chatPath, new ChatService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: chatMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(chatPath).hooks({
    around: {
      all: [
        logRuntime,
        authenticate('jwt'),
        schemaHooks.resolveExternal(chatExternalResolver),
        schemaHooks.resolveResult(chatResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(chatQueryValidator), schemaHooks.resolveQuery(chatQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(chatDataValidator), schemaHooks.resolveData(chatDataResolver)],
      patch: [schemaHooks.validateData(chatPatchValidator), schemaHooks.resolveData(chatPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [chatPath]: ChatService
  }
}
