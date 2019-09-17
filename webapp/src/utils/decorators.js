// @flow
import { ToastsStore } from "react-toasts";

export async function withErrorHandling(fn, onError) {
  try {
    return await fn();
  } catch (error) {
    if (onError) return onError(error);
    ToastsStore.error("Something went wrong");
    return error;
  }
}
