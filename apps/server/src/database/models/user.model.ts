import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { IUser, RoleType } from '@repo/shared';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';

export type UserDocument = HydratedDocument<User>;

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
})
export class User implements IUser {
  declare _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [String], enum: RoleType, default: [RoleType.Admin] })
  roles: RoleType[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: null })
  verificationOtp?: Number | null;

  get id(): string {
    return this._id.toString();
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id').get(function () {
  return this._id.toString();
});

export type UserModel = Model<User>;
