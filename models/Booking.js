import mongoose from 'mongoose';


const bookingSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type:String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerAddress: {
    type: String,
    required: true
},

    bookingDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



bookingSchema.methods.getFormattedDate = function() {
    return this.bookingDate.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default mongoose.model('Booking', bookingSchema);