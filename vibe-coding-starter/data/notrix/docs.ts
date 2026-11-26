// Notrix documentation content, written from what the product does today (companybrain repo: dashboard
// sections, connector setup text, install templates, D-049/D-050/D-053). Anything not built is either
// left out or stated as a limitation. Keep old slugs: they are live links.

import { notrixCalendlyUrl } from '@/data/notrix/landing';

export type NotrixDocSection = {
  title: string;
  paragraphs?: string[];
  steps?: string[];
  bullets?: string[];
  /** Bullets that open with a bold phrase. */
  points?: { title: string; text: string }[];
  /** A paragraph after the lists. */
  closing?: string;
  /** Example questions grouped by role, shown as tabs. */
  tabs?: { label: string; asks: string[]; see?: string }[];
  note?: string;
  /** A button link after the section, such as Book a call. */
  action?: { label: string; href: string };
  callout?: { tone: 'caution' | 'tip'; title: string; text: string };
};

export type NotrixDocPage = {
  slug: string;
  title: string;
  intro: string;
  sections: NotrixDocSection[];
};

export type NotrixDocGroup = {
  title: string;
  icon: 'start' | 'concepts' | 'using' | 'connectors' | 'security' | 'admin';
  pages: NotrixDocPage[];
};

const connectorPage = (
  slug: string,
  title: string,
  intro: string,
  steps: string[],
  reads: string[],
  limits: string[],
  extra: NotrixDocSection[] = [],
): NotrixDocPage => ({
  slug,
  title,
  intro,
  sections: [
    { title: 'Set it up', steps },
    { title: 'What Notrix reads', bullets: reads },
    ...extra,
    { title: 'Limits', bullets: limits },
  ],
});

