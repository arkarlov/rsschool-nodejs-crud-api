import { type RequestController } from '../types/request.types'
import { CreateUserDTO, UpdateUserDTO } from '../dto/user.dto'
import { getRequestBody } from '../utils/request.utils'
import { sendSuccessResponse } from '../utils/response.utils'
import { ResponseCode } from '../types/response.types'
import userService from '../services/user.service'
import { handleErrorResponse } from '../utils/response.utils'
import { AppError } from '../types/error.types'
import { validateCreateUserDTO, validateUpdateUserDTO } from '../utils/user.utils'

const getAllUsers: RequestController = async (_, res) => {
  try {
    const users = await userService.getAllUsers()
    sendSuccessResponse(res, ResponseCode.OK, users)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const getUser: RequestController<[string]> = async (_, res, userId) => {
  try {
    const user = await userService.getUser(userId)
    sendSuccessResponse(res, ResponseCode.OK, user)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const createUser: RequestController = async (req, res) => {
  try {
    const body = await getRequestBody<CreateUserDTO>(req)

    const { isValid, errors } = validateCreateUserDTO(body)
    if (!isValid) throw new AppError(ResponseCode.BAD_REQUEST, errors[0])

    const newUser = await userService.createUser(body)
    sendSuccessResponse(res, ResponseCode.OK, newUser)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const updateUser: RequestController<[string]> = async (req, res, userId) => {
  try {
    const body = await getRequestBody<UpdateUserDTO>(req)

    const { isValid, errors } = validateUpdateUserDTO(body)
    if (!isValid) throw new AppError(ResponseCode.BAD_REQUEST, errors[0])

    const updatedUser = await userService.updateUser(userId, body)
    sendSuccessResponse(res, ResponseCode.OK, updatedUser)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

const deleteUser: RequestController<[string]> = async (_, res, userId) => {
  try {
    await userService.deleteUser(userId)
    sendSuccessResponse(res, ResponseCode.NO_CONTENT)
  } catch (error) {
    handleErrorResponse(res, error)
  }
}

export default { getAllUsers, getUser, createUser, updateUser, deleteUser }
