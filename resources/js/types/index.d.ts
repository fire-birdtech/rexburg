export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    profile_image_url?: string;
    created_at: string;
}

export interface Manager {
    id: number;
    name: string;
    email: string;
}

export interface Claim {
    claimable_id: number;
    claimable_type: string;
    status: string;
    user_id: number;
    verification_code: string;
    street_address: string;
    city: string;
    postal_code: string;
}

export interface Amenity {
    id: number;
    name: string;
    single_housing: boolean;
}

export interface Review {
    body: string;
    created_at: string;
    rating: string;
    reviewable_id: number;
    reviewable_type: string;
    user: User;
    user_id: number;
}

export interface Housing {
    id: number;
    about: string;
    amenities: Amenity[];
    bathroom_range: string;
    bedroom_range: string;
    byui_approved?: boolean;
    city: string;
    claim: Claim;
    cover_image_path: string;
    cover_image_url: string;
    email_address: string;
    housing_type: string;
    managers: Manager[];
    name: string;
    phone_number: string;
    postal_code: string;
    profile_image_path: string;
    profile_image_url: string;
    rent_range: string;
    reviews: Review[];
    reviews_count: number;
    score: number;
    score_description: string;
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
