import { 
 User,Info, Phone,Settings,
 Users,
} from 'lucide-react';
import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';

export default function ContactPage(){
    return(
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-16">
  
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">Get in Touch</h1>
          <p className="text-xl text-blue-200">We'd love to hear from you! Reach out with any questions or feedback</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
     
          <div className="bg-slate-800 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-white">Send us a Message</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2 font-medium">Name *</label>
                <input
                  type="text"

                  className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Email *</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <label className="block text-white mb-2 font-medium">Message *</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700"
                  rows={6}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <button    
                className="w-full bg-slate-700  text-white py-4 rounded-lg font-semibold hover:border-slate-500 hover:bg-slate-600 cursor-pointer transition shadow-lg"
              >
                Send Message
              </button>
            </div>
          </div>

  
          <div className="space-y-6">
  
            <div className="bg-slate-800 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-white">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Phone</h3>
                    <p className="text-blue-200">+91 1234567890</p>
                    <p className="text-blue-300 text-sm">Mon-Fri, 9AM-6PM </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Email</h3>
                    <p className="text-blue-200">support@leavetracker.com</p>
                    <p className="text-blue-300 text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Sales Inquiries</h3>
                    <p className="text-blue-200">sales@leavetracker.com</p>
                    <p className="text-blue-300 text-sm">For enterprise solutions</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Technical Support</h3>
                    <p className="text-blue-200">tech@leavetracker.com</p>
                    <p className="text-blue-300 text-sm">For technical assistance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Office Hours</h2>
              <div className="space-y-3 text-blue-100">
                <div className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
               
              </div>
            </div>

          </div>
        </div>

  
        <div className="mt-12 bg-slate-800 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">How do I get started?</h3>
              <p className="text-blue-200">
                Simply click on the "Register" button and create your employee account. 
                Once approved by your admin, you can start applying for leaves immediately.
              </p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Is LeaveTracker free to use?</h3>
              <p className="text-blue-200">
                Yes! LeaveTracker offers a free tier for small organizations. 
                Contact our sales team for enterprise pricing and advanced features.
              </p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Can I customize leave policies?</h3>
              <p className="text-blue-200">
                Absolutely! Administrators have full control to customize leave types, 
                allowances, and policies according to organizational requirements.
              </p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">What support options are available?</h3>
              <p className="text-blue-200">
                We offer email support, phone support during business hours, and comprehensive 
                documentation. Enterprise customers get dedicated support representatives.
              </p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Is my data secure?</h3>
              <p className="text-blue-200">
                Yes! We use industry-standard encryption and security practices to ensure 
                your data remains safe and confidential at all times.
              </p>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">Can I access from mobile devices?</h3>
              <p className="text-blue-200">
                LeaveTracker is fully responsive and works seamlessly on desktop, tablet, 
                and mobile devices. Apply for leave from anywhere, anytime!
              </p>
            </div>
          </div>
        </div>

      
        <div className="mt-8 bg-slate-800 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
          <p className="mb-6">Follow us on social media for updates, tips, and news</p>
          <div className="flex justify-center gap-4">
            <div className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg cursor-pointer transition">
              <Users className="w-8 h-8" />
            </div>
            <div className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg cursor-pointer transition">
              <Info className="w-8 h-8" />
            </div>
            <div className="bg-slate-700 hover:bg-slate-600 p-4 rounded-lg cursor-pointer transition">
              <Phone className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}