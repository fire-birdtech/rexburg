export default function convertKey(key) {
  switch (key) {
    case 'about':
      return 'About';

    case 'bathroom_range':
      return 'Bathroom Range';

    case 'bedroom_range':
      return 'Bedroom Range';

    case 'byui_approved':
      return 'BYU-Idaho Approved';

    case 'city':
      return 'City';

    case 'created_at':
      return 'Created';

    case 'email_address':
      return 'Email Address';

    case 'housing_type':
      return 'Housing Type';

    case 'name':
      return 'Name';

    case 'phone_number':
      return 'Phone Number';

    case 'postal_code':
      return 'Postal Code';

    case 'rent_range':
      return 'Rent Range';

    case 'street':
      return 'Street';

    default:
      return key;
  }
}
