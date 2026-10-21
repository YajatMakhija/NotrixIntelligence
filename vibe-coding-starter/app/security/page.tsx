import type { Metadata } from 'next';
import { NotrixInformationPage } from '@/components/notrix/NotrixInformationPage';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'How Notrix handles company knowledge, access, and customer control.',
};

const sections = [
  {
    title: 'Deployment model',
    paragraphs: [
      'Notrix is designed for customer-controlled cloud deployment. The exact architecture, cloud account, region, network boundaries, and operational responsibilities are documented before a pilot begins.',
    ],
  },
  {
    title: 'Data storage and processing',
    paragraphs: [
      'Connected company knowledge remains in the storage locations agreed for the deployment. Notrix processes only the information needed to retrieve sources and produce an answer. Customer data is not used to train shared models.',
    ],
  },
  {
    title: 'Identity and permissions',
    paragraphs: [
      'Workspace access is tied to approved identities. Source permissions and deployment policy determine which material a user may retrieve. Administrators control connected sources and user access.',
    ],
  },
  {
    title: 'Notrix access',
    paragraphs: [
      'Notrix personnel do not receive routine access to customer knowledge. Any temporary support access must be authorized, limited to the required purpose, and removed when the work is complete.',
    ],
  },
  {
    title: 'External providers',
    paragraphs: [
      'Cloud, model, monitoring, and support providers vary by deployment. Providers that may process customer information are identified during security review and documented in the applicable agreement.',
    ],
  },
  {
    title: 'Retention and deletion',
    paragraphs: [
      'Retention follows the agreed deployment configuration. At the end of a pilot or service term, customer-controlled resources can be disconnected and Notrix-held service data is deleted according to the written agreement, subject to legal obligations and documented backups.',
    ],
  },
];

export default function SecurityPage() {
  return (
    <NotrixInformationPage
      eyebrow="Security"
      title="Your data. Your environment. Your control."
      introduction="Security details should be concrete before your team connects a source. This page describes the launch model; each pilot receives deployment-specific documentation."
      sections={sections}
    />
  );
}
