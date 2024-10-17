import { validate as isUuid } from 'uuid'

export const isValidUserId = (userId: string): boolean => {
  return isUuid(userId)
}

export const validateCreateUserDTO = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

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
