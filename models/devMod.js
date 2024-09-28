//models/devMod.js
import mongoose from "mongoose";
const devSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    image_background: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const devS = mongoose.models.devS || mongoose.model("devS", devSchema);

export default devS;