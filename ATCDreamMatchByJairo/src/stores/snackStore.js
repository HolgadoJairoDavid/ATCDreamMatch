import { create } from "zustand";

const useSnackStore = create((set) => ({
    snack: {
        open: false,
        message: '',
        // success | error | warning | info
        severity: ''
    },
    setSnack: (open, message, severity) => set({ snack: { open, message, severity } }),
    }));

export default useSnackStore;