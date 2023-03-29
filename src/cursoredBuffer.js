export default class CursoredBuffer {
    _offset = 1
    _utf8_decoder = new TextDecoder("utf-8")

     #toArrayBuffer(buffer) {
        const arrayBuffer = new ArrayBuffer(buffer.length);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buffer.length; ++i) {
          view[i] = buffer[i];
        }
        return arrayBuffer;
      }


    constructor(buffer, startOffset) {
        this.buffer = buffer
        this.view = new DataView(this.#toArrayBuffer(buffer))
        this._offset = startOffset
    }

    #readFromView(method, offset_increment) {
        let value = method.bind(this.view)(this._offset)
        this._offset += offset_increment
        return value
    }

    readUint16() {
        return this.#readFromView(this.view.getUint16, 2)
    }
    
    readInt32() {
        return this.#readFromView(this.view.getInt32, 4)
    }
    
    readUInt8() {
        return this.#readFromView(this.view.getUint8, 1)
    }

    readBoolean() {
        // this is not best implementation, but i think its "good enough" 
        return Boolean(this.readUInt8())
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
}