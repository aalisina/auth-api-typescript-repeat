import { Response, Request } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  VerifyUserInput,
} from "../schemas/user.schema";
import {
  createUserService,
  findUserByEmail,
  findUserByIdService,
} from "../services/user.service";
import log from "../utils/logger";
import sendEmail from "../utils/mailer";
import { v4 as uuidv4 } from "uuid";

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

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const { email } = req.body;
  const msg =
    "If a user with the email exists, a password reset link will be emailed";

  const user = await findUserByEmail(email);
  if (!user) {
    log.debug(`User with email ${email} does not exist.`);
    return res.send(msg);
  }
  if (!user.verified) {
    return res.send("User is not verified.");
  }

  const passwordResetCode = uuidv4();

  user.passwordResetCode = passwordResetCode;
  await user.save();

  await sendEmail({
    to: user.email,
    from: "test@test.test",
    subject: "Reset your password.",
    text: `User id: ${user._id} . Password reset code: ${passwordResetCode}`,
  });
  log.debug(`Password reset email sent to ${email}`);
  return res.send(msg);
}
