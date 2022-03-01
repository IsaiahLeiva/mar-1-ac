import { Schema } from "mongoose";



export const HouseSchema = new Schema(
    {
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        style: { type: String, required: true },
        price: { type: Number, required: true },
        imgUrl: { type: String, default: 'https://placehold.id/200x200' },
        description: { type: String },
        //NOTE: I don't know what the following lines do
        creatorId: { type: Schema.Types.ObjectId, ref: 'Account' }
    },
    { timestamps: true, toJSON: { virtuals: true } }

)