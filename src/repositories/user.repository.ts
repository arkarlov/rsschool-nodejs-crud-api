import { v4 as uuidv4 } from 'uuid'
import { userDB } from '../db/user.db'
import { UpdateUserDTO, type CreateUserDTO } from '../dto/user.dto'
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
    ...data,
    id,
  }

  userDB.set(id, newUser)

  return newUser
}

const updateUser = async (id: string, data: UpdateUserDTO): Promise<UserModel | undefined> => {
  const user = userDB.get(id)

  if (!user) return

  const updatedUser: UserModel = { ...user, ...data, id }
  userDB.set(id, updatedUser)

  return updatedUser
}

export default { findAll, findById, createUser, updateUser }
