/**
 * Convert a hex string to an ArrayBuffer.
 * 
 * @param {string} hexString - hex representation of bytes
 * @return {ArrayBuffer} - The bytes in an ArrayBuffer.
 */
function hexStringToArrayBuffer(hexString) {
    // remove the leading 0x
    hexString = hexString.replace(/^0x/, '');
    
    // ensure even number of characters
    if (hexString.length % 2 != 0) {
        console.log('WARNING: expecting an even number of characters in the hexString');
    }
    
    // check for some non-hex characters
    var bad = hexString.match(/[G-Z\s]/i);
    if (bad) {
        console.log('WARNING: found non-hex characters', bad);    
    }
    
    // split the string into pairs of octets
    var pairs = hexString.match(/[\dA-F]{2}/gi);
    
    // convert the octets to integers
    var integers = pairs.map(function(s) {
        return parseInt(s, 16);
    });
    
    var array = new Uint8Array(integers);
    
    return array.buffer;
}
import CursoredBuffer from './cursoredBuffer.js';
import SchemaDecoder from './schemaDecoder.js';

import * as schemas from './schemas.js' ;

const DEFAULT_PACKET_OFFSET = 1


let buffer = hexStringToArrayBuffer("06002431303835386164332d316466362d343435322d623164662d353730643338633739303636000d3134352e3233392e302e31393300006aa700")
let cursored_buffer = new CursoredBuffer(buffer, DEFAULT_PACKET_OFFSET)
let decoder = new SchemaDecoder(schemas.serverConnectPacket, cursored_buffer)

console.log(decoder.decode())
