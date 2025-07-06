"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Agent = {
  id: string;
  name: string;
  description: string;
  status: string;
  category: string;
  pricingModel: string;
};

export default function ClientAgentCard({ agent }: { agent: Agent }) {
  return (
    <motion.div
      key={agent.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardHeader>
          <CardTitle>{agent.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">{agent.description}</p>
          <div className="text-sm">
            <strong>Status:</strong> {agent.status}
          </div>
          <div className="text-sm">
            <strong>Category:</strong> {agent.category}
          </div>
          <div className="text-sm">
            <strong>Pricing:</strong> {agent.pricingModel}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
