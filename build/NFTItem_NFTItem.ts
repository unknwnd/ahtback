import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type InitNFTMessage = {
    $$type: 'InitNFTMessage';
    op: bigint;
    new_owner: Address;
}

export function storeInitNFTMessage(src: InitNFTMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(277399224, 32);
        b_0.storeUint(src.op, 32);
        b_0.storeAddress(src.new_owner);
    };
}

export function loadInitNFTMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 277399224) { throw Error('Invalid prefix'); }
    const _op = sc_0.loadUintBig(32);
    const _new_owner = sc_0.loadAddress();
    return { $$type: 'InitNFTMessage' as const, op: _op, new_owner: _new_owner };
}

function loadTupleInitNFTMessage(source: TupleReader) {
    const _op = source.readBigNumber();
    const _new_owner = source.readAddress();
    return { $$type: 'InitNFTMessage' as const, op: _op, new_owner: _new_owner };
}

function loadGetterTupleInitNFTMessage(source: TupleReader) {
    const _op = source.readBigNumber();
    const _new_owner = source.readAddress();
    return { $$type: 'InitNFTMessage' as const, op: _op, new_owner: _new_owner };
}

function storeTupleInitNFTMessage(source: InitNFTMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeAddress(source.new_owner);
    return builder.build();
}

function dictValueParserInitNFTMessage(): DictionaryValue<InitNFTMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInitNFTMessage(src)).endCell());
        },
        parse: (src) => {
            return loadInitNFTMessage(src.loadRef().beginParse());
        }
    }
}

export type GetNFTDataMessage = {
    $$type: 'GetNFTDataMessage';
}

export function storeGetNFTDataMessage(src: GetNFTDataMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4004675928, 32);
    };
}

export function loadGetNFTDataMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4004675928) { throw Error('Invalid prefix'); }
    return { $$type: 'GetNFTDataMessage' as const };
}

function loadTupleGetNFTDataMessage(source: TupleReader) {
    return { $$type: 'GetNFTDataMessage' as const };
}

function loadGetterTupleGetNFTDataMessage(source: TupleReader) {
    return { $$type: 'GetNFTDataMessage' as const };
}

function storeTupleGetNFTDataMessage(source: GetNFTDataMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetNFTDataMessage(): DictionaryValue<GetNFTDataMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNFTDataMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetNFTDataMessage(src.loadRef().beginParse());
        }
    }
}

export type TransferMessage = {
    $$type: 'TransferMessage';
    to: Address;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeTransferMessage(src: TransferMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(327117880, 32);
        b_0.storeAddress(src.to);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTransferMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 327117880) { throw Error('Invalid prefix'); }
    const _to = sc_0.loadAddress();
    const _response_destination = sc_0.loadAddress();
    const _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TransferMessage' as const, to: _to, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTransferMessage(source: TupleReader) {
    const _to = source.readAddress();
    const _response_destination = source.readAddress();
    const _custom_payload = source.readCellOpt();
    return { $$type: 'TransferMessage' as const, to: _to, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleTransferMessage(source: TupleReader) {
    const _to = source.readAddress();
    const _response_destination = source.readAddress();
    const _custom_payload = source.readCellOpt();
    return { $$type: 'TransferMessage' as const, to: _to, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTransferMessage(source: TransferMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTransferMessage(): DictionaryValue<TransferMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadTransferMessage(src.loadRef().beginParse());
        }
    }
}

export type ExchangeMessage = {
    $$type: 'ExchangeMessage';
    token_wallet: Address;
    min_token_amount: bigint;
}

export function storeExchangeMessage(src: ExchangeMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3857011941, 32);
        b_0.storeAddress(src.token_wallet);
        b_0.storeCoins(src.min_token_amount);
    };
}

export function loadExchangeMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3857011941) { throw Error('Invalid prefix'); }
    const _token_wallet = sc_0.loadAddress();
    const _min_token_amount = sc_0.loadCoins();
    return { $$type: 'ExchangeMessage' as const, token_wallet: _token_wallet, min_token_amount: _min_token_amount };
}

function loadTupleExchangeMessage(source: TupleReader) {
    const _token_wallet = source.readAddress();
    const _min_token_amount = source.readBigNumber();
    return { $$type: 'ExchangeMessage' as const, token_wallet: _token_wallet, min_token_amount: _min_token_amount };
}

function loadGetterTupleExchangeMessage(source: TupleReader) {
    const _token_wallet = source.readAddress();
    const _min_token_amount = source.readBigNumber();
    return { $$type: 'ExchangeMessage' as const, token_wallet: _token_wallet, min_token_amount: _min_token_amount };
}

function storeTupleExchangeMessage(source: ExchangeMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.token_wallet);
    builder.writeNumber(source.min_token_amount);
    return builder.build();
}

function dictValueParserExchangeMessage(): DictionaryValue<ExchangeMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExchangeMessage(src)).endCell());
        },
        parse: (src) => {
            return loadExchangeMessage(src.loadRef().beginParse());
        }
    }
}

export type NFTItem$Data = {
    $$type: 'NFTItem$Data';
    collection: Address;
    index: bigint;
    owner: Address;
}

export function storeNFTItem$Data(src: NFTItem$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.collection);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.owner);
    };
}

