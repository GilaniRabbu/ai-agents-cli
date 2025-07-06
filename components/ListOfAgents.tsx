/* eslint-disable */
"use client";

import { useSelector } from "react-redux";
import { selectFilters } from "@/redux/filterSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ClientAgentCard from "./ClientAgentCard";
import SidebarFilters from "./SidebarFilters";

export default function ListOfAgents({ agents }: { agents: any[] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔐 Redirect if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to login
    }
  }, [status, router]);

  // Optional: loading spinner
  if (status === "loading") {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  const {
    search,
    status: statusFilter,
    category,
    pricing,
  } = useSelector(selectFilters);

  // 🧠 Filter the agents based on Redux filter state
  const filteredAgents = agents.filter((agent) => {
    const matchSearch =
      !search ||
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      !statusFilter.length || statusFilter.includes(agent.status);
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
