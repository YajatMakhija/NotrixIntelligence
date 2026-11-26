import type { Metadata } from 'next';
import { NotrixInformationPage } from '@/components/notrix/NotrixInformationPage';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Notrix Intelligence uses cookies on this website.',
};

const sections = [
  {
    title: 'How we use cookies',
    paragraphs: [
      'Cookies help us understand how visitors interact with our platform, enabling us to improve our services and ensure a safer, more efficient experience for you.',
    ],
  },
  {
    title: 'Your choices',
    paragraphs: [
      'By using our website, you consent to our use of cookies in accordance with this policy. You can manage your cookie preferences through your browser settings at any time. Please note that disabling cookies may affect some functionalities of our platform, and certain features might not work as intended.',
    ],
  },
];

export default function CookiesPage() {
  return (
    <NotrixInformationPage
      eyebrow="Legal"
      title="Cookie Policy"
      introduction="At Notrix Intelligence, we use cookies to remember preferences and analyze website traffic."
      sections={sections}
    />
  );
}
