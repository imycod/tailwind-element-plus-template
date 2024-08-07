export default function progressHandler() {

	let steps = null
	const currentStep = ref(0);

	type SchemaType = {
		keys: string[]
	}
	function getSchema(options: SchemaType) {
		steps = options.keys.map(value => {
			return {
				title: value
			}
		})
		return steps
	}

	const nextStep = () => {
		if (currentStep.value < steps.length - 1) {
			currentStep.value = currentStep.value + 1;
		}
	}
	const previousStep = () => {
		currentStep.value = currentStep.value - 1;
	}

	return {
		getSchema,
		currentStep,
		nextStep,
		previousStep
	}
}