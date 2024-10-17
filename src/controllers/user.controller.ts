import { STATUS_CODES } from 'node:http'
import { type RequestController } from '../types/request.types'
import { ApiResponse } from '../types/response.types'
import userRepository from '../repositories/user.repository'
import { isValidUuid } from '../utils/uuid.utils'
import { UserDTO } from '../dto/user.dto'

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

const getUser: RequestController = async (req, res) => {
  try {
    const userId = req.url.split('/').pop()

    if (!isValidUuid(userId)) {
      const response: ApiResponse<null> = { data: null, error: STATUS_CODES[400] }

      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(response))
      return
    }

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

export default { getAllUsers, getUser }
