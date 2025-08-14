export interface Platform {
    name: string;
    url?: string;
    students: string;
    tagline?: string;
    description?: string;
    features?: string[];
}

export interface YouTubeChannel {
    subscribers: string;
    videos?: string;
    language?: string;
    handle?: string;
    focus?: string;
}

export interface YouTube {
    [key: string]: YouTubeChannel;
}

export interface Course {
    name?: string;
    title: string;
    description: string;
    duration?: string;
    price?: string;
    students?: string;
    rating?: number;
    level: string;
    skills: string[];
    startDate?: string;
    status?: string;
    format?: string;
    couponCode?: string;
    curriculum?: {
        [key: string]: string;
    };
    type?: string;
}

export interface WorkExperience {
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface Contact {
    email?: string;
    discord?: string;
    website?: string;
    whatsapp?: string;
    github?: string;
    linkedin?: string;
}

export interface Persona {
    id: string;
    name: string;
    title: string;
    bio: string;
    avatar: string;
    specialties: string[];
    style: {
        voice: string;
        traits: string[];
    };
    tunes: string[];
    platform?: Platform;
    youtube?: YouTube | YouTubeChannel;
    cohorts?: {
        [key: string]: Course;
    };
    courses?: {
        [key: string]: Course;
    };
    udemy?: {
        [key: string]: Course;
    };
    workExperience?: WorkExperience[];
    contact?: Contact;
    achievements?: string[];
    testimonials?: {
        student: string;
        message: string;
        course?: string;
    }[];
    socialProof?: {
        totalStudents?: string;
        totalCourses?: number;
        averageRating?: number;
        countriesReached?: number;
    };
    philosophy?: string[];
    currentFocus?: string[];
    upcomingCourses?: Course[];
}