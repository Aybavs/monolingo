import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold  mb-4">Terms of Service</h1>
          <p className="">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="shadow-lg rounded-lg p-8 space-y-10 backdrop-blur-sm">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p className=" leading-relaxed">
              By accessing and using our services, you agree to be bound by
              these terms and conditions. Please read them carefully before
              using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold  mb-4">
              2. User Rights & Responsibilities
            </h2>
            <p className=" leading-relaxed">
              Users must be at least 13 years old to use our services. You are
              responsible for maintaining the confidentiality of your account
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold  mb-4">3. Privacy Policy</h2>
            <p className=" leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect, use, and protect your personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold  mb-4">
              4. Content Guidelines
            </h2>
            <ul className="list-disc pl-6  space-y-2">
              <li>Respect intellectual property rights</li>
              <li>Do not share inappropriate or harmful content</li>
              <li>Follow community guidelines</li>
              <li>Report violations when encountered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold  mb-4">5. Termination</h2>
            <p className=" leading-relaxed">
              We reserve the right to terminate or suspend access to our
              services at our sole discretion, without prior notice or
              liability.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center text-sm ">
          <p>If you have any questions about these terms, please contact us.</p>
        </div>
      </div>
    </div>
  );
}
