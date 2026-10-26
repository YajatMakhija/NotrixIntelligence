import type { Metadata } from 'next';
import { NotrixInformationPage } from '@/components/notrix/NotrixInformationPage';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'How Notrix collects, uses, retains, and protects personal information.',
};

const sections = [
  {
    title: 'Information we collect',
    bullets: [
      'Demo requests: name, work email, company, and any problem description you choose to provide.',
      'Service accounts: identity, organization, role, authentication events, and administrator settings.',
      'Technical data: device, browser, IP address, request logs, and website usage data when analytics are enabled.',
      'Support communications: messages and files you choose to send to Notrix.',
    ],
  },
  {
    title: 'How we use information',
    bullets: [
      'Respond to demo requests and provide pilots or contracted services.',
      'Operate, secure, troubleshoot, and improve the website and service.',
      'Administer accounts, enforce agreements, and meet legal obligations.',
      'Communicate material product, security, or policy updates.',
    ],
  },
  {
    title: 'Providers and disclosures',
    paragraphs: [
      'We may use hosting, analytics, communications, security, and customer-support providers. Service providers may process information only for the contracted purpose. Customer-deployment providers and model services are disclosed during the applicable pilot or security review.',
      'We may disclose information when required by law, to protect the service and its users, or as part of a corporate transaction. We do not sell personal information.',
    ],
  },
  {
    title: 'Retention',
    paragraphs: [
      'Demo and business-contact information is retained while we evaluate or maintain a business relationship. Account, security, and support records are retained for the service term and for a reasonable period afterward when needed for security, contractual, or legal purposes.',
    ],
  },
  {
    title: 'Your choices and contact',
    paragraphs: [
      'You may request access, correction, or deletion of personal information, subject to applicable law and contractual obligations. Contact privacy@notrix.ai. We may need to verify your identity before completing a request.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <NotrixInformationPage
      eyebrow="Privacy"
      title="Privacy at Notrix"
      introduction="This notice explains how Notrix Intelligence handles personal information on its website, during pilots, and when providing the service."
      sections={sections}
    />
  );
}
