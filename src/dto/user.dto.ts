export interface CreateUserDTO {
  username: string
  age: number
  hobbies: string[]
}

export interface UserDTO extends CreateUserDTO {
  id: string
}
