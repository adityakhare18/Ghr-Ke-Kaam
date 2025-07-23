import Service from '../models/Service.js';

export const showDashboard = async (req, res) => {
    try {
        const services = await Service.find()
            .populate('createdBy', 'name email userType')
            .sort({ createdAt: -1 })
            .limit(10);

        let userServices = [];
        if (req.user.userType === 'service_provider') {
            userServices = await Service.find({ createdBy: req.user._id })
                .sort({ createdAt: -1 });
        }

        res.render('dashboard/index', {
            title: 'Dashboard',
            user: req.user,
            services,
            userServices,
        });
    } catch (error) {
        console.error('Dashboard error:', error);
        res.redirect('/auth/login');
    }
};

export const showProfile = async (req, res) => {
    try {
        res.render('dashboard/profile', {
            title: 'Profile',
            user: req.user,
        });
    } catch (error) {
        console.error('Profile error:', error);
        res.redirect('/dashboard');
    }
};
