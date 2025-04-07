import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  fullName: string;
  email: string;
  isBusinessOwner: boolean
  pincode?: string;
  createdAt: string;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  type: 'barbershop' | 'clinic' | 'carwash';
  pincode: string;
  operatingHours: {
    open: string;
    close: string;
  };
  address: string;
  rating: number;
  totalRatings: number;
  status: 'open' | 'closed' | 'break';
  imageUrl: string;
  description: string;
  services: string[];
  createdAt: string;
}

export interface Appointment {
  id: string;
  businessId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  isPriority: boolean;
  scheduledTime: string;
  estimatedWaitTime: number; // in minutes
  queueNumber: number;
  createdAt: string;
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Mock Data
export const mockUsers: User[] = [
  {
    id: Math.random().toString(),
    fullName: 'John Smith',
    email: 'john@example.com',
    isBusinessOwner: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    fullName: 'Alice Johnson',
    email: 'alice@example.com',
    isBusinessOwner: false,
    pincode: '400001',
    createdAt: new Date().toISOString(),
  },
];

export const mockBusinesses: Business[] = [
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: "StyleHub Barbershop",
    type: 'barbershop',
    pincode: '400001',
    operatingHours: {
      open: '09:00',
      close: '20:00',
    },
    address: '123 Fashion Street, Mumbai',
    rating: 4.7,
    totalRatings: 342,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200',
    description: 'Premium grooming services with expert barbers',
    services: ['Haircut', 'Beard Trim', 'Hot Towel Shave', 'Hair Styling'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'Vintage Cuts & Co.',
    type: 'barbershop',
    pincode: '400001',
    operatingHours: {
      open: '10:00',
      close: '21:00',
    },
    address: '45 Marine Drive, Mumbai',
    rating: 4.5,
    totalRatings: 256,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200',
    description: 'Classic barbershop with modern amenities',
    services: ['Haircut', 'Beard Grooming', 'Kids Haircut', 'Hair Treatment'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'The Gentlemen\'s Quarter',
    type: 'barbershop',
    pincode: '400001',
    operatingHours: {
      open: '08:00',
      close: '19:00',
    },
    address: '78 Hill Road, Mumbai',
    rating: 4.8,
    totalRatings: 189,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200',
    description: 'Luxury grooming experience for the modern gentleman',
    services: ['Premium Haircut', 'Royal Shave', 'Facial', 'Hair Color'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'Urban Trim Studio',
    type: 'barbershop',
    pincode: '400001',
    operatingHours: {
      open: '11:00',
      close: '22:00',
    },
    address: '234 Link Road, Mumbai',
    rating: 4.6,
    totalRatings: 167,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1622288432450-277d0fef5ed6?q=80&w=1200',
    description: 'Contemporary cuts for the urban professional',
    services: ['Signature Haircut', 'Beard Design', 'Hair Spa', 'Kids Special'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'Apollo Health Clinic',
    type: 'clinic',
    pincode: '400001',
    operatingHours: {
      open: '08:00',
      close: '20:00',
    },
    address: '567 Healthcare Avenue, Mumbai',
    rating: 4.9,
    totalRatings: 423,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200',
    description: 'Multi-specialty clinic with experienced doctors',
    services: ['General Medicine', 'Pediatrics', 'Dermatology', 'Dental'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'LifeCare Medical Center',
    type: 'clinic',
    pincode: '400001',
    operatingHours: {
      open: '09:00',
      close: '21:00',
    },
    address: '890 Wellness Road, Mumbai',
    rating: 4.7,
    totalRatings: 312,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200',
    description: 'State-of-the-art medical facility for family healthcare',
    services: ['Family Medicine', 'Cardiology', 'Orthopedics', 'Laboratory'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'City Health Hub',
    type: 'clinic',
    pincode: '400001',
    operatingHours: {
      open: '07:00',
      close: '19:00',
    },
    address: '123 Wellness Street, Mumbai',
    rating: 4.6,
    totalRatings: 278,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200',
    description: 'Comprehensive healthcare solutions under one roof',
    services: ['General Practice', 'Physiotherapy', 'Nutrition', 'Diagnostics'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'MediCare Plus',
    type: 'clinic',
    pincode: '400001',
    operatingHours: {
      open: '08:30',
      close: '20:30',
    },
    address: '456 Health Lane, Mumbai',
    rating: 4.8,
    totalRatings: 345,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1200',
    description: 'Advanced medical care with personalized attention',
    services: ['Internal Medicine', 'ENT', 'Gynecology', 'Pediatrics'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'Sparkle Car Wash',
    type: 'carwash',
    pincode: '400001',
    operatingHours: {
      open: '08:00',
      close: '20:00',
    },
    address: '12 Shine Street, Mumbai',
    rating: 4.7,
    totalRatings: 210,
    status: 'open',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661501041641-3e731115e687?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Professional car washing and detailing services',
    services: ['Exterior Wash', 'Interior Cleaning', 'Waxing', 'Polishing'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'AutoShine Car Spa',
    type: 'carwash',
    pincode: '400001',
    operatingHours: {
      open: '09:00',
      close: '21:00',
    },
    address: '34 Auto Lane, Mumbai',
    rating: 4.8,
    totalRatings: 185,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Premium car spa with advanced cleaning techniques',
    services: ['Full Body Wash', 'Engine Cleaning', 'Ceramic Coating', 'Vacuuming'],
    createdAt: new Date().toISOString(),
  },
  {
    id: Math.random().toString(),
    ownerId: mockUsers[0].id,
    name: 'EcoClean Car Wash',
    type: 'carwash',
    pincode: '400001',
    operatingHours: {
      open: '07:30',
      close: '19:30',
    },
    address: '56 Green Road, Mumbai',
    rating: 4.6,
    totalRatings: 160,
    status: 'open',
    imageUrl: 'https://images.unsplash.com/photo-1575844611398-2a68400b437c?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Eco-friendly car wash with water-saving technology',
    services: ['Eco Wash', 'Tire Cleaning', 'Interior Detailing', 'Glass Polishing'],
    createdAt: new Date().toISOString(),
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: Math.random().toString(),
    businessId: mockBusinesses[0].id,
    userId: mockUsers[1].id,
    status: 'confirmed',
    isPriority: false,
    scheduledTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    estimatedWaitTime: 30,
    queueNumber: 1,
    createdAt: new Date().toISOString(),
  },
];

export const mockReviews: Review[] = [
  {
    id: Math.random().toString(),
    businessId: mockBusinesses[0].id,
    userId: mockUsers[1].id,
    rating: 5,
    comment: 'Great service, minimal waiting time!',
    createdAt: new Date().toISOString(),
  },
];

// Mock CRUD Operations
export const mockDB = {
  users: [...mockUsers],
  businesses: [...mockBusinesses],
  appointments: [...mockAppointments],
  reviews: [...mockReviews],

  // Users
  createUser: (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser = {
      id: Math.random().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    mockDB.users.push(newUser);
    return newUser;
  },

  // Get businesses by pincode
  getBusinessesByPincode: (pincode: string) => {
    return mockDB.businesses.filter(business => business.pincode === pincode);
  },

  // Get businesses by type and pincode
  getBusinessesByTypeAndPincode: (type: 'barbershop' | 'clinic' | 'carwash', pincode: string) => {
    return mockDB.businesses.filter(
      business => business.type === type && business.pincode === pincode
    );
  },

  // Businesses
  createBusiness: (businessData: Omit<Business, 'id' | 'createdAt' | 'rating' | 'totalRatings'>) => {
    const newBusiness = {
      id: Math.random().toString(),
      ...businessData,
      rating: 0,
      totalRatings: 0,
      createdAt: new Date().toISOString(),
    };
    mockDB.businesses.push(newBusiness);
    return newBusiness;
  },

  // Appointments
  createAppointment: (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'queueNumber'>) => {
    const queueNumber = mockDB.appointments.filter(
      (a) => a.businessId === appointmentData.businessId && a.status === 'confirmed'
    ).length + 1;

    const newAppointment = {
      id: Math.random().toString(),
      ...appointmentData,
      queueNumber,
      createdAt: new Date().toISOString(),
    };
    mockDB.appointments.push(newAppointment);
    return newAppointment;
  },

  // Reviews
  createReview: (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview = {
      id: Math.random().toString(),
      ...reviewData,
      createdAt: new Date().toISOString(),
    };
    mockDB.reviews.push(newReview);

    // Update business rating
    const business = mockDB.businesses.find((b) => b.id === reviewData.businessId);
    if (business) {
      const businessReviews = mockDB.reviews.filter((r) => r.businessId === business.id);
      const totalRating = businessReviews.reduce((sum, review) => sum + review.rating, 0);
      business.rating = totalRating / businessReviews.length;
      business.totalRatings = businessReviews.length;
    }

    return newReview;
  },
};