<?php

namespace Database\Seeders;

use App\Enums\BusinessTypes;
use App\Models\Business;
use Illuminate\Database\Seeder;

class BusinessesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Business::create([
            'name' => 'Pizza Pie Cafe',
            'type' => BusinessTypes::RESTAURANT->value,
            'about' => "Welcome to Pizza Pie Cafe in Rexburg, Idaho, where the art of crafting the perfect pizza reaches new heights! Nestled in the heart of Rexburg, this culinary gem promises a dining experience like no other. Picture this: an inviting ambiance, warm and friendly staff, and an endless array of fresh, high-quality ingredients awaiting your creative touch. At Pizza Pie Cafe, we invite you to embark on a flavor-packed journey as you customize your own pizza masterpiece or indulge in our chef's signature creations. From the crisp, golden crust to the mouthwatering blend of premium cheeses and locally sourced toppings, each bite is a symphony of taste sensations. With an all-you-can-eat buffet that includes not just pizza, but also a variety of delectable pasta, fresh salads, and decadent desserts, Pizza Pie Cafe in Rexburg is not just a meal—it's a celebration of flavors that will leave your taste buds dancing and have you coming back for more. Join us for an unforgettable dining experience where the joy of pizza-making meets the pleasure of savoring every bite!",
            'street' => '240 N 2nd E',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => 'Millhollow Restaurant',
            'type' => BusinessTypes::RESTAURANT->value,
            'about' => "Nestled in the heart of Rexburg, Idaho, Millhollow Restaurant is a culinary haven that beckons food enthusiasts with its unique blend of rustic charm and gourmet delights. Step into a warm and inviting atmosphere where every detail is carefully curated to enhance your dining experience. At Millhollow, we take pride in our farm-to-table approach, sourcing the freshest local ingredients to create a menu that reflects the vibrant flavors of the region. From savory breakfast options that kickstart your day to mouthwatering lunch and dinner selections that cater to diverse palates, our chefs skillfully weave together tradition and innovation. Whether you're savoring a signature dish crafted with love or relishing one of our decadent desserts, every bite is a journey through the exquisite tastes of Idaho. Millhollow Restaurant isn't just a place to eat; it's a culinary adventure where every dish is a celebration of local flavors, making each visit a memorable occasion for both the discerning food connoisseur and the casual diner alike.",
            'street' => '48 S 1st E',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => "Madison Women's Clinic",
            'type' => BusinessTypes::MEDICAL_CLINIC->value,
            'about' => "Welcome to Madison Women's Clinic, where compassionate care meets expertise in women's health right here in Rexburg, Idaho. Our clinic is more than just a medical facility; it's a haven designed exclusively for the well-being of women. Our team of dedicated healthcare professionals is committed to providing personalized, patient-centric care, ensuring that each woman who walks through our doors receives the attention and support she deserves. From routine wellness exams to specialized services, we prioritize your health at every stage of life. Madison Women's Clinic is equipped with state-of-the-art technology, fostering an environment of trust and comfort. With a focus on empowering women through education and attentive healthcare, we strive to make every visit a positive and empowering experience. Join us on a journey toward optimal health and well-being, where you're not just a patient; you're a valued member of our community, and your health and happiness are our top priorities.",
            'street' => '15 Madison Professional Park',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => 'Grand Peaks Medical',
            'type' => BusinessTypes::MEDICAL_CLINIC->value,
            'about' => "Step into a world of comprehensive healthcare excellence at Grand Peaks Medical in Rexburg, Idaho. Our clinic is a beacon of top-tier medical services, dedicated to your well-being and peace of mind. What sets Grand Peaks apart is our commitment to personalized care, where each patient is treated as an individual with unique needs and concerns. Our team of experienced and compassionate healthcare professionals is ready to guide you on your journey to optimal health, offering a range of services from preventive care to specialized treatments. With a patient-centric approach and cutting-edge medical technology, Grand Peaks Medical is not just a clinic; it's a trusted partner in your health and wellness. Experience the difference of attentive, expert care that empowers you to live your healthiest, happiest life. Welcome to Grand Peaks Medical, where your health is our priority, and every visit is a step toward a brighter, healthier future.",
            'street' => '72 S 1st E Suite 1',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => 'Madison Armory',
            'type' => BusinessTypes::GUN_STORE->value,
            'about' => "Discover a world of exceptional firearms and tactical gear at Madison Armory in Rexburg, Idaho. Our inventory stands as a testament to our unwavering commitment to quality, performance, and cutting-edge innovation. Whether you're a seasoned enthusiast or new to the scene, our carefully curated selection of firearms, ammunition, and accessories ensures that you'll find the perfect match for your needs. At Madison Armory, we go beyond being a retailer; we're your trusted source for top-tier products that blend craftsmanship with functionality. Step into a realm where excellence is the standard, and join a community that shares your passion for self-defense, sport shooting, and the finer aspects of firearm culture. Your journey into the world of Madison Armory is a seamless blend of quality, expertise, and satisfaction – an experience that goes beyond the purchase to enhance your appreciation for superior firearms and tactical gear.",
            'street' => '870 N 2nd E',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => 'Christensen Auto Body',
            'type' => BusinessTypes::AUTO_SERVICE_SHOP->value,
            'about' => "At Christensen Auto Body Shop in Rexburg, Idaho, we redefine automotive care with a commitment to precision, quality, and customer satisfaction. Our state-of-the-art facility is staffed by skilled technicians who take pride in restoring your vehicle to its prime condition. From minor dents to major repairs, we bring an unparalleled level of expertise to every project. At Christensen Auto Body Shop, your vehicle isn't just another job – it's a canvas for our craftsmanship. Our attention to detail, cutting-edge technology, and dedication to customer service make us the go-to destination for those who demand excellence in auto repairs. Trust us to bring your vehicle back to life, ensuring not only its optimal performance but also a driving experience that exceeds expectations. Experience the Christensen difference – where automotive care is elevated to an art form, and your satisfaction is our ultimate goal.",
            'street' => '940 N 2nd E',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => 'Sage Day Spa',
            'type' => BusinessTypes::SPA->value,
            'about' => 'Discover a haven of tranquility and rejuvenation at Sage Day Spa in Rexburg, Idaho. Our spa is a sanctuary where the stresses of daily life melt away, and self-care takes center stage. Immerse yourself in an oasis of relaxation, where skilled therapists and estheticians pamper you with a range of luxurious treatments designed to renew both body and spirit. From soothing massages that melt tension to invigorating facials that enhance your natural glow, every experience at Sage Day Spa is tailored to elevate your well-being. With a serene ambiance, personalized service, and a commitment to excellence, we invite you to indulge in a spa day that transcends the ordinary. Whether you seek a moment of escape or a holistic approach to self-care, Sage Day Spa awaits as your destination for blissful rejuvenation in Rexburg.',
            'street' => '859 S Yellowstone Hwy #902',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => 'Beehive Federal Credit Union',
            'type' => BusinessTypes::CREDIT_UNION->value,
            'about' => "Transform your financial journey with Beehive Federal Credit Union in Rexburg, Idaho. Here, banking transcends the ordinary, offering a personalized and community-centric approach to your financial well-being. Experience the convenience of cutting-edge digital services seamlessly integrated with the warmth of personalized member service. At Beehive Federal Credit Union, we're more than just a financial institution; we're a trusted partner on your path to financial success. With competitive rates, innovative products, and a commitment to supporting our local community, Beehive stands out as the destination where your financial goals and dreams can take root and flourish. Join us and discover a banking experience that's as unique as you are, where your financial future is nurtured and supported every step of the way.",
            'street' => '65 S Center St',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => 'Idaho Central Credit Union',
            'type' => BusinessTypes::CREDIT_UNION->value,
            'about' => 'Unlock a world of financial possibilities at Idaho Central Credit Union in Rexburg, Idaho. As a member, you step into a realm where banking becomes an empowering and seamless experience. Our cutting-edge digital services, coupled with a commitment to community support, redefine what it means to bank locally. From innovative financial products to personalized assistance, we pride ourselves on being more than just a credit union; we are your partner in financial success. At Idaho Central Credit Union, your financial well-being is at the forefront of everything we do. Join us and discover a banking journey that is not only efficient but also fosters growth and prosperity, making every transaction a step towards a brighter financial future.',
            'street' => '673 N 2nd E',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);

        Business::create([
            'name' => "Gringo's Mexican",
            'type' => BusinessTypes::RESTAURANT->value,
            'about' => "Dive into a culinary fiesta at Gringo's Mexican in Rexburg, Idaho, where every bite is a celebration of authentic flavors and vibrant Mexican cuisine. Our restaurant invites you to savor the essence of Mexico with a menu crafted to tantalize your taste buds. From sizzling fajitas and mouthwatering enchiladas to freshly prepared guacamole, each dish is a symphony of spices and fresh ingredients. The lively ambiance and friendly staff create the perfect backdrop for a memorable dining experience with family and friends. At Gringo's Mexican, we take pride in delivering a taste of Mexico right to your table, ensuring that every visit is a flavorful journey that keeps you coming back for more. Join us for a culinary escapade that captures the essence of Mexican cuisine, right here in Rexburg.",
            'street' => '43 S Center St',
            'city' => 'Rexburg',
            'postal_code' => '83440',
        ]);
    }
}
