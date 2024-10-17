import { IncomingMessage } from 'node:http'

export const getPostData = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    let data = ''

    req.on('error', (error) => {
      reject(error)
    })

    req.on('data', (chunk) => {
      data += chunk.toString()
    })

    req.on('end', () => {
      try {
        const parsedData = JSON.parse(data)
        resolve(parsedData)
      } catch (error) {
        reject(error)
      }
    })
  })
}
