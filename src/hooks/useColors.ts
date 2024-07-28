import {setProperty} from "@/utils/browser.ts";
import {darken, lighten} from "@/utils/color-utils";

export default function useColors() {
    const colors = ['#9333ea','#409EFF']

    function setColors(val:string) {
        setProperty('--item-color-primary',val)
        for (let i = 1; i <= 9; i++) {
            setProperty(`--item-color-primary-light-${i}`,lighten(val, i / 10))
        }
        for (let i = 1; i <= 9; i++) {
            setProperty(`--item-color-primary-dark-${i}`,darken(val, i / 10))
        }
    }
    return [colors,setColors]
}