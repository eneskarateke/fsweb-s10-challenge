import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";
export const NOT_RESETLE = "NOT_RESETLE";

export function notEkle(not) {
  // ...
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  // ...
  return { type: NOT_SIL, payload: notId };
}

export function notResetle() {
  // ...
  return { type: NOT_RESETLE };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  const toastEkle = toast.loading("Ekleniyor...");
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        toast.update(toastEkle, {
          render: "Notun eklendi canısı",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });

        dispatch(notEkle(res.data.json));
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  const toasterSil = toast.loading("Siliniyor...");
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        toast.update(toasterSil, {
          render: "Not silindi.",
          type: "info",
          isLoading: false,
          autoClose: 1000,
        });
        dispatch(notSil(res.data.data));
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
      }
    })
    .catch((error) => {
      console.log(error);
      toast.update(toasterSil, {
        render: "bi hata var galiba",
        type: "warning",
        isLoading: false,
        autoClose: 1000,
      });
    });
};
