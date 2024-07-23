import {store} from "@/stores";
export const useLanguageStore = defineStore("language", () => {
    const language = ref("en");
    const setLanguage = (val: string) => {
        language.value = val;
    };
    return {
        language,
        setLanguage,
    };
})

export function useLanguageStoreHook() {
    return useLanguageStore(store);
}