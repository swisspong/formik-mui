import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwalTest = withReactContent(Swal);
export const swalLoading = (MySwal) => {
  MySwal.fire({
    title: <p>รอดำเนินการ...</p>,
    allowOutsideClick: false,
    showConfirmButton: false,
    allowEscapeKey: false,
    timerProgressBar: true,
    didOpen: () => {
      MySwal.showLoading();
    },
  });
};
export const swalLoadingNew = () => {
  MySwalTest.fire({
    title: <p>รอดำเนินการ...</p>,
    allowOutsideClick: false,
    showConfirmButton: false,
    allowEscapeKey: false,
    timerProgressBar: true,
    didOpen: () => {
      MySwalTest.showLoading();
    },
  });
};


export const swalMessage = (MySwal, message, status) => {
  return MySwal.fire({
    title: <p>{message}</p>,
    icon: status,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    timer: 2500,
    timerProgressBar: true,
  });
};
export const swalMessageNew = (message, status) => {
  return MySwalTest.fire({
    title: <p>{message}</p>,
    icon: status,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    timer: 2500,
    timerProgressBar: true,
  });
};
export const swalMessageTest = (message, status) => {
  return MySwalTest.fire({
    title: <p>{message}</p>,
    icon: status,
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    timer: 2500,
    timerProgressBar: true,
  });
};
export const swalMessageButton = (title, message, status) => {
  return MySwalTest.fire(title, message, status);
};
export const swalSaveSuccess = () => {
  return MySwalTest.fire({
    title: "บันทึกสำเร็จ!",
    text: "ข้อมูลของคุณถูกบันทึกแล้ว",
    icon: "success",
    confirmButtonText: "ตกลง",
  });
};

export const swalEditWarning = () => {
  return MySwalTest.fire({
    title: "ข้อมูลไม่มีการเปลี่ยนแปลง!",
  
    icon: "warning",
    confirmButtonText: "ตกลง",
  });
};
export const swalEditSuccess = () => {
  return MySwalTest.fire({
    title: "แก้ไขสำเร็จ!",
    text: "ข้อมูลของคุณถูกเปลี่ยนแปลงแล้ว",
    icon: "success",
    confirmButtonText: "ตกลง",
  });
};
export const swalDeleteFail = (message, textLink, link) => {
  return MySwalTest.fire({
    title: "เกิดข้อผิดพลาด!",
    text: message,
    icon: "error",
    confirmButtonText: "ตกลง",
    footer: `<a href="${link}">ไปที่หน้า${textLink}?</a>`,
  });
};
export const swalCreateFail = (message) => {
  return MySwalTest.fire({
    title: "เกิดข้อผิดพลาด!",
    text: message,
    icon: "error",
    confirmButtonText: "ตกลง",
  });
};
export const swalDeleteSuccess = () => {
  return MySwalTest.fire({
    title: "ลบสำเร็จ!",
    text: "ข้อมูลของคุณถูกลบแล้ว",
    icon: "success",
    confirmButtonText: "ตกลง",
  });
};

// export const swalNameType = (nameTypes) => {
//   MySwalTest.fire({
//     title: "สร้างชื่อกลุ่มตัวเลือก",
//     input: "text",
//     inputLabel: "(ชื่อนี้จะแสดงบนเว็บขายสินค้า)",
//     inputPlaceholder: "กรอกชื่อกลุ่มตัวเลือก ",
//     cancelButtonText: "ยกเลิก",
//     showCancelButton: true,
//     confirmButtonText: "บันทึก",
//     showLoaderOnConfirm: true,
//     preConfirm: (value) => {
//       return createNameTypeReq({ name: value }).then((res) => {
//         console.log(res.ok);
//       });
//     },
//     allowOutsideClick: () => !MySwalTest.isLoading(),
//     inputValidator: (value) => {
//       if (!value) {
//         return "ต้องกรอกข้อมูล!";
//       }
//     },
//   }).then((result) => {
//     if (result.isConfirmed) {
//       MySwalTest.fire("fdsfd", "fdsfs", "success").then(() =>
//         console.log("teststst")
//       );
//     }
//   });
// };

export const swalDeleteButton = () => {
  return MySwalTest.fire({
    title: "คุณแน่ใจหรือไม่ที่จะลบ?",
    text: "คุณจะไม่สามารถย้อนกลับได้!",
    icon: "warning",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่, ฉันต้องการลบ!",
    cancelButtonText: "ยกเลิก",
  });
};
