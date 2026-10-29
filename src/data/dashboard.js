// ---------------------------------------------------------------
// Dashboard data. Edit this file to update the dashboard, then
// commit + push (Vercel/Netlify redeploys in about a minute).
//
// Want updates WITHOUT redeploying? Put the same object in a public
// JSON file (for example in a GitHub repo), paste its "raw" URL below,
// and the site will load it on every visit. Leave "" to use this file.
// ---------------------------------------------------------------
export const REMOTE_DATA_URL = "";

export const GITHUB_USERNAME = "Adnanibrahim43";

// status values: "building" | "built" | "deployed"
// EDIT the statuses below so they match reality.
export const localData = {
  lastUpdated: "2026-10-29",

  projects: [
    { name: "Alfred Local Multi-Agent AI", note: "LangGraph supervisor + 5 agents", status: "building" },
    { name: "Brother-Eye Job Agent", note: "10-stage agentic pipeline", status: "built" },
    { name: "ProjectDNA Knowledge Platform", note: "Corrective-RAG + knowledge graph", status: "built" },
  ],

  // status: "earned" | "in progress"
  certifications: [
    { title: "Prompt Engineering for ChatGPT", issuer: "DeepLearning.AI", year: "2025", status: "earned" },
    { title: "Machine Learning Specialization", issuer: "Vodafone Idea Foundation", year: "2024", status: "earned" },
  ],

  // status: "active" | "completed"
  internships: [
    { role: "AI/ML Software Engineer Intern", company: "Kingscote Informatics", period: "Aug 2025 - Jan 2026", status: "completed" },
  ],

  // status: "active" | "completed" | "waitlist"
  // Example: { title: "Chatbot for a retail store", client: "Local business", status: "active" }
  gigs: [],

  // People/orders waiting for a slot with you
  waitlist: { count: 0 },
};