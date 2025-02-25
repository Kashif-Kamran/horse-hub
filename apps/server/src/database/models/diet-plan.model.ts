import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';
import { toJSONSchemaConfig, toObjectSchemaConfig } from '../common';
import { IDietPlan } from '@repo/shared';

export type DietPlanDocument = HydratedDocument<IDietPlan>;

@Schema({
  virtuals: true,
  toObject: toObjectSchemaConfig,
  toJSON: toJSONSchemaConfig,
})
export class DietPlan implements IDietPlan {
  declare _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Animal', required: true })
  animal: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  duration: Date;

  @Prop({
    type: [
      {
        _id: { type: Types.ObjectId, auto: true },
        feed: { type: Types.ObjectId, ref: 'FeedInventory', required: true },
        quantity: { type: Number, required: true },
      },
    ],
  })
  recipes: {
    _id: Types.ObjectId;
    id: string;
    feed: string;
    quantity: number;
  }[];

  get id(): string {
    return this._id.toString();
  }
}

export const DietPlanSchema = SchemaFactory.createForClass(DietPlan);

DietPlanSchema.virtual('id').get(function () {
  return this._id.toString();
});

DietPlanSchema.virtual('recipes.id').get(function () {
  return this._id.toString();
});

export type DietPlanModel = Model<DietPlan>;
