import moment from "moment-timezone";
export const formatDate = (dateTime)=>{
    return moment(dateTime)
    .tz("Asia/Bangkok")
    .locale("th")
    .format("DD-MM-YYYY HH:mm:ss")
}