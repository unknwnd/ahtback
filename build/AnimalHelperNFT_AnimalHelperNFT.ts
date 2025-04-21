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

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type GetCollectionDataMessage = {
    $$type: 'GetCollectionDataMessage';
}

export function storeGetCollectionDataMessage(src: GetCollectionDataMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3384592759, 32);
    };
}

export function loadGetCollectionDataMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3384592759) { throw Error('Invalid prefix'); }
    return { $$type: 'GetCollectionDataMessage' as const };
}

function loadTupleGetCollectionDataMessage(source: TupleReader) {
    return { $$type: 'GetCollectionDataMessage' as const };
}

function loadGetterTupleGetCollectionDataMessage(source: TupleReader) {
    return { $$type: 'GetCollectionDataMessage' as const };
}

function storeTupleGetCollectionDataMessage(source: GetCollectionDataMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetCollectionDataMessage(): DictionaryValue<GetCollectionDataMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetCollectionDataMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetCollectionDataMessage(src.loadRef().beginParse());
        }
    }
}

export type NFTAddressByIndexMessage = {
    $$type: 'NFTAddressByIndexMessage';
    index: bigint;
}

export function storeNFTAddressByIndexMessage(src: NFTAddressByIndexMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3046504829, 32);
        b_0.storeUint(src.index, 64);
    };
}

export function loadNFTAddressByIndexMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3046504829) { throw Error('Invalid prefix'); }
    const _index = sc_0.loadUintBig(64);
    return { $$type: 'NFTAddressByIndexMessage' as const, index: _index };
}

function loadTupleNFTAddressByIndexMessage(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'NFTAddressByIndexMessage' as const, index: _index };
}

function loadGetterTupleNFTAddressByIndexMessage(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'NFTAddressByIndexMessage' as const, index: _index };
}

function storeTupleNFTAddressByIndexMessage(source: NFTAddressByIndexMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserNFTAddressByIndexMessage(): DictionaryValue<NFTAddressByIndexMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTAddressByIndexMessage(src)).endCell());
        },
        parse: (src) => {
            return loadNFTAddressByIndexMessage(src.loadRef().beginParse());
        }
    }
}

export type GetNFTContentMessage = {
    $$type: 'GetNFTContentMessage';
    index: bigint;
}

export function storeGetNFTContentMessage(src: GetNFTContentMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2698891704, 32);
        b_0.storeUint(src.index, 64);
    };
}

export function loadGetNFTContentMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2698891704) { throw Error('Invalid prefix'); }
    const _index = sc_0.loadUintBig(64);
    return { $$type: 'GetNFTContentMessage' as const, index: _index };
}

function loadTupleGetNFTContentMessage(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'GetNFTContentMessage' as const, index: _index };
}

function loadGetterTupleGetNFTContentMessage(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'GetNFTContentMessage' as const, index: _index };
}

function storeTupleGetNFTContentMessage(source: GetNFTContentMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserGetNFTContentMessage(): DictionaryValue<GetNFTContentMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNFTContentMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetNFTContentMessage(src.loadRef().beginParse());
        }
    }
}

export type MintNFTMessage = {
    $$type: 'MintNFTMessage';
    recipient: Address;
    batchCount: bigint;
}

export function storeMintNFTMessage(src: MintNFTMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3407120329, 32);
        b_0.storeAddress(src.recipient);
        b_0.storeUint(src.batchCount, 32);
    };
}

export function loadMintNFTMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3407120329) { throw Error('Invalid prefix'); }
    const _recipient = sc_0.loadAddress();
    const _batchCount = sc_0.loadUintBig(32);
    return { $$type: 'MintNFTMessage' as const, recipient: _recipient, batchCount: _batchCount };
}

function loadTupleMintNFTMessage(source: TupleReader) {
    const _recipient = source.readAddress();
    const _batchCount = source.readBigNumber();
    return { $$type: 'MintNFTMessage' as const, recipient: _recipient, batchCount: _batchCount };
}

function loadGetterTupleMintNFTMessage(source: TupleReader) {
    const _recipient = source.readAddress();
    const _batchCount = source.readBigNumber();
    return { $$type: 'MintNFTMessage' as const, recipient: _recipient, batchCount: _batchCount };
}

function storeTupleMintNFTMessage(source: MintNFTMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.recipient);
    builder.writeNumber(source.batchCount);
    return builder.build();
}

function dictValueParserMintNFTMessage(): DictionaryValue<MintNFTMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintNFTMessage(src)).endCell());
        },
        parse: (src) => {
            return loadMintNFTMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateTokenContractMessage = {
    $$type: 'UpdateTokenContractMessage';
    new_token_contract: Address;
}

export function storeUpdateTokenContractMessage(src: UpdateTokenContractMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2730135765, 32);
        b_0.storeAddress(src.new_token_contract);
    };
}

