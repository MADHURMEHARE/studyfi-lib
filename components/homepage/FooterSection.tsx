import { Phone, Mail, MapPin as LocationPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function FooterSection() {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" }
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 text-white py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                  <Image 
                    src="/study-fi-logo.svg" 
                    alt="Study-Fi Logo" 
                    width={120} 
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              StudyFi Library, located in <span className="text-orange-400 font-semibold">Vaibhav Colony, Dastur Nagar , MIDC Road, Amravati</span>, is designed to help students prepare for competitive exams.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-orange-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-orange-500/20">
                <Phone className="w-6 h-6 text-orange-400" />
                <span className="text-gray-200 text-lg font-medium">9518979133</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-orange-500/20">
                <Mail className="w-6 h-6 text-orange-400" />
                <span className="text-gray-200 text-lg font-medium">studyfistudycenter@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-orange-500/20">
                <LocationPin className="w-6 h-6 text-orange-400 mt-1" />
                <span className="text-gray-200 text-lg font-medium">
                  Vaibhav Colony,DASTUR NAGAR, MIDC Road,<br />
                  Amravati, Maharashtra, India
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-orange-400">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-orange-500/20 transition-all duration-300 border border-orange-500/20 hover:border-orange-400 hover:scale-110 transform"
                  >
                    <Icon className="w-6 h-6 text-orange-400" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 mb-4 md:mb-0 text-lg font-medium">
              Study-Fi Reading Room & Library 
            </p>
            <p className="text-orange-400 font-semibold">
              © 2024 Study-Fi. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}