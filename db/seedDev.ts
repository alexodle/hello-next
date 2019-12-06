import { getRepository } from './connection';
import { User } from './entities/User'
import { Request } from './entities/Request'
import { Neighborhood } from './entities/Neighborhood';
import { PriceRange } from './entities/PriceRange';
import { Contact } from './entities/Contact';

async function getUser(username: string): Promise<User> {
  const repo = await getRepository(User)
  let user = await repo.findOne({username})
  if (!user) {
    user = new User()
    user.username = username
    user.display_name = username;
    user.password_hash = 'abcdefg'
    user = await repo.save(user)
  }
  return user
}

async function getPriceRange(name: string): Promise<PriceRange> {
  const repo = await getRepository(PriceRange)
  let pr = await repo.findOne({name})
  if (!pr) {
    pr = new PriceRange()
    pr.name = name
    pr = await repo.save(pr)
  }
  return pr
}

async function getNeighb(name: string): Promise<Neighborhood> {
  const repo = await getRepository(Neighborhood)
  let neighb = await repo.findOne({name})
  if (!neighb) {
    neighb = new Neighborhood()
    neighb.name = name
    neighb = await repo.save(neighb)
  }
  return neighb
}

function createContact(phone: string): Contact {
  const c = new Contact()
  c.phone_number = phone
  return c
}

async function createRequest(username: string, neighb: string, priceRange: string): Promise<Request> {
  const repo = await getRepository(Request)

  const request = new Request()
  request.owner = await getUser(username)
  request.n_people = 2
  request.start_window = new Date()
  request.end_window = new Date()
  request.end_window.setHours(request.end_window.getHours() + 4);
  request.notes = "extra meat please"
  
  request.neighborhood = await getNeighb(neighb)
  request.price_range = await getPriceRange(priceRange)
  request.contacts = [createContact('+12066602445'), createContact('+12069102789')]

  return await repo.save(request)
}

export async function seed() {
  await createRequest('alexodle', 'Ballard', '$')
  await createRequest('karaodle', 'Fremont', '$$')
  await createRequest('rooneyodle', 'Ballard', '$$$')
}
