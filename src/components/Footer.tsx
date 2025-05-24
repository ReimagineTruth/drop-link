
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, HelpCircle, FileText, Users, Shield, Cookie, Link as LinkIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-muted via-muted/90 to-muted/80 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative">
        {/* Main footer content - Centered Layout */}
        <div className="container mx-auto px-6 py-20">
          {/* Brand section - Centered */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 font-poppins font-bold text-4xl text-primary mb-6">
              <div className="p-3 bg-primary/10 rounded-xl">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zM7.83 14c.37 0 .67.26.74.62.41 2.22 2.28 2.98 3.64 2.87.43-.02.79.32.79.75 0 .4-.32.73-.72.75-2.13.13-4.62-1.09-5.19-4.12-.08-.45.28-.87.74-.87z"/>
                </svg>
              </div>
              Droplink
            </div>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Unify your links, sell products, and earn Pi on Pi Network with one elegant page.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://instagram.com/droplink.space" 
                aria-label="Instagram" 
                className="p-4 bg-white/80 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://twitter.com/droplink_space" 
                aria-label="Twitter" 
                className="p-4 bg-white/80 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <Twitter size={24} />
              </a>
              <a 
                href="https://facebook.com/droplink.space" 
                aria-label="Facebook" 
                className="p-4 bg-white/80 hover:bg-primary hover:text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Links sections - Centered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto mb-16">
            {/* Company section */}
            <div className="text-center space-y-6">
              <h3 className="font-poppins font-bold text-xl text-foreground">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/about" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">About</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/blog" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Blog</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/careers" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Careers</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Contact</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources section */}
            <div className="text-center space-y-6">
              <h3 className="font-poppins font-bold text-xl text-foreground">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/help" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <HelpCircle size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Help Center</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/templates" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <FileText size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Templates</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/creators" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <Users size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Creator Directory</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/developers" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <LinkIcon size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Developers</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal section */}
            <div className="text-center space-y-6">
              <h3 className="font-poppins font-bold text-xl text-foreground">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    to="/terms" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <FileText size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <Shield size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cookies" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <Cookie size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">Cookie Policy</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gdpr" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-base inline-flex items-center gap-3 group"
                  >
                    <Shield size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">GDPR Compliance</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter section */}
            <div className="text-center">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm max-w-sm mx-auto">
                <h3 className="font-poppins font-bold text-xl text-foreground mb-4">Stay Updated</h3>
                <p className="text-muted-foreground text-sm mb-6">Get the latest news and updates from Droplink</p>
                <form className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 bg-white/80"
                  />
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Mail size={18} className="group-hover:scale-110 transition-transform duration-200" /> 
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 bg-white/20 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                © {new Date().getFullYear()} Droplink.space. All rights reserved.
              </p>
              <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
                Built by the community, for the community. Droplink is committed to helping creators thrive on Pi Network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
