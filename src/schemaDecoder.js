import {typeNameToMethod} from './typeNameToMethod.js'

export default class SchemaDecoder {
    constructor(schema, cursored_buffer) {
        this.schema = schema
        this.cursored_buffer = cursored_buffer
    }

    decode() {
        let decoded_info = {}
        for (const [key, value] of Object.entries(this.schema)) {
            let method_name = typeNameToMethod[value]
            let decoded_value = this.cursored_buffer[method_name]()
            decoded_info[key] = decoded_value
        }
        return decoded_info
    }
}
