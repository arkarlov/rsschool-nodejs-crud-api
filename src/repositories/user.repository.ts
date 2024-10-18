import { v4 as uuidv4 } from 'uuid'
import { userDB } from '../db/user.db'
import { UpdateUserDTO, type CreateUserDTO } from '../dto/user.dto'
import { type EditableUserModelKeys, type UserModel } from '../models/user.model'
import { pickObjectKeys } from '../utils/common.utils'

const findAll = async (): Promise<UserModel[]> => {
  return Array.from(userDB.values())
}

const findById = async (id: string): Promise<UserModel | undefined> => {
  return userDB.get(id)
}

const createUser = async (data: CreateUserDTO): Promise<UserModel> => {
  const id = uuidv4()
  const storeData = pickObjectKeys<UserModel, EditableUserModelKeys>(data, [
    'username',
    'age',
    'hobbies',
  ])

  const newUser: UserModel = { id, ...storeData }

  userDB.set(id, newUser)

  return newUser
}

const updateUser = async (id: string, data: UpdateUserDTO): Promise<UserModel | undefined> => {
  const user = userDB.get(id)

  if (!user) return

  const storeData = pickObjectKeys<Partial<UserModel>, EditableUserModelKeys>(data, [
    'username',
    'age',
    'hobbies',
  ])

  const updatedUser: UserModel = { ...user, ...storeData }

  userDB.set(id, updatedUser)

  return updatedUser
}

const deleteUser = async (id: string): Promise<boolean> => {
  const isDeleted = userDB.delete(id)

  return isDeleted
}

export default { findAll, findById, createUser, updateUser, deleteUser }
