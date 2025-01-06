import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="shadow-lg rounded-lg p-8 space-y-10 backdrop-blur-sm">
          <section>
            <h2 className="text-2xl font-semibold  mb-4">1. Data Collection</h2>
            <p className="leading-relaxed">
              We collect personal information to provide and improve our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold  mb-4">2. Data Usage</h2>
            <p className=" leading-relaxed">
              Your data is used to enhance your experience and communicate with
              you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold  mb-4">3. Data Protection</h2>
            <p className="leading-relaxed">
              We implement security measures to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
            <ul className="list-disc pl-6  space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of data collection</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold  mb-4">
              5. Changes to This Policy
            </h2>
            <p className="leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center text-sm ">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us.
          </p>
        </div>
      </div>
    </div>
  );
}
