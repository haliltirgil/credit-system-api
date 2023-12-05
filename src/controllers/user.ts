import { Request, Response } from 'express';
import { User } from '../models/user';
import { NotFoundError } from '../errors/not-found-error';

/**
 * Controller class for managing user-related operations.
 *
 * @remarks
 * This class includes methods for creating a user, retrieving user credits, and getting all users.
 */
export class UserController {
  /**
   * Creates a new user with the provided first name and last name.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   */
  public static async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName } = req.body;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    res.status(201).send({ message: 'User created successfully!', result: user });
  }

  /**
   * Retrieves the credits associated with a user.
   *
   * @param req - Express Request object.
   * @param res - Express Response object.
   *
   * @throws {NotFoundError} if the user is not found.
   */
  public static async getUserCredits(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const user = await User.findOne({
      where: { id: Number(userId) },
      relations: { credits: true },
    });

    if (!user) {
      throw new NotFoundError('Error', 'User not found!');
    }

    res.status(200).send({ result: user.credits });
  }

  /**
   * Retrieves all users.
   *
   * @param _req - Express Request object.
   * @param res - Express Response object.
   *
   */
  public static async getUsers(_req: Request, res: Response): Promise<void> {
    const users = await User.find();

    res.status(200).send(users);
  }
}
