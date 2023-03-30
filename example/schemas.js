const serverConnectPacket = {
    'packet_type': 'u8',
    'token': 'string',
    'host': 'string',
    'port': 'i32',
    'priority': 'boolean',
}

const clientConnectPacket = {
    'packet_type': 'u8',
    'token': 'string',
    'protocol_version': 'string',
}

export {serverConnectPacket}