import { type UserModel } from '../models/user.model'

export type UserDTO = UserModel

export type CreateUserDTO = Pick<UserModel, 'username' | 'age' | 'hobbies'>
