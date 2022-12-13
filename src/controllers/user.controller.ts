import { Response, Request } from "express";
import { CreateUserInput, VerifyUserInput } from "../schemas/user.schema";
import {
  createUserService,
  findUserByIdService,
} from "../services/user.service";
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

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const { id, verificationCode } = req.params;

  // find user by id
  const user = await findUserByIdService(id);
  if (!user) {
    return res.send("Could not verify user.");
  }
  // check if user is already verified
  if (user.verified) {
    return res.send("User is already verified.");
  }

  // check if verification code is correct
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();
    return res.send("User successfully verified.");
  }
  // if verification code is wrong
  return res.send("Could not verify user.");
}
