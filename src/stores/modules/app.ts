import { defineStore } from "pinia";
import {
  store,
} from "../index";

export const useAppStore = defineStore({
  id: "item-app",
  state: ()=> ({
    lang: 'zh',
  }),
  getters: {
    getLang(state) {
      return state.lang;
    },
  },
  actions: {
    setLang(val) {
      this.lang = val;
    }
  }
});

export function useAppStoreHook() {
  return useAppStore(store);
}
