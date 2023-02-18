// import { prisma } from '../services/prismaClient'

// export async function test() {
//   const email = await prisma.users.findMany({
//     where: {
//       email: ' andre@gmail.com '.trim()
//     }
//   })
//   console.log(email)
// }

import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const password: string =
  'asdadaldhajkhdgasdasjhdgakjdhsagdkasjhdboeuwqyfgopqwiefubn0p189y4918n19287ghe019782ge01278'

export async function test() {
  const token = sign({ foo: 'bar' }, 'secret')
  return console.log(token)
}
