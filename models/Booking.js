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
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
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


bookingSchema.methods.getStatusDisplay = function() {
    const statusMap = {
        'pending': 'Pending',
        'confirmed': 'Confirmed',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusMap[this.status];
};

bookingSchema.methods.getStatusColor = function() {
    const colorMap = {
        'pending': 'warning',
        'confirmed': 'success',
        'completed': 'primary',
        'cancelled': 'danger'
    };
    return colorMap[this.status];
};

export default mongoose.model('Booking', bookingSchema);