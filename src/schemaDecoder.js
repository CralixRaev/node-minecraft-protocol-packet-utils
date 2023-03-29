import CursoredBuffer from './cursoredBuffer.js'
import { typeNameToMethod } from './typeNameToMethod.js'

export default class SchemaDecoder {
    constructor(schema) {
        this.schema = schema
    }

    decode(buffer) {
        let cursored_buffer = undefined
        if (! (buffer instanceof CursoredBuffer)) {
            cursored_buffer = new CursoredBuffer(buffer)
        } else {
            cursored_buffer = buffer
        }
        let decoded_info = {}
        for (const [key, value] of Object.entries(this.schema)) {
            let method_name = typeNameToMethod[value]
            let decoded_value = cursored_buffer['read' + method_name]()
            decoded_info[key] = decoded_value
        }
        return decoded_info
    }
}
