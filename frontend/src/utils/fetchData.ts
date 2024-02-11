import {
  ConflictError,
  UnauthorizedError,
} from "../components/errors/http_errors";

export const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMsg = errorBody.message;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMsg);
    } else if (response.status === 409) {
      throw new ConflictError(errorMsg);
    } else {
      throw Error(
        `Response failed with status: ${response.status}. Message: ${errorMsg}`
      );
    }
  }
};
