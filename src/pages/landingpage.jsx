import React from 'react';

import Slider from '../components/slider';
import Services from '../components/services';
import Footer from '../components/footer';
import Banner from '../components/banner';

function LandingPage() {
    return (
        <div>
            <Slider
                images={[
                    'https://res.cloudinary.com/dkxt6mlnh/image/upload/v1715921529/ta/mymud1b5cs2uotpn4yfp.jpg',
                    'https://res.cloudinary.com/dkxt6mlnh/image/upload/v1715921528/ta/k8t0x1cjxvpeegoqew0o.jpg',
                ]}
            />
            <Services />
            <Banner />
            <Footer />
        </div>
    );
}

export default LandingPage;