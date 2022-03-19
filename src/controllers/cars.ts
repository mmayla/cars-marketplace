import { Request, Response } from 'express'

export const getCars = (req: Request, res: Response): void => {
  console.log(req.headers)
  res.json({
    test: 'Hello my first cars',
  })
}
