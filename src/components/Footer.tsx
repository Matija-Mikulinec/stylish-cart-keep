
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium text-lg mb-4">Minimal Shop</h3>
            <p className="text-sm text-gray-500">
              Simple, stylish products for minimalist living.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <address className="text-sm text-gray-500 not-italic">
              <p>Email: hello@minimalshop.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {currentYear} Minimal Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
