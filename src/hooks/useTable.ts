import TableComponent from "@/components/item-table/index.vue"
import {ref, onMounted, onUnmounted, h, render} from 'vue';

export default function useTable(el, {data, visible, column}) {

	const container = ref(null);

	onMounted(() => {
		const targetEl = document.querySelector(el);
		if (!targetEl) {
			// throw new Error(`Element not found: ${el}`);
			console.warn(`Element not found: ${el}`)
			return
		}
		container.value = document.createElement('div');
		document.body.appendChild(container.value);

		const vNode = h(TableComponent, {data, visible, column});
		render(vNode, container.value);

		targetEl.appendChild(container.value);
	});

	onUnmounted(() => {
		if (container.value) {
			container.value.remove();
		}
	});

	return {}
}