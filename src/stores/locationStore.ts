import { create } from 'zustand';
import { toast } from "sonner";

interface LocationStore {
  selectedLocation: string | null;
  isLoading: boolean;
  error: string | null;
  setSelectedLocation: (location: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: "location1", // Default to Brandon Park Shopping Centre
  isLoading: false,
  error: null,
  setSelectedLocation: (location) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call to validate location
      setTimeout(() => {
        if (!location) {
          throw new Error("Invalid location selected");
        }
        
        set({ selectedLocation: location, isLoading: false });
        toast.success("Location updated successfully!", {
          description: "Your preferred location has been saved.",
        });
      }, 500);
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "An error occurred", isLoading: false });
      toast.error("Failed to update location", {
        description: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));