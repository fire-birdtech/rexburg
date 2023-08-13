export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Amenity {
    id: number;
    name: string;
    single_housing: boolean;
}

export interface Housing {
    id: number;
    about: string;
    amenities: Amenity[];
    bathroom_range: string;
    bedroom_range: string;
    byui_approval?: boolean;
    city: string;
    cover_image_url: string;
    email_address: string;
    housing_type: string;
    name: string;
    phone_number: string;
    postal_code: string;
    profile_image_url: string;
    rent_range: string;
    reviews_count: number;
    score: string;
    slug: string;
    street: string;
    tenant_rating: string;
    website_url: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
