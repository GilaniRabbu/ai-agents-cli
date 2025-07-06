import { Metadata } from "next";
import mockAgents from "@/data/mock-agents.json";
import ListOfAgents from "@/components/ListOfAgents";

export const metadata: Metadata = {
  title: "ArkLab AI Agents Catalog",
  description: "Browse a server-rendered catalog of intelligent AI agents.",
};

async function getAgents() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockAgents;
}

export default async function HomePage() {
  const agents = await getAgents();

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 border-b pb-3">
        AI Agent Catalog
      </h1>
      <ListOfAgents agents={agents} />
    </main>
  );
}
