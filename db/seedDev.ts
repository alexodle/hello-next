import { getRepository } from './connection';
import { User } from './entities/User'
import { Request } from './entities/Request'

function createUser(username: string): User {
  const user = new User()
  user.username = username
  user.display_name = username;
  user.password_hash = 'abcdefg'
  return user
}

async function createRequest(username: string): Promise<Request> {
  const userRepo = await getRepository(User)
  const user = await userRepo.findOne({where: { username }})
  if (!user) throw new Error("user not found: " + username)
  const request = new Request()
  request.owner = user
  request.n_people = 2
  request.fulfilled = false
  request.location = "100 S King St, Seattle, WA, 98199"
  request.start_window = new Date()
  request.end_window = new Date()
  request.notes = "hey these are some notes for you"
  return request
}

export async function seed() {
  const userRepo = await getRepository(User)
  try {
    await userRepo.save(createUser('alexodle'))
    await userRepo.save(createUser('karaodle'))
    await userRepo.save(createUser('rooneyodle'))
    await userRepo.save(createUser('birdieodle'))
  } catch {}

  const requestRepo = await getRepository(Request)
  try {
    await requestRepo.save(await createRequest('alexodle'))
    await requestRepo.save(await createRequest('alexodle'))
    await requestRepo.save(await createRequest('karaodle'))
  } catch {}

}
