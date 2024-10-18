import { IncomingMessage } from 'node:http'

export const getRequestBody = <T>(req: IncomingMessage): Promise<T> => {
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

export const getPathParams = <T = Record<string, string>>(
  path: string,
  pattern: string
): T | null => {
  const paramNames: string[] = []
  const regexPattern = pattern.replace(/:[^\/]+/g, (match) => {
    paramNames.push(match.slice(1))
    return `([^/]+)`
  })

  const regex = new RegExp(`^${regexPattern}$`)
  const matches = path.match(regex)

  if (!matches) return null

  const params = paramNames.reduce((acc, param, index) => {
    acc[param] = matches[index + 1]
    return acc
  }, {} as T)

  return params
}
