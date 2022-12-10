import { getModelForClass, prop } from "@typegoose/typegoose";
import { v4 as uuidv4 } from "uuid";

export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => uuidv4() })
  verificationCode: string;

  @prop()
  passwordResetCode: string;

  @prop({ default: false })
  verified: boolean;
}

const UserModel = getModelForClass(User);

export default UserModel;
