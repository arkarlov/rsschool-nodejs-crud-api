import { IncomingMessage, ServerResponse } from 'node:http'

export type RequestController<T extends any[] = []> = (
  req: IncomingMessage,
  res: ServerResponse,
  ...args: T
) => Promise<void>
