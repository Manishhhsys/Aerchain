import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface Vendor {
  id: string;
  name: string;
  email: string;
  categories: string[];
}

interface VendorListProps {
  vendors: Vendor[];
  onSelectionChange: (selected: string[]) => void;
}

export default function VendorList({ vendors, onSelectionChange }: VendorListProps) {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  const toggleVendor = (id: string) => {
    let updated: string[];

    if (selectedVendors.includes(id)) {
      updated = selectedVendors.filter(v => v !== id);
    } else {
      updated = [...selectedVendors, id];
    }

    setSelectedVendors(updated);
    onSelectionChange(updated);
  };

  return (
    <div className="space-y-3 px-3 py-4">
      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          className="border rounded-lg p-3 flex items-start gap-4 hover:bg-muted transition"
        >
          {/* Checkbox */}
          <Checkbox
            checked={selectedVendors.includes(vendor.id)}
            onCheckedChange={() => toggleVendor(vendor.id)}
            className="mt-1" // tiny visual nudge
          />

          {/* Vendor info */}
          <div className="flex flex-col">
            <div className="font-medium text-lg">{vendor.name}</div>
            <div className="text-sm text-muted-foreground">{vendor.email}</div>

            <div className="flex gap-2 mt-2 flex-wrap">
              {vendor.categories.map((cat, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {vendors.length === 0 && (
        <div className="text-sm text-muted-foreground">No vendors available</div>
      )}
    </div>
  );
}
