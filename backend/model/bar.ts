import { Schema, model, Model, Document, Types } from "mongoose";

interface IBar extends Document {
  name: string;
  address: string;
  location: { latitude: number; longitude: number };
  capacity: number;
  noise: string;
  crowd: string;
  specials: [Object];
  reviews: Types.Array<Types.ObjectId> | IReviewBar[];
  photos: string[];
}

interface IReviewBar extends Document {
  user: Types.ObjectId | IUser;
  bar: Types.ObjectId | IBar;
  rating: number;
  comment: string;
}

interface IUser extends Document {
  // user schema interface
}

const barSchema: Schema = new Schema({
  name: { type: String, unique: true }, 
  address: { type: String, unique: true },
  location: { latitude: { type: Number }, longitude: { type: Number }},
  capacity: { type: Number, unique: true },
  noise: { type: String },
  crowd: { type: String },
  specials: { type: [Object], default: [] },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewBar' }],
  photos: { type: [String], default: [] },
});

const reviewBarSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  bar: { type: Schema.Types.ObjectId, ref: 'Bar' },
  rating: { type: Number },
  comment: { type: String },
});

export const Bar: Model<IBar> = model<IBar>('Bar', barSchema);
export const ReviewBar: Model<IReviewBar> = model<IReviewBar>('ReviewBar', reviewBarSchema);

