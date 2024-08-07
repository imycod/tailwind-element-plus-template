<template>
	<div class="py-8 ml-[10px]">
		<div class="hidden sm:block">
			<nav class="-mb-px flex space-x-8">
				<a
					v-for="(tab, index) in schema"
					:key="tab.label"
					href="#"
					:class="[
						index === activeTab
							? 'element'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-300',
						'whitespace-nowrap px-1 text-sm font-medium',
					]"
					:value="modelValue"
					@click="selectTab(index)"
				>
					{{ tab.count ? tab.label + ` (${tab.count})` : tab.label }}
				</a>
			</nav>
		</div>
		<div>
			<slot :activeTab="activeTab"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps({
	modelValue: {
		type: Number,
		default: 0,
	},
  schema: {
		type: Array,
		default: () => [],
	},
});
const emit = defineEmits(['update:modelValue']);

const activeTab = ref(props.modelValue);

watch(
	() => props.modelValue,
	(newValue) => {
		activeTab.value = newValue;
	}
);

const selectTab = (index) => {
	emit('update:modelValue', index);
};
</script>

<style scoped lang="scss">
.element {
	position: relative;
	/* Set other styling for your element */
}

.element::after {
	@apply bg-purple-500;
	content: '';
	position: absolute;
	left: -10px;
	top: 0;
	bottom: 0;
	width: 3px; /* Width of the left border */
	border-radius: 0 4px 4px 0; /* Adjust as needed for the desired curvature */
}
</style>
