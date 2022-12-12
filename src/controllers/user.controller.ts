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

    await sendEmail({
      from: "test@test.test",
      to: user.email,
      subject: "Please verify your account",
      text: `Verification code: ${user.verificationCode}  Id: ${user._id}`,
    });
    return res.send("User successfully created.");
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).send("Account already exists.");
    }
    return res.status(500).send(err);
  }
}