export function loadUpdateTokenContractMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2730135765) { throw Error('Invalid prefix'); }
    const _new_token_contract = sc_0.loadAddress();
    return { $$type: 'UpdateTokenContractMessage' as const, new_token_contract: _new_token_contract };
}

function loadTupleUpdateTokenContractMessage(source: TupleReader) {
    const _new_token_contract = source.readAddress();
    return { $$type: 'UpdateTokenContractMessage' as const, new_token_contract: _new_token_contract };
}

function loadGetterTupleUpdateTokenContractMessage(source: TupleReader) {
    const _new_token_contract = source.readAddress();
    return { $$type: 'UpdateTokenContractMessage' as const, new_token_contract: _new_token_contract };
}

function storeTupleUpdateTokenContractMessage(source: UpdateTokenContractMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.new_token_contract);
    return builder.build();
}

function dictValueParserUpdateTokenContractMessage(): DictionaryValue<UpdateTokenContractMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateTokenContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTokenContractMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateContentMessage = {
    $$type: 'UpdateContentMessage';
    new_content: Cell;
}

export function storeUpdateContentMessage(src: UpdateContentMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(616724939, 32);
        b_0.storeRef(src.new_content);
    };
}

export function loadUpdateContentMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 616724939) { throw Error('Invalid prefix'); }
    const _new_content = sc_0.loadRef();
    return { $$type: 'UpdateContentMessage' as const, new_content: _new_content };
}

function loadTupleUpdateContentMessage(source: TupleReader) {
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage' as const, new_content: _new_content };
}

function loadGetterTupleUpdateContentMessage(source: TupleReader) {
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage' as const, new_content: _new_content };
}

function storeTupleUpdateContentMessage(source: UpdateContentMessage) {
    const builder = new TupleBuilder();
    builder.writeCell(source.new_content);
    return builder.build();
}

function dictValueParserUpdateContentMessage(): DictionaryValue<UpdateContentMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateContentMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateContentMessage(src.loadRef().beginParse());
        }
    }
}

export type EmergencyWithdrawMessage = {
    $$type: 'EmergencyWithdrawMessage';
}

export function storeEmergencyWithdrawMessage(src: EmergencyWithdrawMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4207437585, 32);
    };
}

export function loadEmergencyWithdrawMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4207437585) { throw Error('Invalid prefix'); }
    return { $$type: 'EmergencyWithdrawMessage' as const };
}

function loadTupleEmergencyWithdrawMessage(source: TupleReader) {
    return { $$type: 'EmergencyWithdrawMessage' as const };
}

function loadGetterTupleEmergencyWithdrawMessage(source: TupleReader) {
    return { $$type: 'EmergencyWithdrawMessage' as const };
}

function storeTupleEmergencyWithdrawMessage(source: EmergencyWithdrawMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserEmergencyWithdrawMessage(): DictionaryValue<EmergencyWithdrawMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmergencyWithdrawMessage(src)).endCell());
        },
        parse: (src) => {
            return loadEmergencyWithdrawMessage(src.loadRef().beginParse());
        }
    }
}

export type NFTData = {
    $$type: 'NFTData';
    index: bigint;
    collection: Address;
    owner: Address;
    content: Cell;
}

export function storeNFTData(src: NFTData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadNFTData(slice: Slice) {
    const sc_0 = slice;
    const _index = sc_0.loadIntBig(257);
    const _collection = sc_0.loadAddress();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    return { $$type: 'NFTData' as const, index: _index, collection: _collection, owner: _owner, content: _content };
}

function loadTupleNFTData(source: TupleReader) {
    const _index = source.readBigNumber();
    const _collection = source.readAddress();
    const _owner = source.readAddress();
    const _content = source.readCell();
    return { $$type: 'NFTData' as const, index: _index, collection: _collection, owner: _owner, content: _content };
}

function loadGetterTupleNFTData(source: TupleReader) {
    const _index = source.readBigNumber();
    const _collection = source.readAddress();
    const _owner = source.readAddress();
    const _content = source.readCell();
    return { $$type: 'NFTData' as const, index: _index, collection: _collection, owner: _owner, content: _content };
}

function storeTupleNFTData(source: NFTData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserNFTData(): DictionaryValue<NFTData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTData(src)).endCell());
        },
        parse: (src) => {
            return loadNFTData(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    nextIndex: bigint;
    owner: Address;
    content: Cell;
    nftItemCode: Cell;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.nextIndex, 257);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.nftItemCode);
    };
}

