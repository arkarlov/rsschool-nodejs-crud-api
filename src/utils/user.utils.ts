import { validate as isUuid } from 'uuid'
import { getPathParams } from './request.utils'
import { ApiRoutes } from '../types/route.types'
import { AppError } from '../types/error.types'
import { ResponseCode } from '../types/response.types'

export const getUserId = (url: string) => {
  const params = getPathParams(url, `${ApiRoutes.USERS}/:userId`)

  if (!params) {
    throw new AppError(ResponseCode.BAD_REQUEST, `Invalid url: ${JSON.stringify(url)}`)
  }

  if (!isUuid(params.userId)) {
    throw new AppError(
      ResponseCode.BAD_REQUEST,
      `Invalid user id: ${JSON.stringify(params.userId)}`
    )
  }

  return params.userId
}

export const validateCreateUserDTO = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (typeof data !== 'object' || data === null) {
    errors.push('Invalid data.')
  }

  if (typeof data.username !== 'string') {
    errors.push('Invalid or missing "username". It must be a string.')
  }

  if (typeof data.age !== 'number' || isNaN(data.age)) {
    errors.push('Invalid or missing "age". It must be a number.')
  }

  if (
    !Array.isArray(data.hobbies) ||
    !data.hobbies.every((hobby: any) => typeof hobby === 'string')
  ) {
    errors.push('Invalid or missing "hobbies". It must be an array of strings.')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateUpdateUserDTO = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (typeof data !== 'object' || data === null) {
    errors.push('Invalid data.')
  }

  if (!data.username && !data.age && !data.hobbies) {
    errors.push('Invalid data.')
  }

  if (data.username && typeof data.username !== 'string') {
    errors.push('Invalid or missing "username". It must be a string.')
  }

  if (data.age && (typeof data.age !== 'number' || isNaN(data.age))) {
    errors.push('Invalid or missing "age". It must be a number.')
  }

  if (
    data.hobbies &&
    (!Array.isArray(data.hobbies) || !data.hobbies.every((hobby: any) => typeof hobby === 'string'))
  ) {
    errors.push('Invalid or missing "hobbies". It must be an array of strings.')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
