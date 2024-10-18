import userRepository from '../repositories/user.repository'
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto'
import { validateCreateUserDTO, validateUpdateUserDTO } from '../utils/user.utils'
import { AppError } from '../types/error.types'
import { StatusCode } from '../types/status-code'

const getAllUsers = async () => {
  const users = await userRepository.findAll()
  return users
}

const getUser = async (userId: string) => {
  const user = await userRepository.findById(userId)

  if (!user) throw new AppError(StatusCode.NOT_FOUND, `User with id: ${userId} not found`)

  return user
}

const createUser = async (data: CreateUserDTO) => {
  const { isValid, errors } = validateCreateUserDTO(data) // TODO: move error throwing into validation?

  if (!isValid) throw new AppError(StatusCode.BAD_REQUEST, errors[0])

  const newUser = await userRepository.createUser(data)
  return newUser
}

const updateUser = async (userId: string, data: UpdateUserDTO) => {
  const { isValid, errors } = validateUpdateUserDTO(data) // TODO: move error throwing into validation?

  if (!isValid) throw new AppError(StatusCode.BAD_REQUEST, errors[0])

  const updatedUser = await userRepository.updateUser(userId, data)

  if (!updatedUser) throw new AppError(StatusCode.NOT_FOUND, `User with id: ${userId} not found`)

  return updatedUser
}

const deleteUser = async (userId: string) => {
  const isDeleted = await userRepository.deleteUser(userId)

  if (!isDeleted) throw new AppError(StatusCode.NOT_FOUND, `User with id: ${userId} not found`)

  return isDeleted
}

export default { getAllUsers, getUser, createUser, updateUser, deleteUser }
