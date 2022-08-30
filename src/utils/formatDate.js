import moment from "moment-timezone";
import 'moment/locale/th';
export const formatDate = (dateTime) => {
  return moment(dateTime)
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD MMM YYYY เวลา HH:mm:ss")
};
