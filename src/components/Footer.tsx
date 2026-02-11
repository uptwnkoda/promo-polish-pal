import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img
              src="https://img1.wsimg.com/isteam/ip/75919328-b237-4d1a-b78d-47408bd658d8/3DaysLater-10.png/:/rs=h:105,cg:true,m/qt=q:100/ll"
              alt="3 Days Later Roofing"
              className="h-12 object-contain brightness-0 invert mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Trusted roofing experts serving the Lehigh Valley. 
              Honest pricing, professional workmanship, no pressure.
            </p>
            <p className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 bg-white/10 rounded-full text-white/90 text-sm font-medium">
              🇲🇽 Hablamos Español
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-white/70">1825 Roth Avenue, Allentown, PA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+14846428141" className="text-white/70 hover:text-white transition-colors">
                  (484) 642-8141
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:info@3dayslaterroofing.com" className="text-white/70 hover:text-white transition-colors">
                  info@3dayslaterroofing.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-4">Business Hours</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                Mon - Fri: 9:00 AM - 5:00 PM
              </li>
              <li className="pl-8">Sat: By Appointment</li>
              <li className="pl-8">Sun: Closed</li>
            </ul>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© 2026 3 Days Later Roofing. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="/auth" className="hover:text-white transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
