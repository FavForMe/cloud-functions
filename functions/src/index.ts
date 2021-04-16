import axios from "axios";
import * as functions from "firebase-functions";

export const handleUserCreation = functions.auth.user().onCreate((user) => {
  try {
    const url = functions.config().backend.url;
    if (user.email) {
      return axios.post(`${url}/users/firebase`, {
        email: user.email,
        firebaseId: user.uid,
      });
    } else {
      return {
        message: "No email found, skipping user creation...",
      };
    }
  } catch (error) {
    throw new Error(error);
  }
});
