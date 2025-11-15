import { Phone, Mail, MapPin as LocationPin, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function FooterSection() {
  const contactInfo = [
    { icon: Phone, value: "9518979133" },
    { icon: Mail, value: "studyfistudycenter@gmail.com" },
    { icon: LocationPin, value: "Vaibhav Colony, Dastur Nagar, MIDC Road, Amravati, Maharashtra, near Gondbaba Mandir, India", isMultiline: true }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 text-white py-20 relative overflow-hidden" id="contact">
      {/* Decorative Background */}
      

      <div className=" px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                  <Image src="/study-fi-logo.svg" alt="Study-Fi Logo" width={120} height={48} className="h-12 w-auto" />
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md text-lg leading-relaxed">
              StudyFi Library, located in <span className="text-orange-400 font-semibold">Vaibhav Colony, Dastur Nagar, MIDC Road, Amravati</span>
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-orange-400">Contact Info</h3>
            <div className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3 bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-orange-500/20">
                    <Icon className={`w-6 h-6 text-orange-400 ${info.isMultiline ? "mt-1" : ""}`} />
                    <span className="text-gray-200 text-lg font-medium">{info.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-orange-400">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
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
            <p className="text-gray-300 mb-4 md:mb-0 text-lg font-medium">Study-Fi Reading Room & Library</p>
            <p className="text-orange-400 font-semibold">© 2024 Study-Fi. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
