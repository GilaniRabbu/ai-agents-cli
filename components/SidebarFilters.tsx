/* eslint-disable */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters, selectFilters } from "@/redux/filterSlice";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const STATUS_OPTIONS = ["Active", "Beta", "Archived"];
const CATEGORY_OPTIONS = [
  "Customer Service",
  "Marketing",
  "Development",
  "Operations",
];
const PRICING_OPTIONS = ["Free Tier", "Subscription", "Per-Use"];

export default function SidebarFilters() {
  const dispatch = useDispatch();
  const { search, status, category, pricing } = useSelector(selectFilters);

  const toggleValue = (
    value: string,
    list: string[],
    key: "status" | "category"
  ) => {
    const updated = list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];

    dispatch(setFilters({ [key]: updated }));
  };

  const handlePricingChange = (value: string) => {
    dispatch(setFilters({ pricing: value }));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search agents..."
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <div>
        <h4 className="font-semibold mb-2">Status</h4>
        {STATUS_OPTIONS.map((s) => (
          <div key={s} className="flex items-center space-x-2">
            <Checkbox
              id={`status-${s}`}
              checked={status.includes(s)}
              onCheckedChange={() => toggleValue(s, status, "status")}
            />
            <label htmlFor={`status-${s}`}>{s}</label>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Category</h4>
        {CATEGORY_OPTIONS.map((c) => (
          <div key={c} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${c}`}
              checked={category.includes(c)}
              onCheckedChange={() => toggleValue(c, category, "category")}
            />
            <label htmlFor={`category-${c}`}>{c}</label>
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-2">Pricing</h4>
        <RadioGroup value={pricing} onValueChange={handlePricingChange}>
          {PRICING_OPTIONS.map((p) => (
            <div key={p} className="flex items-center space-x-2">
              <RadioGroupItem id={`pricing-${p}`} value={p} />
              <label htmlFor={`pricing-${p}`}>{p}</label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button variant="outline" onClick={handleReset}>
        Clear All Filters
      </Button>
    </div>
  );
}
