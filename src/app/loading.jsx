import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
      
      <Spinner
        size="xl"
        color="warning"
        label="Loading..."
        labelColor="warning"
      />

      <p className="text-gray-500 text-sm">
        Please wait while we load the doctors...
      </p>

    </div>
  );
}