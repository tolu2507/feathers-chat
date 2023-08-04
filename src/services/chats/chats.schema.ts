// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { userSchema } from '../users/users.schema'

// Main data model schema
export const chatSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String(),
    createdAt: Type.Number(),
    userId: Type.String({ objectid: true }),
    user: Type.Ref(userSchema)
  },
  { $id: 'Chat', additionalProperties: false }
)
export type Chat = Static<typeof chatSchema>
export const chatValidator = getValidator(chatSchema, dataValidator)
export const chatResolver = resolve<Chat, HookContext>({
  user: virtual(async (chat, context) => {
    return context.app.service('users').get(chat.userId)
  })
})

export const chatExternalResolver = resolve<Chat, HookContext>({})

// Schema for creating new entries
export const chatDataSchema = Type.Pick(chatSchema, ['text'], {
  $id: 'ChatData'
})
export type ChatData = Static<typeof chatDataSchema>
export const chatDataValidator = getValidator(chatDataSchema, dataValidator)
export const chatDataResolver = resolve<Chat, HookContext>({
  userId: async (_value, _message, context) => {
    // Associate the record with the id of the authenticated user
    return context.params.user._id
  },
  createdAt: async () => {
    return Date.now()
  }
})

// Schema for updating existing entries
export const chatPatchSchema = Type.Partial(chatSchema, {
  $id: 'ChatPatch'
})
export type ChatPatch = Static<typeof chatPatchSchema>
export const chatPatchValidator = getValidator(chatPatchSchema, dataValidator)
export const chatPatchResolver = resolve<Chat, HookContext>({})

// Schema for allowed query properties
export const chatQueryProperties = Type.Pick(chatSchema, ['_id', 'text', 'createdAt', 'userId'])
export const chatQuerySchema = Type.Intersect(
  [
    querySyntax(chatQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ChatQuery = Static<typeof chatQuerySchema>
export const chatQueryValidator = getValidator(chatQuerySchema, queryValidator)
export const chatQueryResolver = resolve<ChatQuery, HookContext>({
  userId: async (value, user, context) => {
    // We want to be able to find all messages but
    // only let a user modify their own messages otherwise
    if (context.params.user && context.method !== 'find') {
      return context.params.user._id
    }

    return value
  }
})
