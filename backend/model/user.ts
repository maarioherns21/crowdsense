import { Schema, model, Model, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  favorites: Array<string>;
  reviews: Array<string>;
}

interface IReviewUser extends Document {
  user: string;
  restaurant: string;
  rating: number;
  comment: string;
  address: string;
  image: string;
}

const userSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  address: { number: { type: String }, street: { type: String }, zip: { type: String }, state: { type: String }, city: { type: String }, country: { type: String }, },
  image: { type: String} ,
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewUser' }]
});

const reviewUSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  rating: { type: Number },
  comment: { type: String },
});

const User: Model<IUser> = model<IUser>('User', userSchema);
const ReviewUser: Model<IReviewUser> = model<IReviewUser>('ReviewUser', reviewUSchema);

export { User, ReviewUser };


