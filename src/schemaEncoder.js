export default class SchemaEncoder {
    constructor(schema, cursored_buffer) {
        this.schema = schema
        this.cursored_buffer = cursored_buffer
    }

    decode() {
        let decoded_info = {}
        for (const [key, value] of Object.entries(this.schema)) {
            let method_name = this._type_name_to_method[value]
            let decoded_value = this.cursored_buffer[method_name]()
            decoded_info[key] = decoded_value
        }
        return decoded_info
    }
}
