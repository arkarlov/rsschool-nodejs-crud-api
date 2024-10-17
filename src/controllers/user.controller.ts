import { STATUS_CODES } from 'node:http'
import { type RequestController } from '../types/request.types'
import { ApiResponse } from '../types/response.types'
import userRepository from '../repositories/user.repository'
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../dto/user.dto'
import { getRequestBody } from '../utils/request.utils'
import { validateCreateUserDTO, validateUpdateUserDTO } from '../utils/user.utils'

const getAllUsers: RequestController = async (req, res) => {
  try {
    const users = await userRepository.findAll()
    const response: ApiResponse<UserDTO[]> = { data: users }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(response))
  } catch (error) {
    console.error(error)
  }
}

const getUser: RequestController<[string]> = async (req, res, userId) => {
  try {
    const user = await userRepository.findById(userId)

    if (!user) {
      const response: ApiResponse<null> = { data: null, error: STATUS_CODES[404] }

      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
      return
    }

    const response: ApiResponse<UserDTO> = { data: user }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(response))
  } catch (error) {
    console.error(error)
  }
}

const createUser: RequestController = async (req, res) => {
  const body = await getRequestBody<CreateUserDTO>(req)

  const { isValid, errors } = validateCreateUserDTO(body)

  if (!isValid) {
    // throw new Error('Validation error')
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ data: null, errors }))
    return
  }

  const newUser = await userRepository.createUser(body)
  const response: ApiResponse<UserDTO> = { data: newUser }

  res.writeHead(201, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response))
}

const updateUser: RequestController<[string]> = async (req, res, userId) => {
  const body = await getRequestBody<UpdateUserDTO>(req)
  const { isValid, errors } = validateUpdateUserDTO(body)

  if (!isValid) {
    // throw new Error('Validation error')
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ data: null, errors }))
    return
  }

  const updatedUser = await userRepository.updateUser(userId, body)

  if (!updatedUser) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ data: null, error: 'Not Found' }))
    return
  }

  const response: ApiResponse<UserDTO> = { data: updatedUser }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(response))
}

const deleteUser: RequestController<[string]> = async (req, res, userId) => {
  const isDeleted = await userRepository.deleteUser(userId)

  if (!isDeleted) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ data: null, error: 'Not Found' }))
    return
  }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ data: true }))

  return
}

export default { getAllUsers, getUser, createUser, updateUser, deleteUser }
