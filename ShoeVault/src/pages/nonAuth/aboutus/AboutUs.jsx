import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Story
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Crafting exceptional experiences since 2015
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At StyleHub, we believe fashion should be accessible, sustainable, and empowering. 
              We're committed to bringing you high-quality products that don't compromise on ethics or style.
            </p>
            <p className="text-lg text-gray-600">
              Every item in our collection is carefully curated to ensure it meets our standards 
              for quality, durability, and timeless design.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Our team working" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sustainability",
                description: "We source eco-friendly materials and partner with ethical manufacturers to reduce our environmental impact.",
                icon: "🌱"
              },
              {
                title: "Quality",
                description: "Every product undergoes rigorous testing to ensure it meets our high standards before reaching you.",
                icon: "✨"
              },
              {
                title: "Community",
                description: "We give back 5% of profits to local initiatives and support emerging designers through our incubator program.",
                icon: "❤️"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet The Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Alex Morgan",
                role: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Jamie Chen",
                role: "Head Designer",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              },
              {
                name: "Taylor Smith",
                role: "Operations Manager",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Jordan Lee",
                role: "Customer Experience",
                image: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-md">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sign up for our newsletter and get 15% off your first order plus exclusive access to new collections.
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none"
            />
            <button className="bg-white text-black px-6 py-3 rounded-r-lg font-medium hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;