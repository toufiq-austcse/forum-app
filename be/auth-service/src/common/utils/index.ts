import { Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export function stringToMongooseObjectId(objectId: string) {
  return new Types.ObjectId(objectId);
}

export function getHashedPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, 5);
}

export function checkPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}