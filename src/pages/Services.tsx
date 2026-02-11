import { useMemo } from "react";
import ServiceCard from "@/components/ServiceCard";
import CategoryChips from "@/components/CategoryChips";
import { generateServices } from "@/data/mockData";
import { Scissors } from "lucide-react";

const Services = () => {
  const services = useMemo(() => generateServices(16), []);

  return (
    <div className="px-6 py-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <Scissors className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Salon Services</h1>
          <p className="text-xs text-muted-foreground">Find the perfect service for your needs</p>
        </div>
      </div>
      <CategoryChips />
      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
