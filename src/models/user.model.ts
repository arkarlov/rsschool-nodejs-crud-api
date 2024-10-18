export interface UserModel {
  id: string
  username: string
  age: number
  hobbies: string[]
}

export type EditableUserModelKeys = Exclude<keyof UserModel, 'id'>
