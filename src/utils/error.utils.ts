export const serializeError = (error: unknown) =>
  error instanceof Error
    ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      }
    : error
