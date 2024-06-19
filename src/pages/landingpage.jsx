import React from 'react';

import Slider from '../components/slider';
import Services from '../components/services';
import Footer from '../components/footer';
import Banner from '../components/banner';
import WhyUs from '../components/whyus';

function LandingPage() {
    return (
        <div>
            <Slider
                images={[
                    'https://res.cloudinary.com/dkxt6mlnh/image/upload/v1718256218/ta/itvdjlvk8cjnihqfw2zw.png',
                    'https://res.cloudinary.com/dkxt6mlnh/image/upload/v1718256224/ta/c2lvjcfe2pewdpy2mvtj.png',
                ]}
            />
            <Services />
            <WhyUs />
            <Banner />
            <Footer />
        </div>
    );
}

export default LandingPage;