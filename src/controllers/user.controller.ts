import { Response, Request } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUserService } from "../services/user.service";
import sendEmail from "../utils/mailer";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUserService(body);

    return res.send("User successfully created.");
    await sendEmail();
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).send("Account already exists.");
    }
    return res.status(500).send(err);
  }
}
