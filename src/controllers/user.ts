import { Request, Response } from 'express';
import { User } from '../models/user';
import { NotFoundError } from '../errors/not-found-error';

export class UserController {
  public static async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName } = req.body;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    res.status(201).send({ message: 'User created successfully!', result: user });
  }

  public static async getUserCredits(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const user = await User.findOneBy({
      id: +userId,
    });

    if (!user) {
      throw new NotFoundError('Error', 'User not found!');
    }

    res.status(200).send({ result: user.credits });
  }

  public static async getUsers(_req: Request, res: Response): Promise<void> {
    const users = await User.find();

    res.status(200).send(users);
  }
}
