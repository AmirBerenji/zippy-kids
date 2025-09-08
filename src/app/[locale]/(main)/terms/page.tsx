"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, Users, CreditCard, FileText, HelpCircle, UserCheck, LucideIcon } from 'lucide-react';
import { title } from 'process';

const KidooHubTerms = () => {
  const [activeSection, setActiveSection] = useState('terms');

  const sections = [
    { id: 'terms', title: 'Terms of Service', icon: FileText },
    { id: 'privacy', title: 'Privacy Policy', icon: Shield },
    { id: 'cancellation', title: 'Cancellation Policy', icon: CreditCard },
    { id: 'fees', title: 'Service Fees', icon: Users },
    { id: 'faq', title: 'FAQ', icon: HelpCircle }
  ];

  const SectionHeader = ({ icon: Icon, title, subtitle }: { icon: LucideIcon, title: string, subtitle?: string }) => (
    <div className="flex items-center space-x-3 mb-8">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
    </div>
  );

  const PolicyItem = ({ number, title, children }: { number: string | number, title: string, children: React.ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    return (
      <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 text-left flex items-center justify-between bg-gradient-to-r from-blue-50 to-orange-50 hover:from-blue-100 hover:to-orange-100 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {number}
            </span>
            <span className="font-semibold text-gray-800">{title}</span>
          </div>
          {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-500" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
        </button>
        {isExpanded && (
          <div className="px-6 py-4 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

  const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden bg-white shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-800">{question}</span>
          {isOpen ? <ChevronDown className="w-5 h-5 text-blue-500" /> : <ChevronRight className="w-5 h-5 text-blue-500" />}
        </button>
        {isOpen && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-gray-700">{answer}</p>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'terms':
        return (
          <div>
            <SectionHeader 
              icon={FileText} 
              title="Terms of Service" 
              subtitle="Welcome to KidooHub! By creating an account or using our services, you agree to the following terms:"
            />
            
            <div className="space-y-4">
              <PolicyItem number="1" title="Eligibility">
                <p className="text-gray-700 leading-relaxed">
                  You must be at least 18 years old to use KidooHub. Parents and legal guardians are responsible for bookings made for their children.
                </p>
              </PolicyItem>

              <PolicyItem number="2" title="Our Role">
                <p className="text-gray-700 leading-relaxed">
                  KidooHub is a platform that connects parents with independent service providers such as doctors and nannies. We do not directly provide childcare or medical services, and providers are not employees of KidooHub.
                </p>
              </PolicyItem>

              <PolicyItem number="3" title="User Responsibilities">
                <div className="space-y-3">
                  <p className="text-gray-700">You agree to:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Provide accurate and up-to-date information.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Keep your account and password secure.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Use our platform only for lawful purposes.</span>
                    </li>
                  </ul>
                </div>
              </PolicyItem>

              <PolicyItem number="4" title="Payments & Bookings">
                <p className="text-gray-700 leading-relaxed">
                  Payments are handled securely through our platform or directly with providers. Fees and refund rules are explained in our Service Fees and Cancellation Policy.
                </p>
              </PolicyItem>

              <PolicyItem number="5" title="Limitation of Liability">
                <p className="text-gray-700 leading-relaxed">
                  KidooHub is not liable for accidents, health outcomes, or disputes that may arise between parents and providers. We ensure providers are verified, but the responsibility for service quality lies with the provider.
                </p>
              </PolicyItem>

              <PolicyItem number="6" title="Termination">
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to suspend or remove accounts that violate these terms.
                </p>
              </PolicyItem>

              <PolicyItem number="7" title="Governing Law">
                <p className="text-gray-700 leading-relaxed">
                  These terms are governed by the laws of Armenia.
                </p>
              </PolicyItem>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div>
            <SectionHeader 
              icon={Shield} 
              title="Privacy Policy" 
              subtitle="At KidooHub, we respect your privacy and are committed to protecting your personal information."
            />
            
            <div className="space-y-4">
              <PolicyItem number="1" title="Information We Collect">
                <div className="space-y-3">
                  <p className="text-gray-700">We collect the following information:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Name, email, phone number, and account details.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Booking information (e.g., doctor appointments, nanny requests).</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Payment details (if applicable).</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Device and usage information (cookies, IP, browser).</span>
                    </li>
                  </ul>
                </div>
              </PolicyItem>

              <PolicyItem number="2" title="How We Use Your Data">
                <div className="space-y-3">
                  <p className="text-gray-700">We use your data to:</p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Provide and improve our services.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Send confirmations, reminders, and important updates.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">Connect you with verified providers.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">For marketing (only with your consent).</span>
                    </li>
                  </ul>
                </div>
              </PolicyItem>

              <PolicyItem number="3" title="Data Sharing">
                <p className="text-gray-700 leading-relaxed">
                  We may share your information with trusted providers (doctors, nurses, etc.) and third-party partners (payment processors, hosting services). <strong>We never sell your personal data.</strong>
                </p>
              </PolicyItem>

              <PolicyItem number="4" title="Children's Privacy">
                <p className="text-gray-700 leading-relaxed">
                  We only collect information from parents, not directly from children. Parents remain fully responsible for the information they share.
                </p>
              </PolicyItem>

              <PolicyItem number="5" title="Your Rights">
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-2">You can request to access, update, or delete your data anytime by contacting us at:</p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <a href="mailto:privacy@kidoohub.com" className="text-blue-600 font-medium hover:text-blue-800">
                      privacy@kidoohub.com
                    </a>
                  </div>
                </div>
              </PolicyItem>
            </div>
          </div>
        );

      case 'cancellation':
        return (
          <div>
            <SectionHeader 
              icon={CreditCard} 
              title="Cancellation Policy" 
              subtitle="We understand that plans change. Here's how cancellations work:"
            />
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Parent Cancellations
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Cancel within 24 hours of booking</p>
                      <p className="text-gray-600 text-sm">Full refund</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Cancel less than 24 hours before service</p>
                      <p className="text-gray-600 text-sm">Partial refund (50%)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✗</span>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">No-show without notice</p>
                      <p className="text-gray-600 text-sm">No refund</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                  Provider Cancellations
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  If a provider cancels, you will receive a <strong>full refund</strong> or be offered a reschedule at no extra cost.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-orange-600" />
                  Emergency Cases
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We handle emergencies (such as illness or family emergencies) with flexibility. Please contact support.
                </p>
              </div>
            </div>
          </div>
        );

      case 'fees':
        return (
          <div>
            <SectionHeader 
              icon={Users} 
              title="Service Fees" 
              subtitle="Transparency matters to us."
            />
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    Provider Fees
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Each service provider sets their own fees (e.g., doctor visits, nanny hours).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-600" />
                    Platform Fees
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    KidooHub may charge a small service fee to support platform operations (clearly shown at checkout).
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Payment Methods</h4>
                    <p className="text-gray-600 text-sm">We accept secure online payments and, in some cases, cash upon service.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Currency</h4>
                    <p className="text-gray-600 text-sm">All fees are listed in Armenian Drams (AMD), unless otherwise stated.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Refunds</h4>
                    <p className="text-gray-600 text-sm">Processed according to our Cancellation Policy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div>
            <SectionHeader 
              icon={HelpCircle} 
              title="Frequently Asked Questions" 
              subtitle="Find answers to common questions about KidooHub"
            />
            
            <div className="space-y-4">
              <FAQItem 
                question="What is KidooHub?"
                answer="KidooHub is a smart platform that connects parents with trusted family services in Armenia — from doctors and nannies to fun activities."
              />
              
              <FAQItem 
                question="Is KidooHub safe?"
                answer="Yes! Every provider is handpicked and verified before being listed."
              />
              
              <FAQItem 
                question="Do I pay KidooHub or the provider?"
                answer="In most cases, payments go through KidooHub for security. Some providers may accept direct payments — details will be shown at booking."
              />
              
              <FAQItem 
                question="Can I book directly with a provider outside KidooHub?"
                answer="We recommend booking through KidooHub for safety, verification, and support in case of issues."
              />
              
              <FAQItem 
                question="What if I'm unhappy with a service?"
                answer="Please contact us right away. We will review the case, and refunds/resolutions follow our Cancellation Policy."
              />
              
              <FAQItem 
                question="Can I join KidooHub as a provider?"
                answer="Yes! If you're a doctor, nanny, educator, or family-friendly business, contact us to become part of the KidooHub community."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Legal Documents</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default KidooHubTerms;