export const selectTemplate = {
    type: 'select',
    label: '',
    name: '',
    placeholder: 'please select',
    options: [],
    rules: []
};
export type SelectComponent = {
    type?: string,
    label?: string,
    name: string,
    placeholder?: string,
    options: Array<{ label: string, value: string | number }>,
    rules?: Array<any>,
};
export const inputTemplate = {
    type: 'input',
    label: '',
    name: '',
    placeholder: 'please input',
    width: '100%',
    rules: []
};

export type InputComponent = {
    type?: string,
    label?: string,
    name: string,
    placeholder?: string,
    width?: string,
    rules?: Array<any>,
};
export const dateTemplate = {
    type: 'date',
    label: '',
    name: '',
    placeholder: 'please select',
    rules: []
}
export type DateComponent = {
    type?: string,
    label?: string,
    name: string,
    placeholder?: string,
    rules?: Array<any>,
}

export type SchemaType = {
    select?: SelectComponent[] | SelectComponent,
    input?: InputComponent[] | InputComponent,
    date?: DateComponent[] | DateComponent,
}
export type SchemaKey = 'select' | 'input' | 'date';
export default class Schema {
    select: SelectComponent;
    input: InputComponent;
    date: DateComponent;

    constructor() {
        this.select = {...selectTemplate};
        this.input = {...inputTemplate};
        this.date = {...dateTemplate};
    }
}