export const notrixDocGroups: NotrixDocGroup[] = [
  {
    title: 'Getting started',
    icon: 'start',
    pages: [
      {
        slug: 'introduction',
        title: 'What is Notrix?',
        intro:
          'Notrix is a company brain that runs in your own AWS account. It connects to the tools your team already works in, reads what is there, and answers questions in Slack and on the web with the exact sources behind every answer. It also remembers the decisions, commitments and facts your team approves, so what was agreed doesn’t disappear when a thread scrolls away or someone leaves. Finding an answer is one thing Notrix does well, but it is only one of many.',
        sections: [
          {
            title: 'What Notrix does',
            paragraphs: [
              'Company knowledge is spread across documents, tickets, wikis and Slack threads, and the person who knows the answer is usually busy. Notrix brings it together in one place you own, and keeps it current. Use it to:',
            ],
            points: [
              {
                title: 'Connect the tools you already use.',
                text: 'Choose Slack channels, upload files and notes, and connect Google Drive, Notion, Confluence, Jira, SharePoint and OneDrive, Linear and GitHub. Access is read-only, and the keys go straight into Secrets Manager in your AWS account.',
              },
              {
                title: 'Get answers you can check.',
                text: 'Ask in plain language on the Agent page or in Slack. Every company fact in an answer cites the passage it came from, with where and when that source is from. If Notrix finds no usable evidence, it says so instead of guessing.',
              },
              {
                title: 'See when sources disagree.',
                text: 'When two sources give a different date, number, owner or status, the answer shows both, newest first, so you see what changed instead of getting one silently picked.',
              },
              {
                title: 'Remember what your team decides.',
                text: 'Notrix proposes decisions, commitments and facts from Slack, Jira, Linear and GitHub, each quoting the text it came from. A person approves every memory, and nothing is overwritten: each change is a new revision with its history kept.',
              },
              {
                title: 'Keep knowledge healthy.',
                text: 'Conflicting memories, memories whose source changed, answers marked wrong and questions nobody could answer all land in one list, so an owner can fix the cause instead of the symptom.',
              },
              {
                title: 'Work where your team already is.',
                text: 'Notrix answers in Slack direct messages and threads, can offer answers in channels on its own with chime-in, sends scheduled reports, and gives AI tools like Claude Desktop or Cursor read-only access to your company knowledge through MCP.',
              },
            ],
            closing:
              'Think of Notrix as a colleague who has read every source you shared with it, remembers what the team agreed, and always shows where an answer came from.',
          },
          {
            title: 'Why it runs in your account',
            paragraphs: [
              'Most AI tools copy your company’s knowledge into the vendor’s cloud. Notrix does the opposite: it installs as a private application inside your own AWS account, and your knowledge stays there.',
            ],
            points: [
              {
                title: 'Your content stays with you.',
                text: 'Files, Slack messages, the search index, memories and answers are stored in your account, and the AI runs on Amazon Bedrock in that same account. Files, database and secrets are encrypted with a key in your account, and the database has no public access.',
              },
              {
                title: 'Notrix keeps almost nothing.',
                text: 'Notrix itself holds your sign-in, your workspace record and the status of your installation. Nothing from your sources is stored on Notrix’s side.',
              },
              {
                title: 'You stay in control.',
                text: 'You install Notrix by reviewing and creating two CloudFormation stacks in your own AWS console. No access keys are created or shared, the connection role can only check the installation and apply updates you approve, and you can delete it at any time.',
              },
              {
                title: 'You pay AWS directly.',
                text: 'What Notrix uses in your account is billed to your AWS account, like any other workload you run there, so you can see and limit every cost.',
              },
              {
                title: 'Security reviews get simpler.',
                text: 'Because your company content is never held by a third party, your security and legal teams review an application in your own cloud, not another place your data lives.',
              },
            ],
          },
          {
            title: 'How Notrix can help you',
            paragraphs: [
              'Reach for Notrix when the answer depends on what your company knows, decided or wrote down. For example:',
            ],
            bullets: [
              'Catch up on a project or customer: what changed this week, what was decided and who decided it.',
              'Stop answering the same question twice. Let Notrix answer recurring questions in Slack with sources, instead of the same person every time.',
              'Onboard a new teammate with the policies, decisions and owners they should know first.',
              'Check whether something is still true before you share it, from the date and source of each passage.',
              'Find where a decision was made, with the Slack thread or ticket it came from.',
              'Get the same question answered on a schedule, such as “What changed in pricing this week?”.',
              'Give Claude, Cursor or another AI tool your company context, read-only.',
            ],
            closing:
              'If you only use Notrix to look up a file, you are using a small part of what it can do. Start with the work you need to finish, then ask Notrix to help you get there.',
            callout: {
              tone: 'caution',
              title: 'Notrix supports decisions; it doesn’t make them',
              text: 'Answers are written by AI from the cited passages. Open the source before you rely on an answer for an important decision, and don’t use Notrix to make decisions about people, such as hiring, promotion or performance.',
            },
          },
          {
            title: 'What can I use Notrix for in my role?',
            paragraphs: [
              'Give Notrix a task from your own job. Pick your role and try one of these first questions. Replace the parts in brackets with a real customer, project or system. Notrix answers from the sources your workspace has connected, so answers differ from company to company.',
            ],
            tabs: [
              {
                label: 'Founders and leaders',
                asks: [
                  '“What did we decide about [pricing] last month, and who made the call?”',
                  '“What have we promised [customer], and where was it agreed?”',
                  '“Summarise what changed on [project] this week and list the open questions.”',
                ],
                see: 'See Memory: learn and update and Weekly reports.',
              },
              {
                label: 'Engineering',
                asks: [
                  '“What is the status of [ATL-12], and who owns it?”',
                  '“Why did we choose [Postgres] for [service]? Show me where it was discussed.”',
                  '“Has anyone hit [error message] before, and how was it fixed?”',
                ],
                see: 'See Asking questions, Jira and GitHub.',
              },
              {
                label: 'Product',
                asks: [
                  '“What have customers said about [feature] in [#feedback]?”',
                  '“What did we decide about the scope of [project], and what is still open?”',
                  '“Draft release notes for [feature] from the Linear issues.”',
                ],
                see: 'See Slack and Linear.',
              },
              {
                label: 'Sales',
                asks: [
                  '“What did we agree with [customer] on pricing, and where is it written down?”',
                  '“Which features has [customer] asked for?”',
                  '“Draft a follow-up email to [customer] from the notes of our last call.”',
                ],
                see: 'See Files and notes and Asking questions.',
              },
              {
                label: 'Support',
                asks: [
                  '“A customer sees [error message] after [upgrading]. How did we fix it last time?”',
                  '“What is our refund policy for [plan]?”',
                  '“Draft a step-by-step reply the customer can follow.”',
                ],
                see: 'Check the citations before you send an answer to a customer. See Reading an answer under Asking questions.',
              },
              {
                label: 'Operations and HR',
                asks: [
                  '“What is the process for [onboarding a new vendor], and who approves each step?”',
                  '“What is our [parental leave] policy, and when was it last updated?”',
                  '“Draft a first-week plan for a new [role] from our onboarding documents.”',
                ],
                see: 'See Files and notes and People and permissions.',
              },
            ],
            callout: {
              tone: 'tip',
              title: 'Where to start',
              text: 'Owners and administrators who install Notrix and connect tools: start with Quickstart. Everyone else, who mostly asks questions: start with Asking questions and Slack. Security reviewers: start with Trust and security.',
            },
          },
        ],
      },
      {
        slug: 'setup',
        title: 'Quickstart',
        intro:
          'Notrix installs inside your own AWS account in two steps you review and approve yourself. After that you add your knowledge, invite your team and ask your first question. This page walks through the whole path, from sign-up to the first cited answer. The workspace owner does most of it once. Plan for about an hour, most of it waiting for AWS.',
        sections: [
          {
            title: 'Before you begin',
            paragraphs: [
              'Three things decide whether the install goes through the first time. Before you install explains each one.',
            ],
            points: [
              {
                title: 'An AWS account you administer.',
                text: 'Your company’s account, signed in as someone who can create CloudFormation stacks and IAM roles. A separate account just for Notrix is best.',
              },
              {
                title: 'The US East (N. Virginia) region, us-east-1.',
                text: 'Notrix installs there today, and the install refuses other regions.',
              },
              {
                title: 'Amazon Bedrock model access.',
                text: 'Amazon Titan Text Embeddings V2 and Amazon Nova Lite must be usable in that account and region.',
              },
            ],
          },
          {
            title: '1. Create your workspace',
            steps: [
              'Go to app.notrix.si and sign up with Continue with Google, or with your work email and a six-digit code we email you.',
              'Add your company details. Your workspace is created with you as its owner.',
            ],
          },
          {
            title: '2. Connect your AWS account',
            steps: [
              'In Notrix, open Installation and enter your 12-digit AWS account ID. The region is us-east-1.',
              'Choose Continue, then Open AWS console. The review link opens the connection stack with everything filled in. It expires after one hour.',
              'Check that you are signed in to the right AWS account, then create the stack.',
              'Back in Notrix, choose Verify connection.',
            ],
            closing:
              'The connection stack creates one IAM role for Notrix. It lets Notrix read the status of the Notrix stack and apply application updates you approve in the dashboard. It cannot read your data or change IAM, networking or data stores, and no AWS access keys are created or shared. If you open the link while signed in to a different account, the stack stops with a message before anything is created.',
          },
          {
            title: '3. Install Notrix',
            steps: [
              'On Installation, prepare the install. Notrix builds a review link for the application stack.',
              'Open it in the AWS console, look through the resources it will create, and create the stack.',
              'Wait while CloudFormation builds it, usually about 15 minutes. Notrix shows the progress.',
              'When Installation shows “Installed and healthy”, the rest of the dashboard unlocks.',
            ],
            note:
              'If the stack fails, open it in the AWS console and read the first failed event. Install in your AWS account explains the usual causes and how to retry.',
          },
          {
            title: 'What gets installed',
            paragraphs: [
              'The application stack creates a private Notrix installation in your account. Nothing is created until you approve the stack, and every resource belongs to that one stack, so you can see each of them under Resources in the CloudFormation console. The Resources tab under Installation in Notrix shows the same list.',
            ],
            points: [
              {
                title: 'Application.',
                text: 'Amazon ECS on Fargate runs the Notrix app, a worker for questions and a bulk worker for large syncs. Amazon SQS queues the work, EventBridge Scheduler runs the daily memory review and Slack check, and a small AWS Lambda function runs the one-time database setup. There are no servers for you to manage.',
              },
              {
                title: 'Data and storage.',
                text: 'Amazon RDS for PostgreSQL holds your sources, extracted text, search index, memories and audit records, with no public access. Amazon S3 keeps the original files in a private bucket with public access blocked.',
              },
              {
                title: 'AI models.',
                text: 'Amazon Bedrock creates the search index and writes answers and memory suggestions, inside your own account.',
              },
              {
                title: 'Network.',
                text: 'A private Amazon VPC, one encrypted entry point through Amazon API Gateway, an internal load balancer, and AWS WAF in front of the app.',
              },
              {
                title: 'Security and operations.',
                text: 'An AWS KMS key in your account encrypts files and queued work. AWS Secrets Manager holds the database password, the Slack token and connector keys. Amazon CloudWatch keeps logs and alarms, and IAM roles give each part only the access it needs.',
              },
            ],
            closing:
              'All of it is billed to your AWS account. The database starts at the smallest data size and grows only when an owner approves a larger one, with the price shown first.',
          },
          {
            title: '4. Add your knowledge',
            steps: [
              'Upload files or write notes under Knowledge.',
              'Connect tools such as Google Drive, Notion, Confluence or Jira under Integrations. Each Connectors page shows how to create the read-only key.',
              'Connect Slack and choose the channels Notrix may read. Connect Slack explains how to prepare your Slack workspace.',
            ],
          },
          {
            title: '5. Invite your team and ask',
            steps: [
              'Share the sources and channels your team should use. Nothing is shared by default.',
              'Invite people under Settings → People.',
              'Ask your first question on the Agent page, or mention Notrix in Slack. Open a citation to see the passage behind the answer.',
            ],
          },
          {
            title: 'Prefer a guided start?',
            paragraphs: [
              'Book a 30-minute call and we will install Notrix with you: we connect your AWS account together, check Bedrock access, watch the stack finish and connect your first sources. Bring someone who can sign in to your AWS account as an administrator.',
              'Pilots usually start with one team, one set of questions and a success measure agreed up front.',
            ],
            action: { label: 'Book a call', href: notrixCalendlyUrl },
          },
        ],
      },
      {
        slug: 'prerequisites',
        title: 'Before you install',
        intro:
          'Check these before you start the install. Most failed installs come from missing Bedrock model access or the wrong region, and both take a few minutes to fix up front.',
        sections: [
          {
            title: 'An AWS account for Notrix',
            bullets: [
              'Your company’s own AWS account, not a personal one shared with other projects. A separate account just for Notrix is best: it keeps billing, access and clean-up simple.',
              'Someone who can sign in to it and create CloudFormation stacks and IAM roles, for example an administrator. You create both stacks yourself in the AWS console.',
              'No access keys. Notrix never asks for AWS keys or passwords.',
            ],
          },
          {
            title: 'Region: US East (N. Virginia), us-east-1',
            paragraphs: [
              'Notrix installs in us-east-1 today. The models it uses are available there, and it is the region we have tested end to end. The install refuses any other region. More regions will be offered once they are verified.',
              'The review links Notrix gives you already open in us-east-1. When you check Bedrock or look at the stack yourself, choose US East (N. Virginia) in the region menu at the top right of the AWS console. A stack or model you look at in another region does not count.',
            ],
          },
          {
            title: 'Amazon Bedrock model access',
            paragraphs: [
              'Notrix uses Amazon Bedrock in your own account, so your text never goes to a model outside it. It needs two models:',
            ],
            points: [
              {
                title: 'Amazon Titan Text Embeddings V2.',
                text: 'Turns your files and messages into the search index Notrix uses to find the right passages.',
              },
              {
                title: 'Amazon Nova Lite.',
                text: 'Writes the cited answers, reports and memory suggestions.',
              },
            ],
          },
          {
            title: 'Check model access',
            steps: [
              'Sign in to the AWS account you will install in and open Amazon Bedrock in us-east-1.',
              'Open Model access and check that both models are available. If either is not, request access and wait until it shows as granted.',
              'Optional: in the Bedrock playground, send one short message to Nova Lite to confirm it answers.',
            ],
            note:
              'A new AWS account sometimes answers “Operation not allowed” even with access granted. If that happens, open a free AWS Support case and ask for Bedrock to be enabled before you install. If answers later fail with “not authorized”, check Model access first.',
          },
          {
            title: 'Bedrock limits for larger teams',
            paragraphs: [
              'New AWS accounts start with low Bedrock limits. For a small team that is enough. If many people will ask questions at once, or you will connect a lot of data, ask for higher limits for Nova Lite and Titan Text Embeddings in Service Quotas before you roll out. Your installation sends an alert when the model is throttling calls.',
              'Want a different answer model? After the install, an owner can switch answers to your own Anthropic or OpenAI key under Installation. The key is stored in Secrets Manager in your account, and the search index stays on Bedrock.',
            ],
          },
          {
            title: 'Other things to have ready',
            bullets: [
              'An email address for alarms from your installation (failed work, stuck queue, errors, low database storage, AI throttling). AWS sends a confirmation email to it first: confirm it, or the alarms are not delivered.',
              'Admin rights in Slack, if you want Notrix in Slack.',
              'For each tool you will connect, an account that can create a read-only key. See the Connectors pages.',
              'About an hour, most of it waiting for AWS. The install itself takes about 15 minutes.',
            ],
          },
          {
            title: 'What it costs to run',
            paragraphs: [
              'You pay AWS directly for what runs in your account, on your own AWS bill. The amount depends on your usage: how much data you connect, how many questions your team asks, how much Notrix learns, and the data size you choose. AI calls are pay-per-use, on Bedrock or on your own model key. You can follow the cost any time in AWS Billing, and the price of a bigger data size is shown before you approve it.',
            ],
            callout: {
              tone: 'tip',
              title: 'Ready to install?',
              text: 'Go to Quickstart and start with step 1. If you would rather do it together, book a call from the Quickstart page.',
            },
          },
        ],
      },
      {
        slug: 'install',
        title: 'Install in your AWS account',
        intro:
          'The install is two CloudFormation stacks you review and create yourself: a connection role, then the Notrix application. Notrix never asks for AWS keys.',
        sections: [
          {
            title: '1. Connect your AWS account',
            steps: [
              'In Notrix, open Installation and enter your 12-digit AWS account ID and the region.',
              'Choose Continue, then Open AWS console. The link opens the connection stack, ready to review. It expires after one hour.',
              'Create the stack in the AWS console.',
              'Back in Notrix, choose Verify connection.',
            ],
            paragraphs: [
              'The connection stack creates a role that lets Notrix read the status of the Notrix stack and apply application updates you approve. It cannot read your data or change IAM, networking or data stores. You can delete it at any time.',
            ],
          },
          {
            title: '2. Install the application',
            steps: [
              'On Installation, prepare the install. Notrix builds a review link for the application stack.',
              'Open it, review the stack in the AWS console and create it.',
              'Wait while CloudFormation creates it, usually about 15 minutes. Notrix shows the progress.',
              'When the stack is healthy, Installation shows “Installed and healthy” and the rest of the dashboard unlocks.',
            ],
          },
          {
            title: 'If the install fails',
            paragraphs: [
              'Open the stack in the AWS console and read its first failed event. The usual causes are missing Bedrock model access or a service quota in a new account.',
              'If the stack shows ROLLBACK_COMPLETE, the first install never finished and holds no data. Delete it, wait until it disappears, then choose “The stack failed and I deleted it. Prepare a retry”.',
            ],
            note:
              'Never delete a stack that finished installing (CREATE_COMPLETE or UPDATE_COMPLETE). That deletes your Notrix data. To leave Notrix, use the steps in Leaving Notrix.',
          },
          {
            title: 'Wrong account or region?',
            paragraphs: [
              'Before the install finishes you can start over from Installation. If you already created a Notrix stack in the wrong place, delete it in that AWS account yourself; Notrix cannot remove it.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Using Notrix',
    icon: 'using',
    pages: [
      {
        slug: 'asking-questions',
        title: 'Asking questions',
        intro:
          'Ask the way you would ask a colleague, on the Agent page or in Slack. Every answer shows the sources it came from.',
        sections: [
          {
            title: 'On the web',
            paragraphs: [
              'Owners use the Agent page; readers use the read page they reach from their invite. Type your question, press Enter to send and Shift + Enter for a new line.',
              'Each question is answered on its own from your current sources. Earlier messages in the conversation are not used as context yet, so include the names that matter in every question.',
            ],
          },
          {
            title: 'In Slack',
            paragraphs: [
              'Send Notrix a direct message, or mention @Notrix in a channel. A DM is answered in the DM; a mention is answered in a thread on your message. In Slack, Notrix also reads the last few messages of the conversation, so follow-ups like “when is it?” work. See Connect Slack for setup and Using Notrix in Slack for account linking.',
            ],
          },
          {
            title: 'Not only company questions',
            paragraphs: [
              'Notrix is also a general assistant that knows your company. Ask it to draft a message or rewrite text, and it will. Company facts in an answer always come from cited sources; general help has no citations.',
            ],
          },
          {
            title: 'Write a good question',
            bullets: [
              'Ask one clear question at a time.',
              'Name the customer, project, policy or document you mean.',
              'Include issue keys like ATL-12 if you have them. Notrix follows them to the issue.',
              'Open the cited source when the decision matters.',
            ],
          },
          {
            title: 'Reading an answer',
            bullets: [
              'Numbered citations point to the exact passages used. Open one to see the source.',
              'Each source says where and when it is from, for example “from Jira, last edited there 11 Nov”.',
              'When two sources disagree on a date, number, owner or status, the answer gives both, newest first.',
              'For Jira, Linear, GitHub, Zendesk, HubSpot and Salesforce, up to three items an answer uses are re-read live from the tool and marked “read live just now”.',
              'If nothing usable is found, Notrix says so instead of guessing.',
            ],
            note: 'Answers are written by AI from the cited passages. Check the source before relying on an answer for an important decision.',
          },
          {
            title: 'Give feedback',
            paragraphs: [
              'Mark an answer wrong and it appears under Knowledge → Needs fixing with the evidence it used, so an owner can fix the cause. See Correcting knowledge.',
            ],
          },
        ],
      },
      {
        slug: 'slack',
        title: 'Using Notrix in Slack',
        intro:
          'Notrix answers in Slack, reads the channels you choose, and can offer answers in channels on its own when you turn on chime-in.',
        sections: [
          {
            title: 'Set up Slack first',
            paragraphs: [
              'An owner connects Slack and chooses the channels Notrix reads. Connect Slack covers preparing your Slack workspace, choosing channels, sharing them with readers and what Notrix can see.',
            ],
          },
          {
            title: 'What Notrix reads',
            bullets: [
              'New messages and threads in the chosen channels, within seconds.',
              'The last 90 days of history in each chosen channel, filled in over time.',
              'Conversations, not single messages: a thread or a 15-minute run of messages is read together, so “yes, Friday” is read with the question it answers.',
            ],
          },
          {
            title: 'Share channels with readers',
            paragraphs: [
              'Each chosen channel has a Share switch, off by default. Readers only get answers from channels and sources an owner has shared.',
            ],
          },
          {
            title: 'Link your Slack account',
            paragraphs: [
              'Notrix answers only people whose Slack account is linked to their Notrix account. The first time you ask, Notrix sends you a one-time link by DM. Open it while signed in to Notrix and confirm. Your Slack email must match your Notrix email, so a forwarded link does not work. A link lasts 90 days.',
            ],
          },
          {
            title: 'Asking in Slack',
            bullets: [
              'A direct message is answered in the DM.',
              'An @Notrix mention in a channel is answered in a thread on that message.',
              'A channel answer only uses content shared with readers, so everyone in the channel may see it. If only owner-only content answers the question, the answer goes to the asker privately by DM.',
              'Notrix reads the recent messages of the conversation, so follow-up questions work.',
            ],
          },
          {
            title: 'Chime-in',
            paragraphs: [
              'With chime-in on, Notrix notices questions in channels that it can answer from your sources and offers an answer without being mentioned. A small, cheap model first decides whether to reply, react or stay silent.',
            ],
            bullets: [
              'Approve mode: drafts wait under Weekly reports for a person to approve. Nothing posts without you.',
              'Auto mode: Notrix replies in the channel when it has a supported answer.',
              'Quiet hours and a daily limit keep it from being noisy.',
            ],
          },
          {
            title: 'Limits',
            bullets: [
              'Private channels are not supported. Notrix only reads public channels you choose.',
              'Slack lets apps outside its Marketplace read history slowly, about 900 messages an hour. New messages still arrive within seconds; older history fills in over time.',
              'History goes back 90 days.',
            ],
          },
          {
            title: 'Disconnect',
            paragraphs: [
              'Disconnect Slack under Integrations → Slack. The bot token is revoked and deleted, and every message Notrix stored is removed. Deselecting every channel also stops reading and removes what was stored. Uninstall the app from Slack’s own app settings too.',
            ],
          },
        ],
      },
      {
        slug: 'knowledge',
        title: 'Files and notes',
        intro:
          'Upload documents or write short notes under Knowledge → Files & notes. They are searchable as soon as they are processed.',
        sections: [
          {
            title: 'Supported files',
            bullets: [
              'PDF, up to 100 MB.',
              'Word (.docx), PowerPoint (.pptx) and Excel (.xlsx), up to 50 MB.',
              'Text (.txt, .md), up to 20 MB.',
              'Up to 100 files per batch. Add more once a batch is done.',
            ],
            note: 'Older Office formats (.doc, .ppt, .xls) are not supported: save them as .docx, .pptx or .xlsx first. Scanned PDFs and images inside documents are not read yet.',
          },
          {
            title: 'Notes',
            paragraphs: [
              'Write a note for something that lives in nobody’s document, such as a decision made on a call. It is indexed and cited like any other source, and can be saved as a memory.',
            ],
          },
          {
            title: 'Sharing with readers',
            paragraphs: [
              'Files and notes are owner-only until you choose Share on each one. Readers only get answers from shared content.',
            ],
          },
          {
            title: 'New versions',
            paragraphs: [
              'Upload a newer version of a document to replace the old one. Answers use the newest version, and memories that depended on the old one are flagged for review.',
            ],
          },
        ],
      },
      {
        slug: 'memory',
        title: 'Memory: learn and update',
        intro:
          'Besides searching your sources, Notrix remembers decisions, commitments and facts. A person approves every memory, and nothing is silently overwritten: every change is a new revision with its history kept.',
        sections: [
          {
            title: 'How memories are proposed',
            paragraphs: [
              'Notrix reads new text from sources where learning is on and proposes facts, each quoting the exact text it came from. Code checks that the quote really is in the source.',
              'Learning is on by default for Slack, Jira, Linear and GitHub. For document tools it is off by default (“Search only”), because it costs AI tokens. An owner can switch any connection to “Learning: on” under Integrations → Tools.',
            ],
          },
          {
            title: 'Approve',
            paragraphs: [
              'Proposals wait under Knowledge → To review. They are not used in answers until an owner approves them. Approval means an accountable person approved that version, not that it is still true forever.',
            ],
          },
          {
            title: 'When a fact changes',
            paragraphs: [
              'If a new fact matches an approved memory, Notrix adds it as more evidence. If it is a newer version (a changed date, owner, price or status), the newer one replaces the old, and both stay in history.',
            ],
          },
          {
            title: 'Update or withdraw',
            bullets: [
              'Update: write the up-to-date statement. Notrix uses it from now on; the previous wording stays in the memory’s history.',
              'Withdraw: the memory no longer supports answers. Its history is kept.',
              'See all approved memories under Knowledge → Memories, and decisions with their owners under About you → Decisions.',
            ],
          },
          {
            title: 'Daily budget',
            paragraphs: [
              'Learning has a daily token budget. When it is spent nothing is lost; the rest is read the next day. Search is never affected by the budget.',
            ],
          },
        ],
      },
      {
        slug: 'correcting-knowledge',
        title: 'Correcting knowledge',
        intro:
          'When an answer is wrong, fix the cause, not the answer. Feedback is a signal; it never silently rewrites a source.',
        sections: [
          {
            title: 'Find what went wrong',
            paragraphs: [
              'Answers marked wrong appear under Knowledge → Needs fixing. Each card shows exactly what the answer used.',
            ],
          },
          {
            title: 'Fix the cause',
            bullets: [
              'Outdated document: upload the newer version.',
              'Wrong memory: update it with the right statement, or withdraw it.',
              'A source that should not be used: suspend it, which stops it being searched right away and keeps the data. It can be reversed.',
              'A source that should not exist: delete it.',
            ],
            paragraphs: ['Then mark the card fixed.'],
          },
          {
            title: 'Other things to fix',
            paragraphs: [
              'Needs fixing also lists open risks and questions nobody could answer, which usually point to a missing source.',
            ],
          },
        ],
      },
      {
        slug: 'reports',
        title: 'Weekly reports',
        intro:
          'Ask a question once and get the answer on a schedule, with citations, from your current sources.',
        sections: [
          {
            title: 'Create a report',
            steps: [
              'Open Weekly reports.',
              'Write what you want to know, for example “What changed in pricing this week?”.',
              'Pick how often and when.',
            ],
          },
          {
            title: 'Read it',
            paragraphs: [
              'Each run is answered fresh from your sources at that time. Read reports on the page, or get them as a Slack message. Slack replies from chime-in in approve mode also wait here.',
            ],
          },
        ],
      },
      {
        slug: 'ai-tools',
        title: 'AI tools (MCP)',
        intro:
          'Let Claude Desktop, Cursor or another MCP client ask your company knowledge. Access is read-only.',
        sections: [
          {
            title: 'Connect a client',
            steps: [
              'Open Integrations → AI tools (MCP), name the token (for example “Claude Desktop on my laptop”) and choose Create token. Only owners can create tokens.',
              'Choose Copy configuration and paste it into your MCP client’s settings. Copy it now: the token is not shown again.',
              'Restart the client. Notrix appears as “Notrix company knowledge”.',
            ],
          },
          {
            title: 'What leaves your AWS account',
            paragraphs: [
              'The answers, passages and lists a client asks for go to that client and its AI provider. Notrix’s servers never see this traffic.',
            ],
          },
          {
            title: 'What the client can do',
            bullets: [
              'ask: answer a question from your sources, with numbered citations.',
              'search: find matching passages, without generated text.',
              'list_sources: list connected documents, notes and Slack channels.',
              'list_memories: list approved memory, newest first.',
            ],
            note: 'Treat the token like a password. Anyone with it can read your company knowledge. Revoke it from the same page if it leaks.',
          },
        ],
      },
    ],
  },
  {
    title: 'Connectors',
    icon: 'connectors',
    pages: [
      {
        slug: 'connect-slack',
        title: 'Connect Slack',
        intro:
          'Connect your Slack workspace so Notrix can learn from the public channels you choose and answer your team’s questions right where they work. This page covers what to prepare in Slack, how to connect it, how to choose and organise channels, and what Notrix can and cannot see. A workspace owner sets it up once, in about ten minutes.',
        sections: [
          {
            title: 'Before you connect',
            points: [
              {
                title: 'Notrix is installed.',
                text: 'Slack messages are stored in your own AWS account, so Installation must show “Installed and healthy” first. See Quickstart.',
              },
              {
                title: 'You are a Notrix owner.',
                text: 'Only owners can connect Slack, choose channels and decide what readers can see.',
              },
              {
                title: 'You can add apps to Slack.',
                text: 'You need to be a Slack admin, or your Slack workspace must allow members to add apps. If your workspace requires app approval, Slack sends your request to an admin, and you continue once they approve it.',
              },
              {
                title: 'One Slack workspace per Notrix workspace.',
                text: 'A Slack workspace can be connected to one Notrix workspace at a time. On Slack Enterprise Grid, connect one workspace; installing across the whole organisation is not supported yet.',
              },
            ],
          },
          {
            title: 'Prepare your Slack workspace',
            paragraphs: [
              'Notrix reads public channels only, and only the ones you choose. A little preparation in Slack makes its answers much better and keeps sensitive conversations out of it.',
            ],
            bullets: [
              'Keep work knowledge in public channels. Decisions, project updates, customer notes and how-to answers that your team should be able to find belong in public channels Notrix can read.',
              'Keep sensitive conversations in private channels. Notrix has no permission to read private channels or people’s direct messages to each other, so anything there stays out of it.',
              'Name channels by team, project or customer, for example #eng-platform, #proj-atlas or #cust-acme. Clear names make channels easy to choose, and Notrix uses them to suggest which to read.',
              'Answer in threads. Notrix reads a thread, or a 15-minute run of messages, as one conversation, so a reply like “yes, Friday” stays connected to the question it answers.',
              'Write decisions plainly, for example “Decision: we launch Atlas on 3 March, owner Priya.” Notrix proposes decisions, commitments and facts from Slack as memories for an owner to approve, and clear wording makes them easier to spot.',
              'Tell your team. Post a short note in #general saying which channels Notrix reads, that it never reads private channels or DMs between people, and how to ask it a question.',
            ],
          },
          {
            title: 'Suggested channel layout',
            paragraphs: [
              'Most companies already have these kinds of channels. The first time you choose channels, Notrix ticks the work channels for you and leaves social and possibly sensitive ones off, based on their names.',
            ],
            points: [
              {
                title: 'Team channels: read.',
                text: '#engineering, #product, #sales, #support. Where everyday questions are asked and decisions are made.',
              },
              {
                title: 'Project and customer channels: read.',
                text: '#proj-atlas, #launch-q3, #cust-acme. The history of what was agreed, who owns it and what changed.',
              },
              {
                title: 'Help and question channels: read.',
                text: '#help-it, #ask-ops, #ask-notrix. Recurring questions with their answers. A good place to try chime-in later.',
              },
              {
                title: 'Announcements: read.',
                text: '#general, #announcements. Company-wide news, policies and changes.',
              },
              {
                title: 'Social channels: left off.',
                text: '#random, #fun, #pets, #lunch and similar. Chatter that adds noise to answers.',
              },
              {
                title: 'Sensitive channels: left off.',
                text: 'Channels named like #hr, #legal, #finance, #payroll, #hiring, #leadership or #security are marked “may be sensitive”. Leave them off, or better, make them private in Slack.',
              },
            ],
            callout: {
              tone: 'tip',
              title: 'Create an #ask-notrix channel',
              text: 'A public channel where anyone can @mention Notrix gives your team one obvious place to start, and lets others see the answers and their sources.',
            },
          },
          {
            title: '1. Connect your Slack workspace',
            steps: [
              'In Notrix, open Integrations → Slack and choose Connect Slack.',
              'Slack opens and shows the permissions Notrix asks for. Check that the Slack workspace at the top right is the right one, then choose Allow.',
              'You return to Notrix, and the Slack card shows Connected with your workspace name.',
            ],
            closing:
              'The Slack bot token goes straight to your installation and is stored in Secrets Manager in your AWS account. Notrix itself keeps only which Slack workspace belongs to which installation.',
          },
          {
            title: '2. Choose the channels Notrix reads',
            steps: [
              'Notrix lists every public channel with its member count, busiest first. Work channels are already ticked; social and possibly sensitive ones are not.',
              'Change the selection, or use Select all public channels. The summary line shows how many channels and people that covers.',
              'Choose Save channel selection. Notrix joins the chosen channels itself, so you do not need to invite it.',
            ],
            closing:
              'New messages, edits and deletions arrive within seconds. The last 90 days of history in each channel is read in the background, and the Engine panel under Installation shows the progress.',
          },
          {
            title: '3. Share channels with your team',
            paragraphs: [
              'A chosen channel is visible to owners only at first. Next to each chosen channel, choose Share with readers to let readers get answers from it. You can unshare it at any time, and the change applies right away.',
              'Share a channel when everyone in your Notrix workspace may see what is said there. An @Notrix answer in a channel only uses shared content, because everyone in that channel can read it.',
            ],
          },
          {
            title: '4. Let your team ask in Slack',
            steps: [
              'Invite your team to Notrix under Settings → People, with the email they use in Slack.',
              'Each person sends Notrix a direct message, or writes @Notrix in a channel.',
              'The first time, Notrix replies privately with a link. They open it while signed in to Notrix and confirm. Their Slack and Notrix emails must match, so a forwarded link does not work.',
            ],
            closing:
              'Once linked, a direct message is answered in the DM, and an @Notrix question in a channel is answered in a thread. If only content that is not shared answers it, the answer goes to the asker privately. A link lasts 90 days. See Using Notrix in Slack for asking, shortcuts and chime-in.',
          },
          {
            title: 'What Notrix can and cannot see',
            paragraphs: [
              'These are the permissions Slack shows when you choose Allow, grouped by what they are for.',
            ],
            points: [
              {
                title: 'Channels.',
                text: 'channels:read, channels:join and channels:history: list your public channels, join the ones you choose, and read their messages.',
              },
              {
                title: 'Questions.',
                text: 'app_mentions:read, im:history and im:write: see when someone writes @Notrix, and read and answer direct messages sent to Notrix.',
              },
              {
                title: 'Replies.',
                text: 'chat:write, plus reactions:write and assistant:write where enabled: post answers, add a short reaction, and show that Notrix is working on an answer.',
              },
              {
                title: 'People.',
                text: 'users:read and users:read.email: match a Slack account to the Notrix account with the same email, so Notrix answers only linked people.',
              },
              {
                title: 'Shortcuts.',
                text: 'commands: the Learn this thread and This changed message shortcuts.',
              },
            ],
            closing:
              'Notrix has no permission for private channels, group messages, people’s direct messages to each other, or files shared in Slack. Messages are stored and searched only in your AWS account; Slack’s notifications pass through Notrix on their way there, and Notrix keeps none of their content. Notrix never uses your messages to train AI models.',
          },
          {
            title: 'Changing channels later',
            bullets: [
              'New channel: create it in Slack, then choose Refresh channels in Notrix, tick it and save.',
              'Stop reading a channel: untick it and save. Everything Notrix stored from that channel is removed.',
              'Archived channel, or Notrix removed from a channel: Notrix stops reading it. What it already read stays until you untick the channel.',
              'Renamed channel: Notrix follows the new name; you do not need to do anything.',
              'Something looks missing: choose Sync now. A daily catch-up also fills in anything that was missed.',
            ],
          },
          {
            title: 'Troubleshooting',
            bullets: [
              '“Finish the installation first”: Slack can only be connected once Notrix is installed in your AWS account.',
              '“This Slack workspace is already connected to another Notrix workspace”: disconnect it there first, or remove the Notrix app in Slack under Settings → Manage apps, then connect again.',
              'A channel is not in the list: only public channels are listed. Make it public in Slack, or keep it private and out of Notrix, then choose Refresh channels.',
              'Notrix does not answer someone in Slack: they need a Notrix account with the same email as in Slack, and must open the link Notrix sends them the first time.',
              '“Slack needs a few more permissions”: disconnect, then connect Slack again to approve the new permissions.',
              'Older history is still filling in: Slack lets apps outside its Marketplace read history slowly, about 900 messages an hour. New messages still arrive within seconds.',
            ],
          },
          {
            title: 'Disconnect Slack',
            paragraphs: [
              'Choose Disconnect under Integrations → Slack. The bot token is revoked and deleted, and every message Notrix stored from Slack is removed from your account. Then remove the app from Slack itself, under Settings → Manage apps.',
            ],
            note: 'Uninstalling the Notrix app from Slack has the same effect: Notrix deletes what it read from Slack.',
          },
        ],
      },
      {
        slug: 'connectors',
        title: 'How connectors work',
        intro:
          'Notrix connects to ten tools besides Slack. You create a read-only key in each tool and paste it into Notrix. The key goes straight into your own AWS account; no Notrix server ever holds it.',
        sections: [
          {
            title: 'Connect a tool',
            steps: [
              'Open Integrations → Tools and pick the tool. Follow the short setup steps shown there (also on the page for each tool here).',
              'Paste the key. Notrix checks it with one call and shows whose account it is.',
              'Pick what to read: folders, spaces, projects, sites or teams. Up to 50 per connection.',
              'Approve the size estimate. Nothing is read before you approve.',
            ],
          },
          {
            title: 'First import, then updates',
            bullets: [
              'First import: everything you picked is read once. The page shows “Importing”, the items so far and since when. Answers may miss things from that tool until it finishes.',
              'Updates: after that, only changes are read, every 10 minutes.',
              'Deleted items disappear within a day (SharePoint on the next sync).',
              'A file that cannot be read is skipped and counted. It never stops the import.',
              'If the tool asks Notrix to slow down, it waits and continues where it stopped.',
            ],
          },
          {
            title: 'Who can see connected content',
            paragraphs: [
              'A new connection is visible to owners only. Choose Share with readers to let readers find its content in answers; Unshare takes it back right away.',
              'Notrix reads with the key you paste, and permissions are not copied from each tool. Once shared, whatever that key can see, every reader can find. Create keys that see only what your team should see.',
            ],
            note: 'Use a dedicated read-only account for each key where the tool allows it. A personal key stops working, or changes what it sees, when that person leaves or their access changes.',
          },
          {
            title: 'Disconnect',
            paragraphs: [
              'Disconnect any time from Integrations. Everything synced from that connection is deleted from your account.',
            ],
          },
          {
            title: 'Limits for all tools',
            bullets: [
              'Files up to 100 MB. Larger files are skipped and counted.',
              'Scanned PDFs and images inside documents are not read yet.',
              'Updates every 10 minutes, not instantly. Only Slack is near-instant.',
              'Links between tools are not followed, except issue keys (ABC-123) and GitHub issue and pull request links.',
              'Notrix does not yet know that “Atlas” and “Project Atlas” are the same project, though search may find both.',
            ],
          },
        ],
      },
      connectorPage(
        'google-drive',
        'Google Drive',
        'Notrix reads Drive through a service account in your own Google Cloud project. You decide what it sees by sharing folders with it.',
        [
          'In Google Cloud (your own project), create a service account and turn on the Google Drive API.',
          'Create a JSON key for the service account and paste it into Notrix.',
          'In Google Drive, share the folders or shared drives Notrix should read with the service account’s email, as Viewer.',
          'Back in Notrix, pick the folders or shared drives to read.',
        ],
        [
          'Google Docs, Slides and Sheets, PDFs, Office files and text files.',
          'The whole folder tree under each folder you pick.',
        ],
        [
          'Only folders and shared drives shared with the service account appear.',
          'Up to 2,000 folders per folder you pick. Beyond that the tree is cut; split it into smaller folders.',
          'The picker lists the first 100 shared drives.',
          'Unsupported file types are skipped.',
        ],
      ),
      connectorPage(
        'notion',
        'Notion',
        'Notrix reads the Notion pages you share with an internal integration.',
        [
          'In Notion, open Settings → Connections → Develop or manage integrations, and create an internal integration with Read content.',
          'Copy its secret and paste it into Notrix.',
          'Share the pages Notrix should read with the integration (… menu → Connections → add it). Sub-pages are included.',
        ],
        ['Pages shared with the integration, and their sub-pages.'],
        [
          'Only pages shared with the integration are read.',
          'Databases are read as the pages in them.',
        ],
      ),
      connectorPage(
        'confluence',
        'Confluence',
        'Notrix reads the Confluence spaces you pick, with an Atlassian API token.',
        [
          'Sign in to Atlassian as a user who can see the spaces Notrix should read. A dedicated read-only user is best.',
          'Create an API token at id.atlassian.com → Security → API tokens.',
          'Paste it into Notrix with that user’s email and your site name, then pick spaces.',
        ],
        ['Pages in the spaces you pick.'],
        ['The picker lists the first 250 spaces.'],
      ),
      connectorPage(
        'jira',
        'Jira',
        'Notrix reads the Jira projects you pick, with an Atlassian API token. Learning is on by default, so decisions and owners in issues become memories to review.',
        [
          'Sign in to Atlassian as a user who can see the projects Notrix should read. A dedicated read-only user is best.',
          'Create an API token at id.atlassian.com → Security → API tokens.',
          'Paste it into Notrix with that user’s email and your site name, then pick projects.',
        ],
        [
          'Issues with summary, status, assignee, priority, due date, description and comments.',
          'Issues an answer uses are re-read live, so status is current.',
        ],
        ['The picker lists the first 100 projects.'],
      ),
      connectorPage(
        'sharepoint',
        'SharePoint and OneDrive',
        'Notrix reads SharePoint sites through an app you register in your own Microsoft Entra tenant.',
        [
          'In Microsoft Entra, register an app and add the Microsoft Graph application permission Sites.Read.All, or Sites.Selected for chosen sites only.',
          'Grant admin consent and create a client secret.',
          'Paste the tenant ID, client ID and secret value into Notrix, then pick sites.',
        ],
        [
          'Documents in the sites you pick.',
          'Deletions show up on the next sync.',
        ],
        ['The picker lists the first 200 sites.'],
      ),
      connectorPage(
        'linear',
        'Linear',
        'Notrix reads the Linear teams you pick. Learning is on by default.',
        [
          'In Linear, open Settings → Account → Security & access → Personal API keys.',
          'Create a key with Read access and paste it into Notrix, then pick teams.',
        ],
        ['Issues in the teams you pick. Issues an answer uses are re-read live.'],
        [
          'The picker lists the first 100 teams.',
          'A personal key belongs to a person. If they leave, connect again with another key.',
        ],
      ),
      connectorPage(
        'github',
        'GitHub',
        'Notrix reads documentation, issues and pull requests from the repositories you pick. It never reads source code.',
        [
          'In GitHub, open Settings → Developer settings → Fine-grained tokens, and create a token for your organization.',
          'Give it access to the repositories Notrix should read, with read-only Contents, Issues, Pull requests and Metadata.',
          'Paste it into Notrix, then pick repositories.',
        ],
        [
          'Markdown and text docs (.md, .mdx, .markdown, .txt) on the default branch, up to 2,000 files a repository.',
          'Issues and pull request descriptions, with up to 30 comments each. Items an answer uses are re-read live.',
        ],
        [
          'No source code, other branches, wikis, discussions or review comments.',
          'The picker lists the first 100 repositories, most recently updated first.',
        ],
      ),
      connectorPage(
        'zendesk',
        'Zendesk',
        'Notrix reads Help Center articles and solved tickets.',
        [
          'In Zendesk Admin Center, open Apps and integrations → APIs → Zendesk API, and turn on token access.',
          'Add a token and paste it into Notrix with an agent’s email and your subdomain.',
        ],
        [
          'Help Center articles.',
          'Solved tickets. Items an answer uses are re-read live.',
        ],
        ['Nothing else is read (no open tickets, macros or users).'],
        [
          {
            title: 'Customer data',
            note: 'Solved tickets contain your customers’ names and messages. Share this connection only with people who should see them.',
          },
        ],
      ),
      connectorPage(
        'hubspot',
        'HubSpot',
        'Notrix reads notes, companies and deals from your HubSpot CRM.',
        [
          'In HubSpot, open Settings → Integrations → Private apps.',
          'Create an app with read scopes for notes, companies and deals.',
          'Paste its access token into Notrix.',
        ],
        ['Notes, companies and deals. Records an answer uses are re-read live.'],
        ['No contacts, emails, calls or custom objects.'],
      ),
      connectorPage(
        'salesforce',
        'Salesforce',
        'Notrix reads knowledge articles, accounts, opportunities and closed cases, as a read-only user you choose.',
        [
          'In Salesforce Setup, create an External Client App (or connected app) with OAuth.',
          'Enable the Client Credentials Flow and set a read-only Run As user.',
          'Paste your My Domain, the consumer key and the consumer secret into Notrix.',
        ],
        [
          'Online knowledge articles in English.',
          'Accounts, opportunities and closed cases. Records an answer uses are re-read live.',
        ],
        ['No contacts, leads, emails or custom objects.'],
      ),
    ],
  },
  {
    title: 'Core concepts',
    icon: 'concepts',
    pages: [
      {
        slug: 'how-notrix-answers',
        title: 'How Notrix answers',
        intro:
          'Every question follows the same path: check access, search, check the evidence, then answer with citations.',
        sections: [
          {
            title: 'Search',
            paragraphs: [
              'Notrix runs meaning-based search, exact text search and a lookup of approved memories, then blends the ranked lists. One weak signal does not decide the answer on its own. Issue keys found in the evidence are followed to the issue.',
            ],
          },
          {
            title: 'Check the evidence',
            paragraphs: [
              'Before answering, Notrix rechecks that each source still exists, is not suspended and is still selected. If no usable evidence is left, it says it could not find an answer instead of writing one.',
            ],
          },
          {
            title: 'Answer and receipt',
            paragraphs: [
              'The answer is written by your chosen AI model from the permitted passages only, with numbered citations. A receipt records which evidence and model produced it, so the answer can be traced later even if a source changes.',
            ],
          },
          {
            title: 'Which AI model',
            paragraphs: [
              'By default Notrix uses the Bedrock model chosen at install, in your account. An owner can add your own Anthropic or OpenAI key under Installation → Background work → AI models. If that provider fails before any text is shown, Bedrock takes over.',
            ],
          },
        ],
      },
      {
        slug: 'bring-your-own-cloud',
        title: 'Bring your own cloud',
        intro:
          'Notrix is split in two. The Notrix control plane handles sign-in and setup. The application that holds and searches your knowledge runs in your AWS account.',
        sections: [
          {
            title: 'What runs in your account',
            bullets: [
              'Encrypted file storage, using a key in your account.',
              'A private database with your search index and memory, with no public access.',
              'AI calls, through Bedrock in your account or your own model key.',
              'The application and background workers, behind a web application firewall.',
              'Connection keys and the Slack bot token, in your Secrets Manager.',
              'Alarms that email your alert address.',
            ],
          },
          {
            title: 'What Notrix keeps',
            paragraphs: [
              'Your sign-in, your workspace record, setup steps, installation status, invoices and an audit log. Nothing from your sources.',
            ],
          },
          {
            title: 'Data sizes',
            paragraphs: [
              'Your installation has a data size (XS to XL) that sets the database and how much it can hold. Integrations shows how full it is. Near the limit you can approve a larger size, with its price shown first. At the limit, syncing pauses and questions keep working.',
            ],
          },
          {
            title: 'Updates',
            paragraphs: [
              'New releases never install themselves. When one is ready, Installation shows it with release notes. Approve it and review the change in your AWS console. It takes about 10 minutes, and your current version keeps working until it finishes.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Security and data',
    icon: 'security',
    pages: [
      {
        slug: 'trust-and-security',
        title: 'Trust and security',
        intro:
          'What Notrix can and cannot reach in your AWS account, and how your data moves.',
        sections: [
          {
            title: 'What Notrix can reach',
            bullets: [
              'The status of the Notrix stack, through the connection role you created. The same role applies application updates only after you approve them. You can delete that role at any time.',
              'Your installation, only through requests that carry a signed grant expiring after 60 seconds.',
              'Slack events, which pass briefly through Notrix on their way to your account and are not stored there.',
            ],
          },
          {
            title: 'What Notrix cannot reach',
            bullets: [
              'Your files, passages, memory or answers. They stay in your account.',
              'Your connector keys and model keys. They go straight into your Secrets Manager.',
              'Anything else in your AWS account.',
            ],
          },
          {
            title: 'Sealed releases',
            paragraphs: [
              'The application ships as a sealed image that unlocks with a Notrix key at start-up. This protects Notrix’s code; it does not give Notrix access to your data.',
            ],
          },
          {
            title: 'Encryption and network',
            bullets: [
              'Files, database and secrets are encrypted with a key in your account.',
              'The database has no public access.',
              'Connectors only call their own tool’s HTTPS hosts and follow no redirects.',
              'The application sits behind a web application firewall.',
            ],
          },
          {
            title: 'Legal documents',
            paragraphs: [
              'The terms, privacy policy, data processing agreement and list of subprocessors are on app.notrix.si. Ask us for a security questionnaire or architecture review.',
            ],
          },
        ],
      },
      {
        slug: 'permissions',
        title: 'People and permissions',
        intro:
          'A workspace has owners and readers. Owners run it; readers ask questions.',
        sections: [
          {
            title: 'Roles',
            bullets: [
              'Owner: installs Notrix, connects tools and Slack, decides what is shared, approves memories and updates, manages people and billing, and can export or erase data.',
              'Reader: asks questions and opens the sources and Slack channels shared with them. Readers can mark answers helpful or wrong, but cannot upload, delete, review memories or change settings.',
            ],
          },
          {
            title: 'Invite people',
            steps: [
              'Under Settings → People, enter the teammate’s email and create an invite.',
              'Send them the link yourself. It works once, for that email, for 7 days.',
              'They sign in or sign up with that email and accept.',
            ],
            paragraphs: [
              'Removing a reader takes effect on their next request.',
            ],
          },
          {
            title: 'What readers can see',
            paragraphs: [
              'Nothing is shared until an owner chooses Share. Each file, note, tool connection and Slack channel has its own Share switch, and unsharing is immediate. A memory is visible to readers only if all of its evidence is shared.',
              'Permissions are not copied from each tool, so choose the key and the scopes with that in mind. Settings → Security shows what is connected and who can reach it.',
            ],
          },
          {
            title: 'Audit and receipts',
            paragraphs: [
              'Answers are recorded with receipts, so owners can see what evidence was used and when. Settings → Your data shows what Notrix keeps about questions.',
            ],
          },
        ],
      },
      {
        slug: 'deleting-data',
        title: 'Exporting and deleting data',
        intro:
          'You can export everything, delete a single source, erase data about one person, or remove the whole installation.',
        sections: [
          {
            title: 'Export',
            paragraphs: [
              'Settings → Your data exports what Notrix holds. Do this before removing the installation.',
            ],
          },
          {
            title: 'Delete a source',
            paragraphs: [
              'Deletion first blocks access, then removes stored files, passages, versions, related memory evidence and answer receipts in tracked steps. It runs in the background and failed steps are retried. A second sweep catches anything that arrives late.',
            ],
          },
          {
            title: 'Erase data about a person',
            paragraphs: [
              'Under Settings → Your data, find a person by Slack member ID, name or email and erase what Notrix holds about them. This cannot be undone.',
            ],
          },
          {
            title: 'Disconnect a tool or Slack',
            paragraphs: [
              'Disconnecting removes everything synced from it, and its key or bot token.',
            ],
          },
          {
            title: 'Remove everything',
            paragraphs: ['See Leaving Notrix.'],
          },
        ],
      },
    ],
  },
  {
    title: 'Administration',
    icon: 'admin',
    pages: [
      {
        slug: 'support',
        title: 'Running your installation',
        intro:
          'What owners check from time to time: health, background work, updates and alerts.',
        sections: [
          {
            title: 'Health',
            paragraphs: [
              'Installation → Overview shows whether your installation is healthy. Notrix also checks every installation every few minutes, so we usually know about a problem before you do.',
            ],
          },
          {
            title: 'Background work',
            paragraphs: [
              'Installation → Background work shows imports, syncs and scheduled runs, the AI models in use, and memory capture settings. What runs lists the AWS resources in your account.',
            ],
          },
          {
            title: 'Alerts',
            paragraphs: [
              'Alarms from your installation go to the alert email you set at install. Confirm the email AWS sends first, or the alarms are not delivered.',
            ],
          },
          {
            title: 'Usage',
            paragraphs: [
              'Settings → Usage shows how much Notrix is used, computed in your account. It counts usage; it is not an accuracy measure.',
            ],
          },
          {
            title: 'Getting help',
            paragraphs: [
              'Email yajat@notrix.si for setup, connector problems, deletion requests or anything else. Include your workspace name and, for an install problem, the first failed event from CloudFormation.',
            ],
          },
        ],
      },
      {
        slug: 'billing',
        title: 'Billing',
        intro:
          'Notrix bills by invoice. Your AWS usage is billed to you by AWS, separately.',
        sections: [
          {
            title: 'Invoices',
            paragraphs: [
              'See your plan and invoices under Settings → Billing. You get a reminder on the due date.',
            ],
          },
          {
            title: 'If an invoice is overdue',
            paragraphs: [
              'Seven days after the due date, the workspace pauses. Paying lifts the pause.',
            ],
            bullets: [
              'Paused: asking, uploads, syncing, scheduled reports and chime-in.',
              'Still works: reading what is there, export, deletion and leaving.',
              'Nothing is deleted. Your knowledge stays in your account.',
            ],
          },
        ],
      },
      {
        slug: 'leaving',
        title: 'Leaving Notrix',
        intro:
          'Leaving takes three steps and about 30 minutes. Everything happens in your AWS account, with one command.',
        sections: [
          {
            title: '1. Export what you want to keep',
            paragraphs: [
              'Use Export everything under Settings → Your data. The next step deletes your data for good.',
            ],
          },
          {
            title: '2. Delete everything in AWS',
            steps: [
              'Copy the command shown under Settings → Your data, in the Leave Notrix steps.',
              'Open AWS CloudShell in the same account and region (the page links to it) and paste the command.',
              'Type delete when it asks.',
            ],
            paragraphs: [
              'It deletes both Notrix stacks and what they keep on purpose: the database and its final snapshot, your uploaded files, the logs, the stored secrets and the encryption key (AWS waits 7 days before deleting a key). If CloudShell disconnects, paste the command again and it carries on.',
            ],
          },
          {
            title: '3. Close the workspace',
            paragraphs: [
              'In Settings → Your data, type close this workspace and select Close this workspace. Notrix stops passing Slack messages to your installation, forgets how to reach your AWS account, and nobody can sign in to the workspace again. Notrix keeps your invoices and its audit log as billing and legal records.',
              'Uninstall the Notrix app from Slack too, under Slack’s app settings.',
            ],
          },
        ],
      },
      {
        slug: 'faq',
        title: 'FAQ',
        intro: 'Short answers to the questions we hear most.',
        sections: [
          {
            title: 'Does Notrix train AI models on our data?',
            paragraphs: [
              'No. Notrix sends passages to the model only to write an answer, through Bedrock in your account or your own model key, under that provider’s terms.',
            ],
          },
          {
            title: 'Can Notrix staff read our documents?',
            paragraphs: [
              'No. Your knowledge stays in your AWS account, and Notrix’s role there can only read the status of the Notrix stack and apply updates you approve.',
            ],
          },
          {
            title: 'Why did an answer say it found nothing?',
            paragraphs: [
              'Either the source is not connected, it is still importing, or the question did not name what it is about. Check Integrations for import status, then ask again with the project or customer name.',
            ],
          },
          {
            title: 'How fresh are answers?',
            paragraphs: [
              'Slack within seconds. Other tools within about 10 minutes of an edit, and six tools re-read the items an answer uses live.',
            ],
          },
          {
            title: 'Can we use our own Anthropic or OpenAI key?',
            paragraphs: [
              'Yes, under Installation → Background work → AI models. The key is kept in your account.',
            ],
          },
          {
            title: 'Does Notrix read private Slack channels or source code?',
            paragraphs: ['No to both.'],
          },
          {
            title: 'Why does Notrix not answer me in Slack?',
            paragraphs: [
              'Your Slack account is probably not linked yet, or your Slack email differs from your Notrix email. Open the link Notrix sent you by DM while signed in to Notrix.',
            ],
          },
          {
            title: 'What happens to our data if we stop paying?',
            paragraphs: [
              'Service pauses; nothing is deleted. You can still read, export, delete and leave.',
            ],
          },
        ],
      },
    ],
  },
];

export const notrixDocPages = notrixDocGroups.flatMap((group) => group.pages);

export const notrixDocSectionId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// Paths on docs.notrix.si (middleware.ts maps them to app/docs).
export const notrixDocHref = (page: NotrixDocPage) =>
  page.slug === notrixDocPages[0].slug ? '/' : `/${page.slug}`;
