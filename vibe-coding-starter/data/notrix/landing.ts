export const notrixAppLoginUrl =
  'https://app-staging.notrixintelligence.com/login';

export const notrixNavItems = [
  { label: 'Product', href: '/product' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Docs', href: '/docs' },
  { label: 'Security', href: '/security' },
] as const;

export const notrixConversationExamples = [
  {
    id: 'northstar-renewal',
    question: {
      avatar: '/static/images/people/5.webp',
      sender: 'Owen',
      channel: '#sales',
      time: '11:06 AM',
      text: 'Where are Northstar’s renewal terms?',
    },
    answer: {
      text: 'You’ll find them in Section 8 of the signed customer agreement.',
    },
    source: {
      title: 'Northstar agreement',
      section: 'Section 8 — Renewal terms',
    },
  },
  {
    id: 'acme-pricing',
    question: {
      avatar: '/static/images/people/1.webp',
      sender: 'Brett',
      channel: '#sales',
      time: '9:41 AM',
      text: 'What price did we quote Acme for the annual plan?',
    },
    answer: {
      text: 'The approved annual price is $82,000, including priority support.',
    },
    source: {
      title: 'Approved agreement',
      section: 'March 10 — Commercial terms',
    },
  },
  {
    id: 'atlas-launch',
    question: {
      avatar: '/static/images/people/3.webp',
      sender: 'Maya',
      channel: '#product',
      time: '10:12 AM',
      text: 'When is the Atlas launch review?',
    },
    answer: {
      text: 'The launch review is scheduled for Friday at 2:00 PM.',
    },
    source: {
      title: 'Atlas launch plan',
      section: 'Milestones — Final review',
    },
  },
] as const;

const firstExample = notrixConversationExamples[0];

export const notrixConversations = [
  {
    avatar: firstExample.question.avatar,
    sender: firstExample.question.sender,
    channel: firstExample.question.channel,
    time: firstExample.question.time,
    before: 'Where are Northstar’s ',
    emphasis: 'renewal terms',
    after: '?',
  },
  {
    avatar: '/static/images/notrix-logo.png',
    sender: 'Notrix',
    channel: 'APP',
    time: '11:06 AM',
    before: 'You’ll find them in ',
    emphasis: 'Section 8',
    after: ' of the signed customer agreement.',
  },
  {
    avatar: '/static/images/notrix-logo.png',
    sender: 'Source',
    channel: 'Northstar agreement',
    time: '',
    before: 'Section 8 — ',
    emphasis: 'Renewal terms',
    after: '',
  },
] as const;
