import React from 'react';
import ChooseUs from '../assets/choose-us-1.png';

const WhyUs = () => {
  const features = [
    {
      title: "Safe and Secured",
      description: "Tim kami menjamin data anda selalu aman dan terjamin",
      icon: ChooseUs,
    },
    {
      title: "99.5% Uptime Guarantee",
      description: "Uptime sampai dengan 99,5% tanpa gangguan. ",
      icon: ChooseUs,
    },
    {
      title: "Our Dedicated Support",
      description: "Uptime sampai dengan 99,98% tanpa gangguan",
      icon: ChooseUs,
    },
    {
      title: "High Performance",
      description: "Server kami memberikan performa yang tinggi.",
      icon: ChooseUs,
    },
    {
      title: "24/7 Monitoring",
      description: "Kami memonitor server 24/7 untuk memastikan uptime.",
      icon: ChooseUs,
    },
    {
      title: "Easy Integration",
      description: "Integrasi yang mudah dengan berbagai platform.",
      icon: ChooseUs,
    },
  ];

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <img src={feature.icon} alt={feature.title} className="h-32 w-32" />
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
