import mongoose from 'mongoose';


const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    priceType: {
        type: String,
        required: true,
        enum: ['fixed', 'hourly', 'negotiable'],
        default: 'fixed'
    },
    location: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    providerName: String,
    contactPhone: String,
    contactEmail: String,
    photo: String,
    status: {
        type: String,
        enum: ['available', 'busy', 'unavailable'],
        default: 'available'
    }
}, {
    timestamps: true
});

serviceSchema.methods.getPriceDisplay = function() {
    if (this.priceType === 'negotiable') return 'Negotiable';
    const priceText = this.priceType === 'hourly' ? '/hour' : '';
    return `₹${this.price}${priceText}`;
};

export default mongoose.model('Service', serviceSchema);
