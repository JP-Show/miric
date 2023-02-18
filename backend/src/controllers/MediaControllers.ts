import { Anime } from '@prisma/client'
import { prisma } from '../services/prismaClient'
import { Request, Response } from 'express'
import { ApiError } from '../helpers/api-error'

export type categMedia = {
  categ: string[]
  status: 'watching/reading' | 'plan to watch/read' | 'completed' | 'drop'
}

export class MediaControllers {
  async create(req: Request, res: Response) {
    const {
      name,
      cover,
      desc,
      categ,
      rate,
      status,
      release
    }: Anime & categMedia = req.body

    const id_users = req.user.id

    if (!name) {
      throw new ApiError('name is missing', 401)
    }

    const sameName = await prisma.anime.findFirst({
      where: {
        name: String(name)
      }
    })

    if (sameName) {
      throw new ApiError('this name already used', 401)
    }

    const id_media = await prisma.anime.create({
      data: {
        name,
        cover,
        desc,
        rate: Number(rate),
        release: new Date(release),
        id_users: Number(id_users),
        status
      }
    })

    const categInsert: Object = categ.map(name => {
      const obj = {
        id_media: id_media.id,
        name: String(name),
        id_users: Number(id_users)
      }
      prisma.category.create({
        data: obj
      })
      return obj
    })

    res.json({ id_media, categInsert })
  }
}
