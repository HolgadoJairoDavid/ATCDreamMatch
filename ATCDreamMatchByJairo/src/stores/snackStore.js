import { create } from "zustand";

const useSnackStore = create((set) => ({
    snack: {open: false,
        message: '',
        // success | error | warning | info
        severity: ''
    },
    setSnack: (open, message, severity) => set({ snack: { open: open, message: message, severity: severity } }),
    getCurrentSnack: () => useSnackStore.getState().snack
    }));

export default useSnackStore;