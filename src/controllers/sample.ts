import { Request, Response } from 'express';

export class SampleController {
  public static async getSamples(req: Request, res: Response): Promise<void> {
    res.status(200).send({ message: 'Welcome!' });
  }
}
