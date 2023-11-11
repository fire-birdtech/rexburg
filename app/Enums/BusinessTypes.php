<?php

namespace App\Enums;

enum BusinessTypes: string
{
    case AUTO_SERVICE_SHOP = 'auto service shop';
    case CREDIT_UNION = 'credit union';
    case GUN_STORE = 'gun store';
    case MEDICAL_CLINIC = 'medical clinic';
    case RESTAURANT = 'restaurant';
    case SPA = 'spa';
}
