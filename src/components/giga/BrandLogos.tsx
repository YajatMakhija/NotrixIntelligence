export type BrandApp = {
  id: string;
  label: string;
  src: string;
};

export const BRAND_APPS: BrandApp[] = [
  { id: "github", label: "GitHub", src: "/logos/github.svg" },
  { id: "slack", label: "Slack", src: "/logos/slack.svg" },
  { id: "drive", label: "Google Drive", src: "/logos/google-drive.svg" },
  { id: "salesforce", label: "Salesforce", src: "/logos/salesforce-icon.svg" },
  { id: "jira", label: "Jira", src: "/logos/jira.svg" },
  { id: "aws", label: "AWS", src: "/logos/aws.svg" },
  { id: "notion", label: "Notion", src: "/logos/notion.svg" },
  { id: "snowflake", label: "Snowflake", src: "/logos/snowflake.svg" },
  { id: "teams", label: "Teams", src: "/logos/teams.svg" },
];
