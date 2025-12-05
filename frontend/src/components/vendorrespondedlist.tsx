interface RespondedItem {
  vendor_id: string;
  rfp_id: string;
  vendor: {
    name: string;
    company: string;
  };
}

interface VendorRespondedListProps {
  responded: RespondedItem[];
}

export default function VendorRespondedList({ responded }: VendorRespondedListProps) {
  return (
    <div className="mt-6">
      <div className="border rounded-lg p-4 space-y-3 bg-card">
        {responded.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            No vendor has responded yet.
          </div>
        ) : (
          responded.map((item) => (
            <div
              key={item.vendor_id}
              className="p-3 border rounded-md bg-muted/40"
            >
              <div className="font-medium">{item.vendor.name}</div>

              <div className="text-sm text-muted-foreground">
                {item.vendor.company}
              </div>

              <div className="text-xs text-muted-foreground mt-1">
                Vendor ID: {item.vendor_id}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
