import { motion } from "framer-motion";
import { Facebook, Github, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold text-white">MyWebsite</h2>
          <p className="text-sm mt-2">
            A modern platform for learning, connecting, and growing together. 🚀
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About</a></li>
            <li><a href="" className="hover:text-blue-400">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" 
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" 
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:info@mywebsite.com" 
              className="p-2 bg-gray-800 rounded-full hover:bg-red-500 transition">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" 
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" 
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.div 
        className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </motion.div>
    </footer>
  );
}
