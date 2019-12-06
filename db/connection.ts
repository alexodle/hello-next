import {createConnection, Connection, Repository, ObjectType, EntitySchema, getConnection as typeOrmGetConnection} from "typeorm";
import * as models from "./entities";

async function create(): Promise<Connection> {
  try {
    const entities = Object.values(models)
    return await createConnection({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities,
      synchronize: true,
    })
  } catch (e) {
    console.error('DB CREATE ERROR', e.stack)
    throw e
  }
}

export async function getConnection(): Promise<Connection> {
  try {
    return typeOrmGetConnection()
  } catch {
    return await create()
  }
}

export async function getRepository<Entity>(target: ObjectType<Entity> | EntitySchema<Entity> | string): Promise<Repository<Entity>> {
  return (await getConnection()).getRepository(target)
}
