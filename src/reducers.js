import { NOT_EKLE, NOT_SIL } from "./actions";

import { nanoid } from "nanoid";

let nano = nanoid(5);
console.log(nano);

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export function reducer(state = baslangicDegerleri, action) {
  switch (action.type) {
    case NOT_EKLE:
      const not = action.payload;
      const newNote = {
        id: not.id,
        date: not.date,
        body: not.body,
      };
      const updatedNotes = [...state.notlar, newNote];

      return {
        ...state,
        notlar: updatedNotes,
      };

    case NOT_SIL:
      return {
        ...state,
        notlar: state.notlar.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}
