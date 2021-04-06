export const errors = {
  OVERLAP_ERROR: "overlap",
  INVALID_DAY_ERROR: "invalid-day",
  INVALID_HOUR_ERROR: "invalid-hour",
  INVALID_DURATION_ERROR: "invalid-duration",
  INVALID_NAME_ERROR: "invalid-name",
};

export const errorMessages = {
  [errors.OVERLAP_ERROR]: "The class overlaps an existing one",
  [errors.INVALID_DAY_ERROR]: "Invalid day",
  [errors.INVALID_HOUR_ERROR]: "Invalid hour",
  [errors.INVALID_DURATION_ERROR]: "Invalid duration",
  [errors.INVALID_NAME_ERROR]: "The name cannot be empty",
  unknown: "",
};

export const getErrorMessage = (error: string): string => {
  return errorMessages[error] || errorMessages["unknown"];
};
