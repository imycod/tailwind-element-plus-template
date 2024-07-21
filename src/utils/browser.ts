import Bowser from "bowser"
export const setProperty = (prop: string, val: string) => {
	document.documentElement.style.setProperty(prop, val);
}

export const getAgent = () => {
	return Bowser.getParser(window.navigator.userAgent);
}