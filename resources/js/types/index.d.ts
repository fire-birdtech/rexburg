export interface Suspension {
    user_id: number;
    reason: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    created_at: string;
    email: string;
    email_verified_at: string;
    name: string;
    profile_photo_url?: string;
    reviews_count: number;
    roles: Role[];
    suspended_until?: string;
    suspensions: Suspension[];
    suspensions_count: number;
}

export interface Manager {
    id: number;
    name: string;
    email: string;
    profile_photo_url: string;
}

export interface Claim {
    id: number;
    claimable: Housing;
    claimable_id: number;
    claimable_type: string;
    status: string;
    user_id: number;
    verification_code: string;
    street_address: string;
    city: string;
    postal_code: string;
    user: User;
    created_at: string;
}

export interface Claimable {
  id: number;
  type: string;
  name: string;
  slug: string;
  cover_image_url: string;
}

export interface Amenity {
    id: number;
    name: string;
    single_housing: boolean;
}

export interface Review {
  id: number;
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
    revision_history: Revision[];
    score: number;
    score_description: string;
    slug: string;
    street: string;
    tenant_rating: string;
    website_url: string;
}

export interface Revision {
    id: number;
    revisionable_type: string;
    revisionable_id: number;
    user: User;
    key: string;
    old_value: string;
    new_value: string;
    created_at: string;
    updated_at: string;
}

export interface View {
    id: number;
    viewable: Housing;
}

export interface RatingData {
  rating: number;
  total: number;
}

export interface Rating {
  data: RatingData[];
  name: string;
  score: string;
  total: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type NavProps = {
  user: User;
}
