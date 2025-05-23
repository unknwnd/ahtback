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

export type TransferToAnimalShelterMessage = {
    $$type: 'TransferToAnimalShelterMessage';
    shelter_address: Address;
}

export function storeTransferToAnimalShelterMessage(src: TransferToAnimalShelterMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3066446376, 32);
        b_0.storeAddress(src.shelter_address);
    };
}

export function loadTransferToAnimalShelterMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3066446376) { throw Error('Invalid prefix'); }
    const _shelter_address = sc_0.loadAddress();
    return { $$type: 'TransferToAnimalShelterMessage' as const, shelter_address: _shelter_address };
}

function loadTupleTransferToAnimalShelterMessage(source: TupleReader) {
    const _shelter_address = source.readAddress();
    return { $$type: 'TransferToAnimalShelterMessage' as const, shelter_address: _shelter_address };
}

function loadGetterTupleTransferToAnimalShelterMessage(source: TupleReader) {
    const _shelter_address = source.readAddress();
    return { $$type: 'TransferToAnimalShelterMessage' as const, shelter_address: _shelter_address };
}

function storeTupleTransferToAnimalShelterMessage(source: TransferToAnimalShelterMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.shelter_address);
    return builder.build();
}

function dictValueParserTransferToAnimalShelterMessage(): DictionaryValue<TransferToAnimalShelterMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferToAnimalShelterMessage(src)).endCell());
        },
        parse: (src) => {
            return loadTransferToAnimalShelterMessage(src.loadRef().beginParse());
        }
    }
}

export type EmergencyTransferMessage = {
    $$type: 'EmergencyTransferMessage';
    target: Address;
    amount: bigint;
}

export function storeEmergencyTransferMessage(src: EmergencyTransferMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2251700865, 32);
        b_0.storeAddress(src.target);
        b_0.storeCoins(src.amount);
    };
}

export function loadEmergencyTransferMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2251700865) { throw Error('Invalid prefix'); }
    const _target = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    return { $$type: 'EmergencyTransferMessage' as const, target: _target, amount: _amount };
}

function loadTupleEmergencyTransferMessage(source: TupleReader) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'EmergencyTransferMessage' as const, target: _target, amount: _amount };
}

function loadGetterTupleEmergencyTransferMessage(source: TupleReader) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'EmergencyTransferMessage' as const, target: _target, amount: _amount };
}

function storeTupleEmergencyTransferMessage(source: EmergencyTransferMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.target);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserEmergencyTransferMessage(): DictionaryValue<EmergencyTransferMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmergencyTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadEmergencyTransferMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateVotingContractMessage = {
    $$type: 'UpdateVotingContractMessage';
    new_address: Address;
}

export function storeUpdateVotingContractMessage(src: UpdateVotingContractMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(626563495, 32);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateVotingContractMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 626563495) { throw Error('Invalid prefix'); }
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateVotingContractMessage' as const, new_address: _new_address };
}

function loadTupleUpdateVotingContractMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateVotingContractMessage' as const, new_address: _new_address };
}

function loadGetterTupleUpdateVotingContractMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateVotingContractMessage' as const, new_address: _new_address };
}

function storeTupleUpdateVotingContractMessage(source: UpdateVotingContractMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateVotingContractMessage(): DictionaryValue<UpdateVotingContractMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateVotingContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateVotingContractMessage(src.loadRef().beginParse());
        }
    }
}

export type GetStatisticsMessage = {
    $$type: 'GetStatisticsMessage';
}

export function storeGetStatisticsMessage(src: GetStatisticsMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3573077268, 32);
    };
}

export function loadGetStatisticsMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3573077268) { throw Error('Invalid prefix'); }
    return { $$type: 'GetStatisticsMessage' as const };
}

function loadTupleGetStatisticsMessage(source: TupleReader) {
    return { $$type: 'GetStatisticsMessage' as const };
}

