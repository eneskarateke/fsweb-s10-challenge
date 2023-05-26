import { NOT_EKLE, NOT_SIL, NOT_RESETLE } from "./actions";
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
  const eskiNotlar = localStorageStateOku(key);

  if (eskiNotlar) {
    return eskiNotlar;
  } else {
    return baslangicDegerleri;
  }
}

const initialState = baslangicNotlariniGetir(s10chLocalStorageKey);

export function reducer(state = initialState, action) {
  switch (action.type) {
    case NOT_EKLE:
      const not = action.payload;
      const newNote = {
        id: not.id,
        date: not.date,
        body: not.body,
      };
      const updatedNotes = [newNote, ...state.notlar];
      localStorageStateYaz(s10chLocalStorageKey, {
        ...state,
        notlar: updatedNotes,
      });

      return {
        ...state,
        notlar: updatedNotes,
      };

    case NOT_SIL:
      const deletedNoteId = action.payload;
      const filteredNotes = state.notlar.filter(
        (item) => item.id !== deletedNoteId
      );
      localStorageStateYaz(s10chLocalStorageKey, {
        ...state,
        notlar: filteredNotes,
      });

      return {
        ...state,
        notlar: filteredNotes,
      };

    case NOT_RESETLE:
      localStorageStateYaz(s10chLocalStorageKey, {
        ...state,
        notlar: baslangicDegerleri.notlar,
      });
      return {
        ...state,
        notlar: baslangicDegerleri.notlar,
      };

    default:
      return state;
  }
}