export function loadCollectionData(slice: Slice) {
    const sc_0 = slice;
    const _nextIndex = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _nftItemCode = sc_0.loadRef();
    return { $$type: 'CollectionData' as const, nextIndex: _nextIndex, owner: _owner, content: _content, nftItemCode: _nftItemCode };
}

function loadTupleCollectionData(source: TupleReader) {
    const _nextIndex = source.readBigNumber();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _nftItemCode = source.readCell();
    return { $$type: 'CollectionData' as const, nextIndex: _nextIndex, owner: _owner, content: _content, nftItemCode: _nftItemCode };
}

function loadGetterTupleCollectionData(source: TupleReader) {
    const _nextIndex = source.readBigNumber();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _nftItemCode = source.readCell();
    return { $$type: 'CollectionData' as const, nextIndex: _nextIndex, owner: _owner, content: _content, nftItemCode: _nftItemCode };
}

function storeTupleCollectionData(source: CollectionData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nextIndex);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.nftItemCode);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type AnimalHelperNFT$Data = {
    $$type: 'AnimalHelperNFT$Data';
    owner: Address;
    nextIndex: bigint;
    content: Cell;
    nftItemCode: Cell;
    tokenContract: Address;
}

export function storeAnimalHelperNFT$Data(src: AnimalHelperNFT$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.nextIndex, 257);
        b_0.storeRef(src.content);
        b_0.storeRef(src.nftItemCode);
        b_0.storeAddress(src.tokenContract);
    };
}

export function loadAnimalHelperNFT$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _nextIndex = sc_0.loadIntBig(257);
    const _content = sc_0.loadRef();
    const _nftItemCode = sc_0.loadRef();
    const _tokenContract = sc_0.loadAddress();
    return { $$type: 'AnimalHelperNFT$Data' as const, owner: _owner, nextIndex: _nextIndex, content: _content, nftItemCode: _nftItemCode, tokenContract: _tokenContract };
}

function loadTupleAnimalHelperNFT$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _nextIndex = source.readBigNumber();
    const _content = source.readCell();
    const _nftItemCode = source.readCell();
    const _tokenContract = source.readAddress();
    return { $$type: 'AnimalHelperNFT$Data' as const, owner: _owner, nextIndex: _nextIndex, content: _content, nftItemCode: _nftItemCode, tokenContract: _tokenContract };
}

function loadGetterTupleAnimalHelperNFT$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _nextIndex = source.readBigNumber();
    const _content = source.readCell();
    const _nftItemCode = source.readCell();
    const _tokenContract = source.readAddress();
    return { $$type: 'AnimalHelperNFT$Data' as const, owner: _owner, nextIndex: _nextIndex, content: _content, nftItemCode: _nftItemCode, tokenContract: _tokenContract };
}

function storeTupleAnimalHelperNFT$Data(source: AnimalHelperNFT$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.nextIndex);
    builder.writeCell(source.content);
    builder.writeCell(source.nftItemCode);
    builder.writeAddress(source.tokenContract);
    return builder.build();
}

function dictValueParserAnimalHelperNFT$Data(): DictionaryValue<AnimalHelperNFT$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAnimalHelperNFT$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAnimalHelperNFT$Data(src.loadRef().beginParse());
        }
    }
}

 type AnimalHelperNFT_init_args = {
    $$type: 'AnimalHelperNFT_init_args';
    owner: Address;
    tokenContract: Address;
    content: Cell;
    nftItemCode: Cell;
}

function initAnimalHelperNFT_init_args(src: AnimalHelperNFT_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.tokenContract);
        b_0.storeRef(src.content);
        b_0.storeRef(src.nftItemCode);
    };
}