function loadGetterTupleGetStatisticsMessage(source: TupleReader) {
    return { $$type: 'GetStatisticsMessage' as const };
}

function storeTupleGetStatisticsMessage(source: GetStatisticsMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetStatisticsMessage(): DictionaryValue<GetStatisticsMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStatisticsMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetStatisticsMessage(src.loadRef().beginParse());
        }
    }
}

export type ConvertToTokenMessage = {
    $$type: 'ConvertToTokenMessage';
    token_address: Address;
    amount: bigint;
}

export function storeConvertToTokenMessage(src: ConvertToTokenMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1511005038, 32);
        b_0.storeAddress(src.token_address);
        b_0.storeCoins(src.amount);
    };
}

export function loadConvertToTokenMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1511005038) { throw Error('Invalid prefix'); }
    const _token_address = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    return { $$type: 'ConvertToTokenMessage' as const, token_address: _token_address, amount: _amount };
}

function loadTupleConvertToTokenMessage(source: TupleReader) {
    const _token_address = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ConvertToTokenMessage' as const, token_address: _token_address, amount: _amount };
}

function loadGetterTupleConvertToTokenMessage(source: TupleReader) {
    const _token_address = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ConvertToTokenMessage' as const, token_address: _token_address, amount: _amount };
}

function storeTupleConvertToTokenMessage(source: ConvertToTokenMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.token_address);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserConvertToTokenMessage(): DictionaryValue<ConvertToTokenMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeConvertToTokenMessage(src)).endCell());
        },
        parse: (src) => {
            return loadConvertToTokenMessage(src.loadRef().beginParse());
        }
    }
}

export type ExternalDonationMessage = {
    $$type: 'ExternalDonationMessage';
}

export function storeExternalDonationMessage(src: ExternalDonationMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(820711374, 32);
    };
}

export function loadExternalDonationMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 820711374) { throw Error('Invalid prefix'); }
    return { $$type: 'ExternalDonationMessage' as const };
}

function loadTupleExternalDonationMessage(source: TupleReader) {
    return { $$type: 'ExternalDonationMessage' as const };
}

function loadGetterTupleExternalDonationMessage(source: TupleReader) {
    return { $$type: 'ExternalDonationMessage' as const };
}

function storeTupleExternalDonationMessage(source: ExternalDonationMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserExternalDonationMessage(): DictionaryValue<ExternalDonationMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExternalDonationMessage(src)).endCell());
        },
        parse: (src) => {
            return loadExternalDonationMessage(src.loadRef().beginParse());
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

export type AnimalHelperPool$Data = {
    $$type: 'AnimalHelperPool$Data';
    owner: Address;
    votingContract: Address;
    lastTransferTime: bigint;
    lastTransferAmount: bigint;
    lastTransferTarget: Address;
    totalDonated: bigint;
    totalTransfers: bigint;
}

export function storeAnimalHelperPool$Data(src: AnimalHelperPool$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.votingContract);
        b_0.storeInt(src.lastTransferTime, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.lastTransferAmount, 257);
        b_1.storeAddress(src.lastTransferTarget);
        b_1.storeInt(src.totalDonated, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.totalTransfers, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAnimalHelperPool$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _votingContract = sc_0.loadAddress();
    const _lastTransferTime = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _lastTransferAmount = sc_1.loadIntBig(257);
    const _lastTransferTarget = sc_1.loadAddress();
    const _totalDonated = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _totalTransfers = sc_2.loadIntBig(257);
    return { $$type: 'AnimalHelperPool$Data' as const, owner: _owner, votingContract: _votingContract, lastTransferTime: _lastTransferTime, lastTransferAmount: _lastTransferAmount, lastTransferTarget: _lastTransferTarget, totalDonated: _totalDonated, totalTransfers: _totalTransfers };
}

function loadTupleAnimalHelperPool$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _votingContract = source.readAddress();
    const _lastTransferTime = source.readBigNumber();
    const _lastTransferAmount = source.readBigNumber();
    const _lastTransferTarget = source.readAddress();
    const _totalDonated = source.readBigNumber();
    const _totalTransfers = source.readBigNumber();
    return { $$type: 'AnimalHelperPool$Data' as const, owner: _owner, votingContract: _votingContract, lastTransferTime: _lastTransferTime, lastTransferAmount: _lastTransferAmount, lastTransferTarget: _lastTransferTarget, totalDonated: _totalDonated, totalTransfers: _totalTransfers };
}

