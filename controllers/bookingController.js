import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

export const showCreateForm = async (req, res) => {
    const service = await Service.findById(req.query.service).populate('createdBy', 'name phone');
    if (!service) return res.redirect('/services');
    
    res.render('bookings/create', {
        title: 'Book Service',
        service,
        user: req.user,
    });
};


export const createBooking = async (req, res) => {
    try {
        const {
            serviceId,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            bookingDate,
            timeSlot,
            requirements
        } = req.body;

        const service = await Service.findById(serviceId).populate('createdBy', 'name phone');
        if (!service) {
            return res.redirect('/services');
        }

        const duplicate = await Booking.findOne({
            customer: req.user._id,
            service: serviceId,
            bookingDate: new Date(bookingDate),
            timeSlot
        });

        if (duplicate) {
            return res.status(400).render('bookings/create', {
                title: 'Book Service',
                service,
                user: req.user,
                error: 'You have already booked this service for this date and time.'
            });
        }

        const allReadyBooked = await Booking.findOne({
            service: serviceId,
            bookingDate: new Date(bookingDate),
            timeSlot
        });
        if(allReadyBooked){
            return res.status(400).render('bookings/create', {
                title: 'Book Service',
                service,
                user: req.user,
                error: 'This Service is already booked for this date and time.'
            });
        }

        if (new Date(bookingDate).getTime() < Date.now()) {
            return res.status(400).render('bookings/create', {
                title: 'Book Service',
                service,
                user: req.user,
                error: 'Enter future date.'
            });
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(customerPhone)) {
            return res.status(400).render('bookings/create', {
                title: 'Book Service',
                service,
                user: req.user,
                error: 'Enter a valid 10-digit phone number.'
            });
        }

        const booking = new Booking({
            customer: req.user._id,
            service: serviceId,
            serviceProvider: service.createdBy,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            bookingDate: new Date(bookingDate),
            timeSlot,
            requirements
        });

        await booking.save();
        res.redirect('/bookings');
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).render('bookings/create', {
            title: 'Book Service',
            service: await Service.findById(req.body.serviceId).populate('createdBy', 'name phone'),
            user: req.user,
            error: 'Something went wrong. Please try again.'
        });
    }
};

export const getBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.userType === 'customer') {
      bookings = await Booking.find({ customer: req.user._id }).populate('service serviceProvider');
    } else {
      bookings = await Booking.find({ serviceProvider: req.user._id }).populate('service customer');
    }

    res.render('bookings/index', {
      title: 'My Bookings',
      bookings,
      user: req.user
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
