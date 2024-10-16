import { IncomingMessage, ServerResponse } from 'node:http'

export type RequestController = (req: IncomingMessage, res: ServerResponse) => Promise<void>
