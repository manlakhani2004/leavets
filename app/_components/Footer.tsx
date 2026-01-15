import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 text-white">
      <div className="max-w-[90%] mx-auto px-6 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-indigo-500">
              LeaveTracker
            </h2>
            <p className="mt-3 text-white/60 text-sm leading-relaxed">
              A modern leave management system designed to simplify employee
              leave tracking, approvals, and administration.
            </p>
          </div>


          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70">
              {/* <li>
                <Link href="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400">
                  About
                </Link>
              </li> */}
              {/* <li>
                <Link href="/contact" className="hover:text-indigo-400">
                  Contact Us
                </Link>
              </li> */}
              <li>
                <Link href="/auth/login" className="hover:text-indigo-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="hover:text-indigo-400">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Email: support@leavetracker.com</li>
             
              <li>Support: Mon – Fri, 9AM – 6PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          © {new Date().getFullYear()} LeaveTracker. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
