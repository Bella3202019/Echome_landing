"use client";

import { cn } from "../../utils";
import { lora } from "../fonts";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className={cn(
      "min-h-screen bg-black text-white",
      "px-4 md:px-8 py-16",
      lora.className
    )}>
      <Link 
        href="/"
        className={cn(
          "fixed top-6 left-8",
          "text-sm font-medium text-white/80 hover:text-white",
          "transition-colors duration-200",
          "z-50"
        )}
      >
        ← Back to Home
      </Link>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-medium mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-300">
          <section>
            <h2 className="text-xl font-medium text-white mb-4">1. Introduction</h2>
            <p>
              At Echo, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
              and protect your personal information when you use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Account information (email address, username)</li>
              <li>Content you create or share through our services</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Improve user experience</li>
              <li>Communicate with you about our services</li>
              <li>Ensure the security of our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <Link 
                href="mailto:vela@echome.im"
                className="text-white hover:text-zinc-300 underline"
              >
                vela@echome.im
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-white mb-4">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on our website.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
} 