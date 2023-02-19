import { Media } from '@prisma/client'
import { prisma } from '../services/prismaClient'
import { Request, Response } from 'express'
import { ApiError } from '../helpers/api-error'
import { checkIdUserExist } from '../utils/checkIdUserExist'

enum Status {
  watching = 'watching/reading',
  planToWatch = 'plan to watch/read',
  completed = 'completed',
  drop = 'drop'
}

interface categMedia extends Media {
  categ: Array<String>
  status: Status
}

export class MediaControllers {
  async create(req: Request, res: Response) {
    const id_users = req.user.id

    checkIdUserExist

    const { name, cover, desc, categ, status, rate, release }: categMedia =
      req.body

    if (
      status !== Status.completed &&
      status !== Status.drop &&
      status !== Status.planToWatch &&
      status !== Status.watching
    ) {
      throw new ApiError('selecione', 401)
    }

    if (!name) {
      throw new ApiError('name is missing', 401)
    }

    const sameName = await prisma.media.findFirst({
      where: {
        name: String(name)
      }
    })

    if (sameName) {
      throw new ApiError('this name already used', 401)
    }

    const id_media = await prisma.media.create({
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

    const categInsert = await Promise.all(
      categ.map(async (name: String) => {
        const result = await prisma.category.create({
          data: {
            id_media: Number(id_media.id),
            name: String(name),
            id_users: Number(id_users)
          }
        })
        return result
      })
    )

    res.json({ id_media, categInsert })
  }
  async delete(req: Request, res: Response) {
    const user_id = req.user.id
    const { media_id } = req.params
    const pathMedia = {
      where: {
        id: Number(media_id)
      }
    }

    const mediaUserID = await prisma.media.findFirst({
      where: {
        id: Number(media_id),
        id_users: Number(user_id)
      }
    })

    if (!mediaUserID) {
      throw new ApiError('User unauthorized', 401)
    }

    if (!media_id) {
      throw new ApiError('ID not found', 404)
    }
    const media = await prisma.media.findFirst(pathMedia)
    if (!media) {
      throw new ApiError('media not found', 404)
    }
    await prisma.media.delete(pathMedia)

    res.json('successful delete')
  }
}