async function AnimalHelperNFT_init(owner: Address, tokenContract: Address, content: Cell, nftItemCode: Cell) {
    const __code = Cell.fromHex('b5ee9c72410214010004d200022cff008e88f4a413f4bcf2c80bed53208e8130e1ed43d90103015ba651477b513434800067fe9020404075c035353e9015501b0567be903e903535154c013455409c00f8b6cf1b14600200022404de01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200019ffa40810101d700d4d4fa4055406c159efa40fa40d4d4553004d155027003e206925f06e004d70d1ff2e082218210cb1487c9bae302218210a2ba90d5bae30221821024c279cbbae302218210fac86711ba0407080901be31fa40d31f59328200a5c3f8425280c705917f96f8425260c705e2f2f4820a625a0022a88200a3c5f8416f24135f0358bef2f4018e8b1034413525db3c50454330e4304034c87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed540502f024a41056553006db3c5c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d08209c9c38072c87101cb1f500bcf16c94540103a41a010354144037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf818ae2f400c901fb0055031006001a58cf8680cf8480f400f400cf81005c313504fa4001318138c6f8425240c705f2f44430c87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed5400586c21d401318138c6f8425240c705f2f44034c87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed5403fe8e675b8138c6f8425240c705f2f4f8427070810082036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb004034c87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed54e0218210946a98b6bae302218210c9bcc977bae302210a0c0e017031d33f0131c8018210aff90f5758cb1fcb3fc910354430f84201706ddb3cc87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed540b00a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001e65b4034db3cf84214705043804206c855305034810101cf0001cf16ccccc9c8ccc941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed540d00085473422403fc8210b595f97dba8ee831d33f013110354430db3cf842708042c85004cf16c941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed54e0018210a0ddd1b8bae3025f060f1113015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0100014c8f828cf16cb3fc9522001cad33f013110354430db3cf842708042c814ccc941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca0055405054cf1612810101cf00cc12cc01cf16c9ed5412000ec85240cccb3fc90006f2c08255dcac4d');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initAnimalHelperNFT_init_args({ $$type: 'AnimalHelperNFT_init_args', owner, tokenContract, content, nftItemCode })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const AnimalHelperNFT_errors = {
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
    14534: { message: `Not owner` },
    41925: { message: `Insufficient funds for minting` },
    42435: { message: `Not authorized` },
} as const

export const AnimalHelperNFT_errors_backward = {
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
    "Not owner": 14534,
    "Insufficient funds for minting": 41925,
    "Not authorized": 42435,
} as const

const AnimalHelperNFT_types: ABIType[] = [
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
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetCollectionDataMessage","header":3384592759,"fields":[]},
    {"name":"NFTAddressByIndexMessage","header":3046504829,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetNFTContentMessage","header":2698891704,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"MintNFTMessage","header":3407120329,"fields":[{"name":"recipient","type":{"kind":"simple","type":"address","optional":false}},{"name":"batchCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"UpdateTokenContractMessage","header":2730135765,"fields":[{"name":"new_token_contract","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateContentMessage","header":616724939,"fields":[{"name":"new_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"EmergencyWithdrawMessage","header":4207437585,"fields":[]},
    {"name":"NFTData","header":null,"fields":[{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"nextIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"nftItemCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"AnimalHelperNFT$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"nextIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"nftItemCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"tokenContract","type":{"kind":"simple","type":"address","optional":false}}]},
]

const AnimalHelperNFT_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "GetCollectionDataMessage": 3384592759,
    "NFTAddressByIndexMessage": 3046504829,
    "GetNFTContentMessage": 2698891704,
    "MintNFTMessage": 3407120329,
    "UpdateTokenContractMessage": 2730135765,
    "UpdateContentMessage": 616724939,
    "EmergencyWithdrawMessage": 4207437585,
}

const AnimalHelperNFT_getters: ABIGetter[] = [
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const AnimalHelperNFT_getterMapping: { [key: string]: string } = {
    'owner': 'getOwner',
}

const AnimalHelperNFT_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"MintNFTMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateTokenContractMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateContentMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyWithdrawMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetCollectionDataMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NFTAddressByIndexMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetNFTContentMessage"}},
]


export class AnimalHelperNFT implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = AnimalHelperNFT_errors_backward;
    public static readonly opcodes = AnimalHelperNFT_opcodes;
    
    static async init(owner: Address, tokenContract: Address, content: Cell, nftItemCode: Cell) {
        return await AnimalHelperNFT_init(owner, tokenContract, content, nftItemCode);
    }
    
    static async fromInit(owner: Address, tokenContract: Address, content: Cell, nftItemCode: Cell) {
        const __gen_init = await AnimalHelperNFT_init(owner, tokenContract, content, nftItemCode);
        const address = contractAddress(0, __gen_init);
        return new AnimalHelperNFT(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new AnimalHelperNFT(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AnimalHelperNFT_types,
        getters: AnimalHelperNFT_getters,
        receivers: AnimalHelperNFT_receivers,
        errors: AnimalHelperNFT_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: MintNFTMessage | UpdateTokenContractMessage | UpdateContentMessage | EmergencyWithdrawMessage | Deploy | GetCollectionDataMessage | NFTAddressByIndexMessage | GetNFTContentMessage) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintNFTMessage') {
            body = beginCell().store(storeMintNFTMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateTokenContractMessage') {
            body = beginCell().store(storeUpdateTokenContractMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateContentMessage') {
            body = beginCell().store(storeUpdateContentMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EmergencyWithdrawMessage') {
            body = beginCell().store(storeEmergencyWithdrawMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetCollectionDataMessage') {
            body = beginCell().store(storeGetCollectionDataMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NFTAddressByIndexMessage') {
            body = beginCell().store(storeNFTAddressByIndexMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetNFTContentMessage') {
            body = beginCell().store(storeGetNFTContentMessage(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}