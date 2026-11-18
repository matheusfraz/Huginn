import { Language } from "./Language";

export type Filter = {
  id: number;
  name: string;
  language?: Language;
  isActive: boolean;
};
