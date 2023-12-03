import { Request, Response } from 'express';

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    res.status(201).send({ message: 'Welcome! from create user endpoint' });
  }
}
