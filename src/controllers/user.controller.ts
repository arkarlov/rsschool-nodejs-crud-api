import { STATUS_CODES } from 'node:http'
import { type RequestController } from '../types/request.types'
import { ApiResponse } from '../types/response.types'
import userRepository from '../repositories/user.repository'
import { CreateUserDTO, UserDTO } from '../dto/user.dto'
import { getPostData } from '../utils/request.utils'
import { validateCreateUserDTO } from '../utils/user.utils'

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
  const body = await getPostData<CreateUserDTO>(req)

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

export default { getAllUsers, getUser, createUser }