function loadGetterTupleAnimalHelperPool$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _votingContract = source.readAddress();
    const _lastTransferTime = source.readBigNumber();
    const _lastTransferAmount = source.readBigNumber();
    const _lastTransferTarget = source.readAddress();
    const _totalDonated = source.readBigNumber();
    const _totalTransfers = source.readBigNumber();
    return { $$type: 'AnimalHelperPool$Data' as const, owner: _owner, votingContract: _votingContract, lastTransferTime: _lastTransferTime, lastTransferAmount: _lastTransferAmount, lastTransferTarget: _lastTransferTarget, totalDonated: _totalDonated, totalTransfers: _totalTransfers };
}

function storeTupleAnimalHelperPool$Data(source: AnimalHelperPool$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.votingContract);
    builder.writeNumber(source.lastTransferTime);
    builder.writeNumber(source.lastTransferAmount);
    builder.writeAddress(source.lastTransferTarget);
    builder.writeNumber(source.totalDonated);
    builder.writeNumber(source.totalTransfers);
    return builder.build();
}

function dictValueParserAnimalHelperPool$Data(): DictionaryValue<AnimalHelperPool$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAnimalHelperPool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAnimalHelperPool$Data(src.loadRef().beginParse());
        }
    }
}

 type AnimalHelperPool_init_args = {
    $$type: 'AnimalHelperPool_init_args';
    owner: Address;
    votingContract: Address;
}

function initAnimalHelperPool_init_args(src: AnimalHelperPool_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.votingContract);
    };
}

