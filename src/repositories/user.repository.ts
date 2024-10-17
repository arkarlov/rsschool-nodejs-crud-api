import { v4 as uuidv4 } from 'uuid'
import { userDB } from '../db/user.db'
import { type CreateUserDTO } from '../dto/user.dto'
import { type UserModel } from '../models/user.model'

const findAll = async (): Promise<UserModel[]> => {
  return Array.from(userDB.values())
}

const findById = async (id: string): Promise<UserModel | undefined> => {
  return userDB.get(id)
}

const createUser = async (data: CreateUserDTO): Promise<UserModel> => {
  const id = uuidv4()
  const newUser = {
    id,
    ...data,
  }

  userDB.set(id, newUser)

  return newUser
}

export default { findAll, findById, createUser }
