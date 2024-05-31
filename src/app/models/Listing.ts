import { Model, Schema, model, models } from "mongoose";

interface Listing {
    _id?: string;
    title: string;
    description: string;
    bundle_products: Record<string, string>;
    company: string;
    company_logo: string;
    price: number;
    stripe_product_id?: string;
    bundle_product_price: number;
    features: string[];
    about: string;
    tags: string[];
    stack: string[];
    category: string;
    sub_category?: string;
  }

const listingSchema = new Schema<Listing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bundle_products: { type: Map, of: String },
    company: { type: String, required: true },
    company_logo: { type: String, required: true },
    price: { type: Number, required: true },
    stripe_product_id: { type: String, default: "" },
    bundle_product_price: { type: Number, required: true },
    features: { type: [String], required: true },
    about: { type: String, required: true },
    tags: { type: [String], required: true },
    stack: { type: [String], required: true },
    category: { type: String, required: true },
    sub_category: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "listings",
  }
);

export const Listing: Model<Listing> = models.Listing || model<Listing>("Listing", listingSchema);

