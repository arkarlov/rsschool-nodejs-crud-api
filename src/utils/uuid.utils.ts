import { validate as isUuid } from 'uuid'

export const isValidUuid = (uuid: string): boolean => {
  return isUuid(uuid)
}
