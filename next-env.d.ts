/// <reference types="next" />
/// <reference types="next/types/global" />
declare module "*.svg";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY?: string;
      NEXT_PUBLIC_GOOGLE_MAP_API_KEY?: string;
    }
  }
}
