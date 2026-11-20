// Notrix documentation content, written from what the product does today (companybrain repo: dashboard
// sections, connector setup text, install templates, D-049/D-050/D-053). Anything not built is either
// left out or stated as a limitation. Keep old slugs: they are live links.

export type NotrixDocSection = {
  title: string;
  paragraphs?: string[];
  steps?: string[];
  bullets?: string[];
  note?: string;
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
        title: 'Introduction',
        intro:
          'Notrix is a company brain that runs in your own AWS account. It reads the tools you connect, answers your team’s questions in Slack and on the web with the sources behind every answer, and remembers the decisions and commitments people approve.',
        sections: [
          {
            title: 'What Notrix does',
            paragraphs: [
              'Company knowledge is spread across documents, tickets, wikis and Slack threads. Notrix connects the sources you choose, searches them when someone asks, and writes an answer only from what it found.',
              'Every answer cites the passages it used. If Notrix cannot find usable evidence, it says so instead of guessing.',
            ],
          },
          {
            title: 'Why it runs in your account',
            paragraphs: [
              'Notrix installs as a private application inside your AWS account. Your files, search index, memory and AI calls stay there. Notrix itself keeps your sign-in, your workspace record and the status of your installation, and nothing from your sources.',
            ],
          },
          {
            title: 'Who these docs are for',
            bullets: [
              'Owners and administrators who install Notrix, connect tools and manage people. Start with Quickstart.',
              'Everyone else on the team, who mostly asks questions. Start with Asking questions and Slack.',
              'Security reviewers. Start with Trust and security.',
            ],
          },
        ],
      },
      {
        slug: 'setup',
        title: 'Quickstart',
        intro:
          'From sign-up to the first cited answer. Most steps are done once, by the workspace owner. Plan for about an hour, most of it waiting for AWS.',
        sections: [
          {
            title: 'The steps',
            steps: [
              'Check the prerequisites: an AWS account you administer, Bedrock model access, and an email for alerts.',
              'Create your account at app.notrix.si with Continue with Google, or with your work email and a six-digit code we email you. Add your company details; your workspace is created with you as its owner.',
              'Connect your AWS account under Installation: enter the account ID and region, then create the connection role in the AWS console.',
              'Install Notrix: review and create the installation stack in the AWS console. It takes about 15 minutes.',
              'Add knowledge: upload files or write notes under Knowledge, and connect tools under Integrations.',
              'Connect Slack and choose the channels Notrix may read.',
              'Share the sources and channels your team should use (nothing is shared by default), then invite them under Settings → People.',
              'Ask your first question on the Agent page, or mention Notrix in Slack.',
            ],
          },
          {
            title: 'Prefer a guided start?',
            paragraphs: [
              'Book a short call from the website and we will walk through the install with you. Pilots usually start with one team, one set of questions and a success measure agreed up front.',
            ],
          },
        ],
      },
      {
        slug: 'prerequisites',
        title: 'Before you install',
        intro:
          'Check these before you start the install. Most failed installs come from a missing model permission or the wrong region.',
        sections: [
          {
            title: 'AWS account',
            bullets: [
              'An AWS account you can administer. A separate account just for Notrix is best: it keeps billing and access clean.',
              'Someone who can create CloudFormation stacks and IAM roles in it.',
              'Region: US East (N. Virginia), us-east-1. More regions will be offered once they are verified.',
            ],
          },
          {
            title: 'Bedrock model access',
            paragraphs: [
              'Notrix uses Amazon Bedrock in your account for embeddings (Amazon Titan Text Embeddings) and, unless you add your own Anthropic or OpenAI key, for answers.',
            ],
            steps: [
              'In the AWS console, open Amazon Bedrock in us-east-1.',
              'Open Model access and request access to Titan Text Embeddings and the answer model you plan to use.',
              'For Anthropic models on Bedrock, fill in Anthropic’s use-case form when Bedrock asks for it.',
            ],
            note:
              'If an answer fails with “Operation not allowed” or “not authorized”, model access is missing or still pending. Check Model access in Bedrock before anything else.',
          },
          {
            title: 'Other things to have ready',
            bullets: [
              'An email address for alarms from your installation (failed work, stuck queue, errors, low database storage, AI throttling). AWS sends a confirmation email to it first.',
              'Admin rights in Slack, if you want Notrix in Slack.',
              'For each tool you will connect, an account that can create a read-only key. See the Connectors pages.',
            ],
          },
          {
            title: 'What it costs to run',
            paragraphs: [
              'You pay AWS directly for what runs in your account, on your own AWS bill. The amount depends on your usage: how much data you connect, how many questions your team asks, how much Notrix learns, and the data size you choose. AI calls are pay-per-use, on Bedrock or on your own model key. You can follow the cost any time in AWS Billing, and the price of a bigger data size is shown before you approve it.',
            ],
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
              'The connection stack creates a read-only role that lets Notrix see the status of the Notrix stack and nothing else. You can delete it at any time.',
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
              'Send Notrix a direct message, or mention @Notrix in a channel. A DM is answered in the DM; a mention is answered in a thread on your message. In Slack, Notrix also reads the last few messages of the conversation, so follow-ups like “when is it?” work. See the Slack page for setup and account linking.',
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
        title: 'Slack',
        intro:
          'Notrix answers in Slack, reads the channels you choose, and can offer answers in channels on its own when you turn on chime-in.',
        sections: [
          {
            title: 'Connect Slack',
            steps: [
              'Open Integrations → Slack and choose Connect Slack. Approve the Notrix app in your Slack workspace.',
              'Pick the channels Notrix may read. Channels that usually hold work knowledge are ticked for you; social channels and ones that may be sensitive (HR, legal, finance) are left off.',
              'Change anything, then press Save.',
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
              'The status of the Notrix stack, through the read-only connection role you created. You can delete that role at any time.',
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
              'Type the workspace name to close it. Notrix stops passing Slack messages to your installation, forgets how to reach your AWS account, and nobody can sign in to the workspace again. Notrix keeps your invoices and its audit log as billing and legal records.',
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
              'No. Your knowledge stays in your AWS account, and Notrix’s role there can only read the status of the Notrix stack.',
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