async function AnimalHelperPool_init(owner: Address, votingContract: Address) {
    const __code = Cell.fromHex('b5ee9c72410210010005af00025aff008e88f4a413f4bcf2c80bed53208e983001d072d721d200d200fa4021103450666f04f86102f862e1ed43d9010301d9a651477b5134348000638a7e903e9020404075c035007420404075c03e9020404075c0350c3420404075c00c0411c41184115b05e38c7e903e901640b4405c151c002342180000000000000000000000000000000000000000000000000000000000000000011678b6cf1b1c600200022601feed44d0d200018e29fa40fa40810101d700d401d0810101d700fa40810101d700d430d0810101d700301047104610456c178e31fa40fa405902d101705470008d086000000000000000000000000000000000000000000000000000000000000000000459e208925f08e07027d74920c21f953107d31f08de218210b6c642280403febae30221821086363a81ba8ef110255f0503fa40fa0059328138c6f8425250c705f2f48200ca2af8276f105230bbf2f47f72c87001cb1fc92343132502146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00f82306a4104610354130e0050c0701fe10255f0503fa4001318200a5c3f8425230c705917f96f8425240c705e2f2f4f8276f10aa027aa9048200ca2a21821005f5e100bcf2f4f823531208a47f72c87001cb1fc9104710231026146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c90106007efb001046103544145033c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed5404fc218210255899a7ba8e4d5b3405fa4001318138c6f8425260c705f2f4104645155034c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed54e0218210d4f8d514bae3022182105a101b6ebae30221821030eb0fcebae302218210fac86711ba08090a0b01be5b36c85260cb3f5270cb1f5230cb3f5220cb3f21cf16f8276f1001cb3fc9f84270588042015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00104655130c01e85b06fa40fa0059328138c6f8425280c705f2f48200ca2af8276f105230bbf2f47f72c8821015a038fb01cb1f7001cb3ff828cf16c910341023146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00104655130c008e5b36f8416f24135f0316a010461035440302c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed5403d88ed05b368138c6f8425260c705f2f4f8427070810082036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513e0218210946a98b6bae30238c00007c12117b0e3025f07f2c0820c0d0f006ac87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed5401b05b06d33f0131c8018210aff90f5758cb1fcb3fc91057104610354430f84201706ddb3cc87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed540e00a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00008af8416f24135f0316a010461035440302c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed545af281ed');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initAnimalHelperPool_init_args({ $$type: 'AnimalHelperPool_init_args', owner, votingContract })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const AnimalHelperPool_errors = {
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
    42435: { message: `Not authorized` },
    51754: { message: `Insufficient funds` },
} as const

export const AnimalHelperPool_errors_backward = {
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
    "Not authorized": 42435,
    "Insufficient funds": 51754,
} as const

const AnimalHelperPool_types: ABIType[] = [
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
    {"name":"TransferToAnimalShelterMessage","header":3066446376,"fields":[{"name":"shelter_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"EmergencyTransferMessage","header":2251700865,"fields":[{"name":"target","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpdateVotingContractMessage","header":626563495,"fields":[{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetStatisticsMessage","header":3573077268,"fields":[]},
    {"name":"ConvertToTokenMessage","header":1511005038,"fields":[{"name":"token_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ExternalDonationMessage","header":820711374,"fields":[]},
    {"name":"EmergencyWithdrawMessage","header":4207437585,"fields":[]},
    {"name":"AnimalHelperPool$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"votingContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"lastTransferTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastTransferAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastTransferTarget","type":{"kind":"simple","type":"address","optional":false}},{"name":"totalDonated","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalTransfers","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const AnimalHelperPool_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "TransferToAnimalShelterMessage": 3066446376,
    "EmergencyTransferMessage": 2251700865,
    "UpdateVotingContractMessage": 626563495,
    "GetStatisticsMessage": 3573077268,
    "ConvertToTokenMessage": 1511005038,
    "ExternalDonationMessage": 820711374,
    "EmergencyWithdrawMessage": 4207437585,
}

const AnimalHelperPool_getters: ABIGetter[] = [
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const AnimalHelperPool_getterMapping: { [key: string]: string } = {
    'owner': 'getOwner',
}

const AnimalHelperPool_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferToAnimalShelterMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyTransferMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateVotingContractMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetStatisticsMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ConvertToTokenMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ExternalDonationMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyWithdrawMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class AnimalHelperPool implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = AnimalHelperPool_errors_backward;
    public static readonly opcodes = AnimalHelperPool_opcodes;
    
    static async init(owner: Address, votingContract: Address) {
        return await AnimalHelperPool_init(owner, votingContract);
    }
    
    static async fromInit(owner: Address, votingContract: Address) {
        const __gen_init = await AnimalHelperPool_init(owner, votingContract);
        const address = contractAddress(0, __gen_init);
        return new AnimalHelperPool(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new AnimalHelperPool(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  AnimalHelperPool_types,
        getters: AnimalHelperPool_getters,
        receivers: AnimalHelperPool_receivers,
        errors: AnimalHelperPool_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | TransferToAnimalShelterMessage | EmergencyTransferMessage | UpdateVotingContractMessage | GetStatisticsMessage | ConvertToTokenMessage | ExternalDonationMessage | EmergencyWithdrawMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferToAnimalShelterMessage') {
            body = beginCell().store(storeTransferToAnimalShelterMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EmergencyTransferMessage') {
            body = beginCell().store(storeEmergencyTransferMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateVotingContractMessage') {
            body = beginCell().store(storeUpdateVotingContractMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetStatisticsMessage') {
            body = beginCell().store(storeGetStatisticsMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ConvertToTokenMessage') {
            body = beginCell().store(storeConvertToTokenMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ExternalDonationMessage') {
            body = beginCell().store(storeExternalDonationMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EmergencyWithdrawMessage') {
            body = beginCell().store(storeEmergencyWithdrawMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
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