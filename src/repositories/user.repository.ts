import { userDB } from '../db/user.db'
import { type UserModel } from '../models/user.model'

const findAll = async (): Promise<UserModel[]> => {
  return Array.from(userDB.values())
}

const findById = async (id: string): Promise<UserModel | undefined> => {
  return userDB.get(id)
}

export default { findAll, findById }
