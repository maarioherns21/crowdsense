import { Schema, model, Document, Types } from 'mongoose';

interface IRestaurant extends Document {
  name: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  cuisine: string;
  priceRange: string;
  rating: number;
  reviews: Types.ObjectId[];
  fileImage: string[];
}

interface IReviewRestaurant extends Document {
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  rating: number;
  comment: string;
}

const restaurantSchema = new Schema<IRestaurant>({
  name: { type: String},
  address: { type: String, unique: true },
  location: { 
    latitude: { type: Number },
    longitude: { type: Number }
  },
  cuisine: { type: String },
  priceRange: { type: String },
  rating: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'ReviewRestaurants' }],
  fileImage : { type: [String] , default: []  },
});

const reviewRestaurantSchema = new Schema<IReviewRestaurant>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  rating: { type: Number },
  comment: { type: String },
});

const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);
const ReviewRestaurant = model<IReviewRestaurant>('ReviewRestaurants', reviewRestaurantSchema);

export { Restaurant, ReviewRestaurant };
