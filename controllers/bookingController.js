import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

export const showCreateForm = async (req, res) => {
    const service = await Service.findById(req.query.service).populate('createdBy', 'name phone');
    if (!service) return res.redirect('/services');
    
    res.render('bookings/create', {
        title: 'Book Service',
        service,
        user: req.user,
        userType: req.user.userType,
        userName: req.user.name
    });
};

export const createBooking = async (req, res) => {
    const { serviceId, customerName, customerPhone, customerAddress, bookingDate, timeSlot } = req.body;

    const service = await Service.findById(serviceId);
    
    const booking = new Booking({
    customer: req.user._id,
    service: serviceId,
    serviceProvider: service.createdBy,
    customerName,
    customerPhone,
    customerAddress, 
    bookingDate: new Date(bookingDate),
    timeSlot
});

    
    await booking.save();
    res.redirect('/bookings');
};

export const getBookings = async (req, res) => {
    let bookings = [];
    
    if (req.user.userType === 'customer') {
        bookings = await Booking.find({ customer: req.user._id })
            .populate('service', 'title')
            .populate('serviceProvider', 'name phone');
    } else {
        bookings = await Booking.find({ serviceProvider: req.user._id })
            .populate('service', 'title')
            .populate('customer', 'name');
    }
    
    res.render('bookings/index', {
        title: 'My Bookings',
        bookings,
        user: req.user,
        userType: req.user.userType,
        userName: req.user.name,
        success: req.query.success,
        accepted: req.query.accepted,
        rejected: req.query.rejected
    });
};

export const acceptBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking && booking.serviceProvider.toString() === req.user._id.toString()) {
        booking.status = 'confirmed';
        await booking.save();
    }
    res.redirect('/bookings');
};

export const rejectBooking = async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (booking && booking.serviceProvider.toString() === req.user._id.toString()) {
        booking.status = 'cancelled';
        await booking.save();
    }
    res.redirect('/bookings');
};
