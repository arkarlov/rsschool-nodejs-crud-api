import { type RequestController } from '../types/request.types'
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto'
import { getRequestBody } from '../utils/request.utils'
import { sendErrorResponse, sendSuccessResponse } from '../utils/response.utils'
import { StatusCode } from '../types/status-code'
import userService from '../services/user.service'

const getAllUsers: RequestController = async (_, res) => {
  try {
    const users = await userService.getAllUsers()
    sendSuccessResponse(res, StatusCode.OK, users)
  } catch (error) {
    sendErrorResponse(res, error.statusCode, error.message) // TODO:
  }
}

const getUser: RequestController<[string]> = async (_, res, userId) => {
  try {
    const user = await userService.getUser(userId)
    sendSuccessResponse(res, StatusCode.OK, user)
  } catch (error) {
    sendErrorResponse(res, error.statusCode, error.message) // TODO:
  }
}

const createUser: RequestController = async (req, res) => {
  try {
    const body = await getRequestBody<CreateUserDTO>(req)
    const newUser = await userService.createUser(body)
    sendSuccessResponse(res, StatusCode.OK, newUser)
  } catch (error) {
    sendErrorResponse(res, error.statusCode, error.message) // TODO:
  }
}

const updateUser: RequestController<[string]> = async (req, res, userId) => {
  try {
    const body = await getRequestBody<UpdateUserDTO>(req)
    const updatedUser = await userService.updateUser(userId, body)
    sendSuccessResponse(res, StatusCode.OK, updatedUser)
  } catch (error) {
    sendErrorResponse(res, error.statusCode, error.message) // TODO:
  }
}

const deleteUser: RequestController<[string]> = async (_, res, userId) => {
  try {
    await userService.deleteUser(userId)
    sendSuccessResponse(res, StatusCode.OK)
  } catch (error) {
    sendErrorResponse(res, error.statusCode, error.message) // TODO:
  }
}

export default { getAllUsers, getUser, createUser, updateUser, deleteUser }
