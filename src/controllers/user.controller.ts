import { type RequestController } from '../types/request.types'
import userRepository from '../repositories/user.repository'
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto/user.dto'
import { getRequestBody } from '../utils/request.utils'
import { validateCreateUserDTO, validateUpdateUserDTO } from '../utils/user.utils'
import { sendErrorResponse, sendSuccessResponse } from '../utils/response.utils'
import { AppError } from '../types/error.types'
import { StatusCode } from '../types/status-code'

const getAllUsers: RequestController = async (_, res) => {
  try {
    const users = await userRepository.findAll()
    sendSuccessResponse(res, users)
  } catch (error) {
    sendErrorResponse(res, error.message, error.statusCode) // TODO:
  }
}

const getUser: RequestController<[string]> = async (_, res, userId) => {
  try {
    const user = await userRepository.findById(userId)

    if (!user) throw new AppError(StatusCode.NOT_FOUND, `User with id: ${userId} is not found`)

    sendSuccessResponse(res, user)
  } catch (error) {
    sendErrorResponse(res, error.message, error.statusCode) // TODO:
  }
}

const createUser: RequestController = async (req, res) => {
  try {
    const body = await getRequestBody<CreateUserDTO>(req)

    const { isValid, errors } = validateCreateUserDTO(body) // TODO: move error throwing into validation

    if (!isValid) throw new AppError(StatusCode.BAD_REQUEST, errors[0])

    const newUser = await userRepository.createUser(body)
    sendSuccessResponse(res, newUser)
  } catch (error) {
    sendErrorResponse(res, error.message, error.statusCode) // TODO:
  }
}

const updateUser: RequestController<[string]> = async (req, res, userId) => {
  try {
    const body = await getRequestBody<UpdateUserDTO>(req)

    const { isValid, errors } = validateUpdateUserDTO(body) // TODO: move error throwing into validation

    if (!isValid) throw new AppError(StatusCode.BAD_REQUEST, errors[0])

    const updatedUser = await userRepository.updateUser(userId, body)

    if (!updatedUser)
      throw new AppError(StatusCode.NOT_FOUND, `User with id: ${userId} is not found`)

    sendSuccessResponse(res, updatedUser)
  } catch (error) {
    sendErrorResponse(res, error.message, error.statusCode) // TODO:
  }
}

const deleteUser: RequestController<[string]> = async (_, res, userId) => {
  try {
    const isDeleted = await userRepository.deleteUser(userId)

    if (!isDeleted) throw new AppError(StatusCode.NOT_FOUND, `User with id: ${userId} is not found`)

    sendSuccessResponse(res, isDeleted, StatusCode.NO_CONTENT)
  } catch (error) {
    sendErrorResponse(res, error.message, error.statusCode) // TODO:
  }
}

export default { getAllUsers, getUser, createUser, updateUser, deleteUser }
