export default class CursoredBuffer {
    _offset = 1
    _utf8_decoder = new TextDecoder("utf-8")
    _utf8_encoder = new TextEncoder("utt-8")

    #toArrayBuffer(buffer) {
        const arrayBuffer = new ArrayBuffer(buffer.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i];
        }
        return arrayBuffer;
    }


    constructor(buffer, startOffset) {
        if (!buffer instanceof ArrayBuffer) {
            this.buffer = this.#toArrayBuffer(buffer)
        } else {
            this.buffer = buffer
        }
        this.view = new DataView(this.buffer)
        this._offset = startOffset == null ? 0 : startOffset
    }

    #readFromView(method, offset_increment) {
        let value = method.bind(this.view)(this._offset)
        this._offset += offset_increment
        return value
    }

    #writeToView(method, offset_increment, value) {
        method.bind(this.view)(this._offset, value)
        this._offset += offset_increment
    }

    readUInt8() {
        return this.#readFromView(this.view.getUint8, 1)
    }

    writeUInt8(value) {
        return this.#writeToView(this.view.setUint8, 1, value)
    }

    readUint16() {
        return this.#readFromView(this.view.getUint16, 2)
    }

    writeUint16(value) {
        return this.#writeToView(this.view.setUint16, 2, value)
    }

    readInt32() {
        return this.#readFromView(this.view.getInt32, 4)
    }

    writeInt32(value) {
        return this.#writeToView(this.view.setInt32, 4, value)
    }

    readBoolean() {
        // this is not best implementation, but i think its "good enough" 
        return Boolean(this.readUInt8())
    }

    writeBoolean(value) {
        return this.writeUInt8(value | 0)
    }
    
    readUTF8() {
        /*
        * reads utf-8 string
        */
       let string_length = this.readUint16();
       let string_bytes = this.view.buffer.slice(this._offset, this._offset + string_length)
       let decoded_string = this._utf8_decoder.decode(string_bytes)
       this._offset += string_length // cause we use utf-8, every byte is one symbol
       return decoded_string
    }

    writeUTF8(value) {
        this.writeUint16(value.length)
        let bytes = new Uint8Array(this._utf8_encoder.encode(value))
        for (const byte of bytes) {
            this.writeUInt8(byte)
        }
    }
}