import { Request, Response } from 'express';

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    /**
     * basic bir create işlemi
     */
    res.status(201).send({ message: 'Welcome! from create user endpoint' });
  }

  public static async getUserCredits(req: Request, res: Response): Promise<void> {
    /**
     * en kolayı user var mı yok mu kontrol ediyorsun
     *
     * varsa kredilerini listeleyip veriyorsun
     */
    res.status(200).send({ message: 'Welcome from get user credits endpoint' });
  }
}
