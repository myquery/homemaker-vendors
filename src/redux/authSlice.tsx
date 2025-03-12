import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  userId: string | null;
  authToken: string | null;
}
interface RegisterPasskeyPayload {
    registrationResponse: Credential | null;
    userId: string | null;
  }

const initialState: AuthState = {
  userId:  null, // Restore user ID if page refresh
  authToken:  null, // Restore token if page refresh
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<{ userId: string; token: string }>) => {
        console.log(action.payload)
      state.userId = action.payload.userId;
      state.authToken = action.payload.token;
      
      localStorage.setItem("userId", action.payload.userId); // Persist user
      localStorage.setItem("authToken", action.payload.token); // Persist token
    },
    clearUserId: (state) => {
      state.userId = null;
      state.authToken = null;
      
      localStorage.removeItem("userId"); // Remove from storage
      localStorage.removeItem("authToken");
    },
    registerPasskey: (state, action: PayloadAction<RegisterPasskeyPayload>) => {
        console.log("Registering passkey:", action.payload);
        // Handle registration logic here, like sending the registrationResponse to the backend.
      },
  },
});

export const { setUserId, clearUserId, registerPasskey } = authSlice.actions;
export default authSlice.reducer;

