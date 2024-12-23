import { EmptyState } from "@realState/components/ui/empty-state";

const NotFound = () => {
  return (
    <EmptyState
      title="Property not found"
      description="The property you are looking for does not exist."
      maxW={"md"}
    />
  );
};

export default NotFound;
