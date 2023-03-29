import CursoredBuffer from "./cursoredBuffer.js"
import { typeNameToMethod } from './typeNameToMethod.js'

export default class SchemaEncoder {
    constructor(schema) {
        this.schema = schema
    }

    encode(data) {
        let cursored_buffer = new CursoredBuffer(new ArrayBuffer(10000)) 
        for (const [key, value] of Object.entries(this.schema)) {
            let method_name = typeNameToMethod[value]
            cursored_buffer['write' + method_name](data[key])
        }
        return cursored_buffer.buffer.slice(0, cursored_buffer._offset)
    }
}
