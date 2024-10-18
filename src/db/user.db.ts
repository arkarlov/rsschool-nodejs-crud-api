import { type UserModel } from '../models/user.model'

export const userDB: Map<string, UserModel> = new Map()

const initialUsers: UserModel[] = [
  {
    id: '83bba01d-53e2-4ce0-8e58-3027c3b80746',
    username: 'Alice',
    age: 25,
    hobbies: ['Reading', 'Swimming'],
  },
  {
    id: 'f0868b95-d492-4f8b-8ca0-89170d9a2323',
    username: 'Bob',
    age: 30,
    hobbies: ['Cooking', 'Cycling'],
  },
  {
    id: 'd163eca8-4a4a-40c6-bc8a-043764f0b5c9',
    username: 'Charlie',
    age: 22,
    hobbies: ['Gaming', 'Hiking'],
  },
  {
    id: 'b16e8b08-da18-4e6d-91f2-501b49e9fbae',
    username: 'Diana',
    age: 27,
    hobbies: ['Painting', 'Traveling'],
  },
  {
    id: '63f0c0cb-c3f5-48c3-860d-49024aaa11ac',
    username: 'Eve',
    age: 29,
    hobbies: ['Photography', 'Yoga'],
  },
]

if (process.env.NODE_ENV === 'development') {
  initialUsers.forEach((user) => userDB.set(user.id, user))
}
