declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string | undefined;
      MONGO_URI: string | undefined;
      JWT_SECRET: string | undefined;
      PAYPAL_CLIENT_ID: string | undefined;
      PAYPAL_APP_SECRET: string | undefined;
      PAYPAL_API_URL: string | undefined;
      PAGINATION_LIMIT: string | undefined;
    }
  }
}

export {};
