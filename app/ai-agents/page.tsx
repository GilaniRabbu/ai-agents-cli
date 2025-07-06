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
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          AI Agent Catalog
        </h1>
        <p className="text-gray-600 text-base max-w-2xl">
          Explore a curated list of powerful AI agents designed to streamline
          tasks, boost productivity, and deliver smarter user experiences.
        </p>
      </div>
      <ListOfAgents agents={agents} />
    </main>
  );
}
