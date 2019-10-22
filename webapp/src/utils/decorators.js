// @flow
import { ToastsStore } from "react-toasts";

export async function withErrorHandling(fn, onError) {
  try {
    return await fn();
  } catch (error) {
    if (onError) return onError(error);
    else if (error.status === 401) return error;
    else ToastsStore.error("Something went wrong");
    return error;
  }
}
