import useColors from "@/hooks/useColors.ts";

export const useDarkModeStore = defineStore("darkMode", () => {
  const isDark = useStorage("darkMode", true);

  document.documentElement.classList.toggle("dark", isDark.value);

  const [colors, setColors] = useColors();
  function changeTheme() {
    if (isDark.value) {
      setColors(colors[0]);
    } else {
      setColors(colors[1]);
    }
  }

  if (!isDark.value) {
    changeTheme();
  }

  function toggleDarkMode() {
    isDark.value = !isDark.value;
    changeTheme();
    console.log('document.documentElement.classList',document.documentElement.classList)
    document.documentElement.classList.toggle("dark", isDark.value);
  }

  return { isDark, toggleDarkMode };
});
