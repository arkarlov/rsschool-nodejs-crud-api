import userRepository from '../repositories/user.repository'
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto'
import { AppError } from '../types/error.types'
import { ResponseCode } from '../types/response.types'

const getAllUsers = async () => {
  const users = await userRepository.findAll()
  return users
}

const getUser = async (userId: string) => {
  const user = await userRepository.findById(userId)

  if (!user) throw new AppError(ResponseCode.NOT_FOUND, `User with id: ${userId} is not found`)

  return user
}

const createUser = async (data: CreateUserDTO) => {
  const newUser = await userRepository.createUser(data)
  return newUser
}

const updateUser = async (userId: string, data: UpdateUserDTO) => {
  const updatedUser = await userRepository.updateUser(userId, data)

  if (!updatedUser)
    throw new AppError(ResponseCode.NOT_FOUND, `User with id: ${userId} is not found`)

  return updatedUser
}

const deleteUser = async (userId: string) => {
  const isDeleted = await userRepository.deleteUser(userId)

  if (!isDeleted) throw new AppError(ResponseCode.NOT_FOUND, `User with id: ${userId} is not found`)

  return isDeleted
}

export default { getAllUsers, getUser, createUser, updateUser, deleteUser }
