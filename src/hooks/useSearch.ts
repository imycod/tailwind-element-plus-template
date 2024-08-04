import Schema, {type SchemaKey, type SchemaType} from "@/components/item-table/schema.ts"
import {isArray} from "radash";

export default function useSearch() {
    const form = ref({})

    function fillSchema(k: SchemaKey, option: SchemaType, schema: SchemaType[]) {
        let obj = new Schema()
        Object.keys(option).forEach(key => {
            obj[k][key] = option[key]
        })
        schema.push(obj[k])
    }

    function getSchema(options: SchemaType) {
        let opt = options
        if (options.hasOwnProperty('type')) {
            // @ts-ignore
            opt = adjustSchema(options)
        }
        let obj = [];
        Object.keys(opt).forEach(key => {
            if (isArray(opt[key])) {
                opt[key].forEach(option => {
                    fillSchema(<"select" | "input" | "date">key, option, obj)
                })
            } else {
                fillSchema(<"select" | "input" | "date">key, opt[key], obj)
            }
        })
        return obj
    }

    function adjustSchema(options) {
        return {
            [options.type]: options,
        }
    }

    return {
        form,
        getSchema,
    }
}