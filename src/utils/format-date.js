import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

/**
 * @param {string} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
  return format(new Date(dateString), "dd MMMM yyyy, HH:mm:ss", {
    locale: idLocale,
  });
};
