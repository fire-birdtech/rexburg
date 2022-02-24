export function convertKey(key) {
    switch (key) {
        case 'about':
            return 'About';
            break;

        case 'bathroom_range':
            return 'Bathroom Range';
            break;

        case 'bedroom_range':
            return 'Bedroom Range';
            break;

        case 'byui_approved':
            return 'BYU-Idaho Approved';
            break;

        case 'city':
            return 'City';
            break;

        case 'created_at':
            return 'Created';
            break;

        case 'email_address':
            return 'Email Address';
            break;

        case 'housing_type':
            return 'Housing Type';
            break;

        case 'name':
            return 'Name';
            break;

        case 'phone_number':
            return 'Phone Number';
            break;
        
        case 'postal_code':
            return 'Postal Code';
            break;

        case 'rent_range':
            return 'Rent Range';
            break;

        case 'street':
            return 'Street';
            break;
    
        default:
            return key;
            break;
    }
}