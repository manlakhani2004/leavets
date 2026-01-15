import {
    CheckCircle,
    Settings, Users,
    TrendingUp, Eye,
} from 'lucide-react';
import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-16">
         
                <div className="  rounded-xl p-12 text-white mb-8">
                    <h1 className="text-5xl font-bold mb-6 text-center">About LeaveTracker</h1>
                    <p className="text-xl text-blue-100 text-center max-w-4xl mx-auto">
                        Your trusted partner in modern workforce management and leave administration
                    </p>
                </div>

              
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-slate-800 backdrop-blur-lg rounded-xl p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="w-10 h-10 text-blue-300" />
                            <h2 className="text-3xl font-bold">Our Mission</h2>
                        </div>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            To simplify and modernize leave management by providing intuitive, efficient, and transparent tools for both employees and administrators, eliminating the complexity and paperwork of traditional systems.
                        </p>
                    </div>

                    <div className="bg-slate-800 backdrop-blur-lg rounded-xl p-8 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-10 h-10 text-green-300" />
                            <h2 className="text-3xl font-bold">Our Vision</h2>
                        </div>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            To be a trusted, leading leave management platform that makes leave handling seamless, automated, and stress-free, enabling teams to focus on their work and well-being.
                        </p>
                    </div>
                </div>

            
                <div className="bg-slate-800 backdrop-blur-lg rounded-xl p-8 text-white mb-8">
                    <h2 className="text-3xl font-bold mb-6">What is LeaveTracker?</h2>
                    <div className="space-y-4 text-blue-100 text-lg leading-relaxed">
                        <p>
                            LeaveTracker is a modern leave management system that simplifies
                            how organizations handle employee leave requests, approvals, and tracking.
                            It removes the need for manual records and paper-based processes.
                        </p>
                        <p>
                            Designed for both small teams and growing organizations, LeaveTracker allows
                            employees to easily apply for leave and view balances, while administrators
                            can efficiently manage requests and leave policies.
                        </p>
                        <p>
                            With flexible configuration options and an intuitive interface, LeaveTracker
                            adapts to your organization’s needs and ensures a smooth, transparent leave
                            management experience.
                        </p>
                    </div>
                </div>


                <div className="bg-slate-800 backdrop-blur-lg rounded-xl p-8 text-white mb-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive Features</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Multiple Leave Types</h3>
                                <p className="text-blue-200">Support for Sick Leave, Casual Leave, Annual Leave, and Unpaid Leave with customizable allowances</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Automated Balance Calculations</h3>
                                <p className="text-blue-200">Real-time tracking of leave balances with automatic deductions and accruals</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Instant Approval Workflow</h3>
                                <p className="text-blue-200">Streamlined approval process with instant notifications for both employees and admins</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Visual Calendar Views</h3>
                                <p className="text-blue-200">Interactive calendars showing individual and organization-wide leave schedules</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Employee Management Dashboard</h3>
                                <p className="text-blue-200">Complete employee lifecycle management with approval workflows and status tracking</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Customizable Leave Policies</h3>
                                <p className="text-blue-200">Define and modify policies to match your organization's specific requirements</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Comprehensive Reports & Analytics</h3>
                                <p className="text-blue-200">Detailed insights into leave patterns, usage statistics, and workforce availability</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <CheckCircle className="w-6 h-6 text-green-400  mt-1" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Mobile Responsive Design</h3>
                                <p className="text-blue-200">Access LeaveTracker from any device - desktop, tablet, or smartphone</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800  p-8 rounded-xl text-white text-center">
                        <Users className="w-16 h-16 mx-auto mb-4 opacity-90" />
                        <h3 className="text-2xl font-bold mb-3">For Employees</h3>
                        <ul className="text-left space-y-2 text-blue-100">
                            <li>• Easy leave application</li>
                            <li>• Real-time balance tracking</li>
                            <li>• Transparent approval status</li>
                            <li>• Personal leave calendar</li>
                            <li>• Request history access</li>
                        </ul>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-xl text-white text-center">
                        <Settings className="w-16 h-16 mx-auto mb-4 opacity-90" />
                        <h3 className="text-2xl font-bold mb-3">For Administrators</h3>
                        <ul className="text-left space-y-2 text-purple-100">
                            <li>• Centralized management</li>
                            <li>• Quick approval process</li>
                            <li>• Policy customization</li>
                            <li>• Detailed analytics</li>
                            <li>• Employee oversight</li>
                        </ul>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-xl text-white text-center">
                        <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-90" />
                        <h3 className="text-2xl font-bold mb-3">For Organizations</h3>
                        <ul className="text-left space-y-2 text-green-100">
                            <li>• Reduced paperwork</li>
                            <li>• Improved efficiency</li>
                            <li>• Better compliance</li>
                            <li>• Cost savings</li>
                            <li>• Enhanced productivity</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-800 backdrop-blur-lg rounded-xl p-8 text-white">
                    <h2 className="text-3xl font-bold mb-6 text-center">Why Organizations Choose LeaveTracker</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3 text-blue-300">User-Friendly Interface</h3>
                            <p className="text-blue-100 mb-4">
                                Designed with simplicity in mind, our intuitive interface requires minimal training
                                and ensures high adoption rates across your organization.
                            </p>

                            <h3 className="text-xl font-bold mb-3 text-blue-300">Reliable & Secure</h3>
                            <p className="text-blue-100 mb-4">
                                Your data is precious. We implement industry-standard security measures to ensure
                                your information remains safe and confidential.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-3 text-blue-300">Scalable Solution</h3>
                            <p className="text-blue-100 mb-4">
                                Whether you have 10 employees or 10,000, LeaveTracker grows with your organization
                                without compromising performance or usability.
                            </p>

                            <h3 className="text-xl font-bold mb-3 text-blue-300">Continuous Innovation</h3>
                            <p className="text-blue-100 mb-4">
                                We're constantly improving our platform based on user feedback and industry trends
                                to provide you with the best leave management experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}