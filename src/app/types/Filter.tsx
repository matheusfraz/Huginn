import { Language } from "./Language";

export type Filter = {
  id: number;
  name: String;
  language?: Language;
  isActive: boolean;
};
