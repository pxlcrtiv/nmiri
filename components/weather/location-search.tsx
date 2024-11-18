"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LocationSearchProps {
  onSearch: (location: string) => void;
}

export function LocationSearch({ onSearch }: LocationSearchProps) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter city name..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  );
}