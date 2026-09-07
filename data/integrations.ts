/**
 * Integrations are infrastructure, not product identity.
 * Prefer quiet technical mention over logo walls on marketing surfaces.
 */

export type Integration = {
  id: string;
  name: string;
  role: string;
  publicFacing: boolean;
};

export const integrations: Integration[] = [
  {
    id: "buffer",
    name: "Buffer",
    role: "Preferred publishing and scheduling layer after approval.",
    publicFacing: false,
  },
  {
    id: "openai",
    name: "OpenAI",
    role: "AI-assisted content preparation.",
    publicFacing: false,
  },
  {
    id: "google-drive",
    name: "Google Drive",
    role: "Common content drop / source location.",
    publicFacing: true,
  },
  {
    id: "dropbox",
    name: "Dropbox",
    role: "Alternative content source location.",
    publicFacing: true,
  },
  {
    id: "n8n",
    name: "n8n",
    role: "Orchestration runtime — do not emphasise publicly.",
    publicFacing: false,
  },
];

export const deploymentOptions = [
  {
    id: "client-vps",
    label: "Private infrastructure",
    description:
      "Client-owned VPS with Docker and self-hosted orchestration.",
    preferred: true,
  },
  {
    id: "managed",
    label: "Managed infrastructure",
    description: "Managed option when the customer prefers less ops burden.",
    preferred: false,
  },
] as const;
