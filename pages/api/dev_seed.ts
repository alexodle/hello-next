import { NextApiRequest, NextApiResponse } from "next";
import { seed } from "../../db/seedDev"

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV !== "production") {
    try {
      await seed()
      res.status(200).send({done: true})
    } catch (e) {
      console.error(e)
      res.status(500).send({error: e.message})
    }
  } else {
    res.status(404).send(null)
  }
}
