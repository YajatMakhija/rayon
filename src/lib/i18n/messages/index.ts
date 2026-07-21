import type { Locale } from "../config";
import { messagesEn, type Messages } from "./en";
import { messagesFr } from "./fr";

export type { Messages };

export function getMessages(locale: Locale): Messages {
  return (locale === "fr" ? messagesFr : messagesEn) as Messages;
}
