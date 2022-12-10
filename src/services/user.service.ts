import UserModel, { User } from "../models/user.model";

export async function createUserService(input: Partial<User>) {
  return UserModel.create(input);
}