export function loadNFTItem$Data(slice: Slice) {
    const sc_0 = slice;
    const _collection = sc_0.loadAddress();
    const _index = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    return { $$type: 'NFTItem$Data' as const, collection: _collection, index: _index, owner: _owner };
}

function loadTupleNFTItem$Data(source: TupleReader) {
    const _collection = source.readAddress();
    const _index = source.readBigNumber();
    const _owner = source.readAddress();
    return { $$type: 'NFTItem$Data' as const, collection: _collection, index: _index, owner: _owner };
}

function loadGetterTupleNFTItem$Data(source: TupleReader) {
    const _collection = source.readAddress();
    const _index = source.readBigNumber();
    const _owner = source.readAddress();
    return { $$type: 'NFTItem$Data' as const, collection: _collection, index: _index, owner: _owner };
}

function storeTupleNFTItem$Data(source: NFTItem$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.collection);
    builder.writeNumber(source.index);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserNFTItem$Data(): DictionaryValue<NFTItem$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTItem$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNFTItem$Data(src.loadRef().beginParse());
        }
    }
}

 type NFTItem_init_args = {
    $$type: 'NFTItem_init_args';
    collection: Address;
    index: bigint;
}

function initNFTItem_init_args(src: NFTItem_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.collection);
        b_0.storeInt(src.index, 257);
    };
}

async function NFTItem_init(collection: Address, index: bigint) {
    const __code = Cell.fromHex('b5ee9c724102090100034c000114ff00208e8130e1f2c80b0104e401d072d721d200d200fa4021103450666f04f86102f862ed44d0d200019dfa40810101d700fa4055206c139cfa40810101d7005902d10121e204925f04e07023d74920c21f953103d31f04de2182101088c6b8bae302218210eeb28158bae302218210137f6c38bae302218210e5e554e5ba0203040600685b3301d31ffa4059328200a5c3f8425240c705f2f48117d901c001f2f412c87f01ca0055205acf1612810101cf0001cf16c9ed5400d45b32c85220cb3fc9f842708042c85260cb3f25cf1627cf1614ccc941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c87f01ca0055205acf1612810101cf0001cf16c9ed5401c45b02fa40fa40d2000191d4926d01e25520338200a5c3f84217c70516f2f48d086000000000000000000000000000000000000000000000000000000000000000000425c705b3923430e30d02c87f01ca0055205acf1612810101cf0001cf16c9ed540500c6c8c9226eb3983001206ef2d080019132e2708042c8821078d6c8fb01cb1f5220cb3ff842cf1614ccc9103641605a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002fe8efd5b02fa40fa0059328200a5c3f84216c70515f2f48113888200f7c25121bb12f2f4217f820afaf08072c882107362d09c01cb1f7001cb3f25fa02f842cf16c91048146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb007f708042c8070800ce821005138d9101cb1f5260cb3ff842cf165004fa02c9245044146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002c87f01ca0055205acf1612810101cf0001cf16c9ed5400dae034c00003c12113b08e5cf8425230c705b38e3b227080406d5a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00de02c87f01ca0055205acf1612810101cf0001cf16c9ed54e05f03f2c08200776332');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initNFTItem_init_args({ $$type: 'NFTItem_init_args', collection, index })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const NFTItem_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    138: { message: `Not a basechain address` },
    6105: { message: `Invalid operation` },
    42435: { message: `Not authorized` },
    63426: { message: `Token amount too high` },
} as const

export const NFTItem_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "Invalid operation": 6105,
    "Not authorized": 42435,
    "Token amount too high": 63426,
} as const

const NFTItem_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitNFTMessage","header":277399224,"fields":[{"name":"op","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNFTDataMessage","header":4004675928,"fields":[]},
    {"name":"TransferMessage","header":327117880,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"ExchangeMessage","header":3857011941,"fields":[{"name":"token_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"min_token_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"NFTItem$Data","header":null,"fields":[{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const NFTItem_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "InitNFTMessage": 277399224,
    "GetNFTDataMessage": 4004675928,
    "TransferMessage": 327117880,
    "ExchangeMessage": 3857011941,
}

const NFTItem_getters: ABIGetter[] = [
]

export const NFTItem_getterMapping: { [key: string]: string } = {
}

const NFTItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"InitNFTMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetNFTDataMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExchangeMessage"}},
    {"receiver":"internal","message":{"kind":"empty"}},
]


export class NFTItem implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = NFTItem_errors_backward;
    public static readonly opcodes = NFTItem_opcodes;
    
    static async init(collection: Address, index: bigint) {
        return await NFTItem_init(collection, index);
    }
    
    static async fromInit(collection: Address, index: bigint) {
        const __gen_init = await NFTItem_init(collection, index);
        const address = contractAddress(0, __gen_init);
        return new NFTItem(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new NFTItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NFTItem_types,
        getters: NFTItem_getters,
        receivers: NFTItem_receivers,
        errors: NFTItem_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: InitNFTMessage | GetNFTDataMessage | TransferMessage | ExchangeMessage | null) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InitNFTMessage') {
            body = beginCell().store(storeInitNFTMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetNFTDataMessage') {
            body = beginCell().store(storeGetNFTDataMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferMessage') {
            body = beginCell().store(storeTransferMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExchangeMessage') {
            body = beginCell().store(storeExchangeMessage(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}