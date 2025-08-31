import Service from '../models/Service.js';
import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import path from 'path'

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find(req.query)
            .populate('createdBy', 'name email userType')
            .sort({ createdAt: -1 });

        res.render('services/index', {
            title: 'All Services',
            services,
            user: req.user,
            userType: req.user.userType,
            userName: req.user.name
        });
    } catch (error) {
        console.error('Services list error:', error);
        res.redirect('/dashboard');
    }
};

export const showCreateForm = async (req, res) => {
    try {
        if (req.user.userType !== 'service_provider') {
            return res.redirect('/dashboard');
        }

        res.render('services/create', {
            title: 'Create Service',
            user: req.user,
            userType: req.user.userType,
            userName: req.user.name,
            error: null,
            formData: {}
        });
    } catch (error) {
        console.error('Create service form error:', error);
        res.redirect('/dashboard');
    }
};


export const createService = async (req, res) => {
  try {
    if (req.user.userType !== 'service_provider') {
      return res.redirect('/dashboard');
    }

    const {
      title,
      description,
      category,
      price,
      priceType,
      location,
      contactPhone,
      contactEmail,
      status,
    } = req.body;

    if (!title || !description || !category || !price || !priceType || !location) {
      return res.render('services/create', {
        title: 'Create Service',
        user: req.user,
        userType: req.user.userType,
        userName: req.user.name,
        error: 'Please fill in all required fields',
        formData: req.body,
      });
    }

    let photoUrl = null;

    if (req.file) {
        console.log(req.file.path);
        
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'services',
      });
      photoUrl = result.secure_url;

      const filePath = path.join(process.cwd(), req.file.path); 
      fs.unlink(filePath, (err) => {
        if (err) console.error('Failed to delete local file:', err);
    });

    }

    const phoneRegex = /^[0-9]{10}$/;
    if (contactPhone && !phoneRegex.test(contactPhone)) {
      return res.status(400).render('services/create', {
        title: 'Create Service',
        user: req.user,
        userType: req.user.userType,
        userName: req.user.name,
        error: 'Enter a valid 10-digit phone number.',
        formData: req.body,
      });
    }

    const serviceData = {
      title,
      description,
      category,
      price,
      priceType,
      location,
      createdBy: req.user._id,
      providerName: req.user.name,
      contactPhone: contactPhone || req.user.phone,
      contactEmail: contactEmail || req.user.email,
      status: status || 'available',
      photo: photoUrl, 
    };


    const service = new Service(serviceData);
    await service.save();
    

    res.redirect('/services');
  } catch (error) {
    console.error('Create service error:', error);
    res.render('services/create', {
      title: 'Create Service',
      user: req.user,
      userType: req.user.userType,
      userName: req.user.name,
      error: 'An error occurred while creating the service',
      formData: req.body,
    });
  }
};



export const getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate('createdBy', 'name email userType');

        if (!service) {
            return res.redirect('/services');
        }

        res.render('services/view', {
            title: service.title,
            service,
            user: req.user,
            userType: req.user.userType,
            userName: req.user.name
        });
    } catch (error) {
        console.error('View service error:', error);
        res.redirect('/services');
    }
};

export const showEditForm = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.redirect('/services');
        }

        if (service.createdBy.toString() !== req.user._id.toString()) {
            return res.redirect('/services');
        }

        res.render('services/edit', {
            title: 'Edit Service',
            service,
            user: req.user,
            userType: req.user.userType,
            userName: req.user.name,
            error: null
        });
    } catch (error) {
        console.error('Edit service form error:', error);
        res.redirect('/services');
    }
};

export const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.redirect('/services');
        }

        if (service.createdBy.toString() !== req.user._id.toString()) {
            return res.redirect('/services');
        }

        const {
            title,
            description,
            category,
            price,
            priceType,
            location,
            contactPhone,
            contactEmail,
            status
        } = req.body;

        if (!title || !description || !category || !price || !location) {
            return res.render('services/edit', {
                title: 'Edit Service',
                service,
                user: req.user,
                userType: req.user.userType,
                userName: req.user.name,
                error: 'Please fill in all required fields'
            });
        }

        service.title = title;
        service.description = description;
        service.category = category;
        service.price = parseFloat(price);
        service.priceType = priceType || 'fixed';
        service.location = location;
        service.contactPhone = contactPhone || req.user.phone;
        service.contactEmail = contactEmail || req.user.email;
        service.status = status || 'available';

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'services',
            });
            // Delete previous image from Cloudinary if exists
            if (service.photo && service.photo.includes('cloudinary')) {
                const publicId = service.photo.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
            
            service.photo = result.secure_url;
            
            // Delete local file
            const filePath = path.join(process.cwd(), req.file.path);
            fs.unlink(filePath, (err) => {
                if (err) console.error('Failed to delete local file:', err);
            });
        }

        await service.save();
        res.redirect(`/services/${service._id}`);
    } catch (error) {
        console.error('Update service error:', error);
        const service = await Service.findById(req.params.id);
        res.render('services/edit', {
            title: 'Edit Service',
            service,
            user: req.user,
            userType: req.user.userType,
            userName: req.user.name,
            error: 'An error occurred while updating the service'
        });
    }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.redirect('/services');
        }

        if (service.createdBy.toString() !== req.user._id.toString()) {
            return res.redirect('/services');
        }

        await Service.findByIdAndDelete(req.params.id);
        res.redirect('/services');
    } catch (error) {
        console.error('Delete service error:', error);
        res.redirect('/services');
    }
};
