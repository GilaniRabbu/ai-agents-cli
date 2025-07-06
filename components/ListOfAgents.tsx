/* eslint-disable */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectFilters } from "@/redux/filterSlice";
import ClientAgentCard from "./ClientAgentCard";
import SidebarFilters from "./SidebarFilters";

export default function ListOfAgents({ agents }: { agents: any[] }) {
  const { data: session } = useSession();
  const router = useRouter();

  // 🔒 Redirect to "/" if session is not present
  useEffect(() => {
    if (!session) {
      router.replace("/"); // use replace to prevent back navigation
    }
  }, [session, router]);

  // If session hasn't loaded yet, return null (or show a loading spinner)
  if (!session) return null;

  const { search, status, category, pricing } = useSelector(selectFilters);

  const filteredAgents = agents.filter((agent) => {
    const matchSearch =
      !search ||
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase());

    const matchStatus = !status.length || status.includes(agent.status);
    const matchCategory = !category.length || category.includes(agent.category);
    const matchPricing = !pricing || pricing === agent.pricingModel;

    return matchSearch && matchStatus && matchCategory && matchPricing;
  });

  return (
    <div className="grid md:grid-cols-4 gap-8">
      <aside className="md:col-span-1">
        <SidebarFilters />
      </aside>
      <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <ClientAgentCard key={agent.id} agent={agent} />
        ))}
      </section>
    </div>
  );
}
