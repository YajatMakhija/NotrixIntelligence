import type { Metadata } from 'next';
import { NotrixInformationPage } from '@/components/notrix/NotrixInformationPage';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms governing access to the Notrix website and service.',
};

const sections = [
  {
    title: 'Service scope',
    paragraphs: [
      'These terms govern access to the Notrix website and service. Pilot scope, deployment responsibilities, service levels, security requirements, pricing, and support commitments are defined in the applicable order form or pilot agreement. If that agreement conflicts with these terms, the signed agreement controls.',
    ],
  },
  {
    title: 'Accounts and customer responsibilities',
    bullets: [
      'Provide accurate account information and protect credentials.',
      'Authorize only users who are permitted to access the connected company knowledge.',
      'Maintain the rights and permissions required for every connected source.',
      'Configure customer-controlled cloud, identity, and retention settings assigned to the customer.',
    ],
  },
  {
    title: 'Acceptable use',
    paragraphs: [
      'You may not use Notrix to break the law, violate another person’s rights, bypass access controls, distribute malicious code, interfere with the service, probe systems without authorization, or generate content intended to cause harm. We may suspend access needed to protect customers, Notrix, or the public.',
    ],
  },
  {
    title: 'Fees and payment',
    paragraphs: [
      'Fees, taxes, billing dates, usage limits, and payment terms are stated in the applicable order form. Unless that agreement says otherwise, fees paid for a completed billing period are non-refundable.',
    ],
  },
  {
    title: 'Ownership and confidentiality',
    paragraphs: [
      'Customers retain ownership of their data and connected content. Notrix retains ownership of its software, documentation, and service technology. Each party must protect the other party’s confidential information and use it only to perform the agreement.',
    ],
  },
  {
    title: 'Termination and deletion',
    paragraphs: [
      'Either party may terminate as described in the applicable agreement. Access ends when termination takes effect. Data export, disconnection, deletion, transition assistance, and surviving payment obligations follow the signed agreement and applicable law.',
    ],
  },
  {
    title: 'Service changes and warranties',
    paragraphs: [
      'Notrix may improve or change the service while preserving material contracted commitments. Preview and pilot features may change. Except for express warranties in a signed agreement, the service is provided to the extent permitted by law without implied warranties. Liability limits and governing law are set in the signed agreement.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'Questions about these terms can be sent to legal@notrix.ai. We may update these terms for future use of the website or service and will post the revised date on this page.',
    ],
  },
];

export default function TermsPage() {
  return (
    <NotrixInformationPage
      eyebrow="Terms"
      title="Terms of service"
      introduction="These launch terms provide a clear baseline. Commercial pilots and paid deployments should also use a signed order form covering the exact service and responsibilities."
      sections={sections}
    />
  );
}
