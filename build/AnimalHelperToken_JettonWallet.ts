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

export type GetWalletDataMessage = {
    $$type: 'GetWalletDataMessage';
}

export function storeGetWalletDataMessage(src: GetWalletDataMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3083284313, 32);
    };
}

export function loadGetWalletDataMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3083284313) { throw Error('Invalid prefix'); }
    return { $$type: 'GetWalletDataMessage' as const };
}

function loadTupleGetWalletDataMessage(source: TupleReader) {
    return { $$type: 'GetWalletDataMessage' as const };
}

function loadGetterTupleGetWalletDataMessage(source: TupleReader) {
    return { $$type: 'GetWalletDataMessage' as const };
}

function storeTupleGetWalletDataMessage(source: GetWalletDataMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetWalletDataMessage(): DictionaryValue<GetWalletDataMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetWalletDataMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetWalletDataMessage(src.loadRef().beginParse());
        }
    }
}

export type InternalTransferMessage = {
    $$type: 'InternalTransferMessage';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeInternalTransferMessage(src: InternalTransferMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2575040957, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadInternalTransferMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2575040957) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _from = sc_0.loadAddress();
    const _response_destination = sc_0.loadAddress();
    const _forward_ton_amount = sc_0.loadCoins();
    const _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'InternalTransferMessage' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleInternalTransferMessage(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _response_destination = source.readAddress();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'InternalTransferMessage' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleInternalTransferMessage(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _response_destination = source.readAddress();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'InternalTransferMessage' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleInternalTransferMessage(source: InternalTransferMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}

function dictValueParserInternalTransferMessage(): DictionaryValue<InternalTransferMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadInternalTransferMessage(src.loadRef().beginParse());
        }
    }
}

export type TransferMessage = {
    $$type: 'TransferMessage';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell | null;
}

export function storeTransferMessage(src: TransferMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3109881090, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) { b_0.storeBit(true).storeRef(src.forward_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTransferMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3109881090) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _response_destination = sc_0.loadAddress();
    const _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forward_ton_amount = sc_0.loadCoins();
    const _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TransferMessage' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTransferMessage(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _response_destination = source.readAddress();
    const _custom_payload = source.readCellOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'TransferMessage' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleTransferMessage(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _response_destination = source.readAddress();
    const _custom_payload = source.readCellOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'TransferMessage' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTransferMessage(source: TransferMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
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

export type BurnMessage = {
    $$type: 'BurnMessage';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
}

export function storeBurnMessage(src: BurnMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(536789078, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadBurnMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 536789078) { throw Error('Invalid prefix'); }
    const _query_id = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _response_destination = sc_0.loadAddress();
    return { $$type: 'BurnMessage' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination };
}

function loadTupleBurnMessage(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _response_destination = source.readAddress();
    return { $$type: 'BurnMessage' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination };
}

function loadGetterTupleBurnMessage(source: TupleReader) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _response_destination = source.readAddress();
    return { $$type: 'BurnMessage' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination };
}

function storeTupleBurnMessage(source: BurnMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserBurnMessage(): DictionaryValue<BurnMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnMessage(src)).endCell());
        },
        parse: (src) => {
            return loadBurnMessage(src.loadRef().beginParse());
        }
    }
}

export type JettonWalletData = {
    $$type: 'JettonWalletData';
    balance: bigint;
    owner: Address;
    jettonMaster: Address;
    walletCode: Cell;
}

export function storeJettonWalletData(src: JettonWalletData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonMaster);
        b_0.storeRef(src.walletCode);
    };
}

export function loadJettonWalletData(slice: Slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    const _walletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, jettonMaster: _jettonMaster, walletCode: _walletCode };
}

function loadTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _walletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, jettonMaster: _jettonMaster, walletCode: _walletCode };
}

function loadGetterTupleJettonWalletData(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _walletCode = source.readCell();
    return { $$type: 'JettonWalletData' as const, balance: _balance, owner: _owner, jettonMaster: _jettonMaster, walletCode: _walletCode };
}

function storeTupleJettonWalletData(source: JettonWalletData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jettonMaster);
    builder.writeCell(source.walletCode);
    return builder.build();
}

function dictValueParserJettonWalletData(): DictionaryValue<JettonWalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    }
}

export type JettonWallet$Data = {
    $$type: 'JettonWallet$Data';
    balance: bigint;
    owner: Address;
    jettonMaster: Address;
}

export function storeJettonWallet$Data(src: JettonWallet$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonMaster);
    };
}

export function loadJettonWallet$Data(slice: Slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    return { $$type: 'JettonWallet$Data' as const, balance: _balance, owner: _owner, jettonMaster: _jettonMaster };
}

function loadTupleJettonWallet$Data(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    return { $$type: 'JettonWallet$Data' as const, balance: _balance, owner: _owner, jettonMaster: _jettonMaster };
}

function loadGetterTupleJettonWallet$Data(source: TupleReader) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    return { $$type: 'JettonWallet$Data' as const, balance: _balance, owner: _owner, jettonMaster: _jettonMaster };
}

function storeTupleJettonWallet$Data(source: JettonWallet$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jettonMaster);
    return builder.build();
}

function dictValueParserJettonWallet$Data(): DictionaryValue<JettonWallet$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonWallet$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWallet$Data(src.loadRef().beginParse());
        }
    }
}

export type JettonData = {
    $$type: 'JettonData';
    totalSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
    tokenRate: bigint;
}

export function storeJettonData(src: JettonData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
        b_0.storeInt(src.tokenRate, 257);
    };
}

export function loadJettonData(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _walletCode = sc_0.loadRef();
    const _tokenRate = sc_0.loadIntBig(257);
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}

function loadTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}

function loadGetterTupleJettonData(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'JettonData' as const, totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}

function storeTupleJettonData(source: JettonData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    builder.writeNumber(source.tokenRate);
    return builder.build();
}

function dictValueParserJettonData(): DictionaryValue<JettonData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    }
}

export type GetWalletAddress = {
    $$type: 'GetWalletAddress';
    owner_address: Address;
}

export function storeGetWalletAddress(src: GetWalletAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3316846856, 32);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadGetWalletAddress(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3316846856) { throw Error('Invalid prefix'); }
    const _owner_address = sc_0.loadAddress();
    return { $$type: 'GetWalletAddress' as const, owner_address: _owner_address };
}

function loadTupleGetWalletAddress(source: TupleReader) {
    const _owner_address = source.readAddress();
    return { $$type: 'GetWalletAddress' as const, owner_address: _owner_address };
}

function loadGetterTupleGetWalletAddress(source: TupleReader) {
    const _owner_address = source.readAddress();
    return { $$type: 'GetWalletAddress' as const, owner_address: _owner_address };
}

function storeTupleGetWalletAddress(source: GetWalletAddress) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserGetWalletAddress(): DictionaryValue<GetWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadGetWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type UpdateDistributionContractMessage = {
    $$type: 'UpdateDistributionContractMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateDistributionContractMessage(src: UpdateDistributionContractMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3597658823, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateDistributionContractMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3597658823) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateDistributionContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateDistributionContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateDistributionContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateDistributionContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateDistributionContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateDistributionContractMessage(source: UpdateDistributionContractMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateDistributionContractMessage(): DictionaryValue<UpdateDistributionContractMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateDistributionContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateDistributionContractMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateNFTContractMessage = {
    $$type: 'UpdateNFTContractMessage';
    queryId: bigint;
    new_address: Address;
}

export function storeUpdateNFTContractMessage(src: UpdateNFTContractMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2320696427, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateNFTContractMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2320696427) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateNFTContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadTupleUpdateNFTContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateNFTContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function loadGetterTupleUpdateNFTContractMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateNFTContractMessage' as const, queryId: _queryId, new_address: _new_address };
}

function storeTupleUpdateNFTContractMessage(source: UpdateNFTContractMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateNFTContractMessage(): DictionaryValue<UpdateNFTContractMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateNFTContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateNFTContractMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateContentMessage = {
    $$type: 'UpdateContentMessage';
    queryId: bigint;
    new_content: Cell;
}

export function storeUpdateContentMessage(src: UpdateContentMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1419921888, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeRef(src.new_content);
    };
}

export function loadUpdateContentMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1419921888) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_content = sc_0.loadRef();
    return { $$type: 'UpdateContentMessage' as const, queryId: _queryId, new_content: _new_content };
}

function loadTupleUpdateContentMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage' as const, queryId: _queryId, new_content: _new_content };
}

function loadGetterTupleUpdateContentMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage' as const, queryId: _queryId, new_content: _new_content };
}

function storeTupleUpdateContentMessage(source: UpdateContentMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
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

export type BuyTokensMessage = {
    $$type: 'BuyTokensMessage';
    queryId: bigint;
}

export function storeBuyTokensMessage(src: BuyTokensMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3668904916, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadBuyTokensMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3668904916) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'BuyTokensMessage' as const, queryId: _queryId };
}

function loadTupleBuyTokensMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'BuyTokensMessage' as const, queryId: _queryId };
}

function loadGetterTupleBuyTokensMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'BuyTokensMessage' as const, queryId: _queryId };
}

function storeTupleBuyTokensMessage(source: BuyTokensMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserBuyTokensMessage(): DictionaryValue<BuyTokensMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyTokensMessage(src)).endCell());
        },
        parse: (src) => {
            return loadBuyTokensMessage(src.loadRef().beginParse());
        }
    }
}

export type ToggleMintingMessage = {
    $$type: 'ToggleMintingMessage';
    queryId: bigint;
}

export function storeToggleMintingMessage(src: ToggleMintingMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1849045995, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadToggleMintingMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1849045995) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'ToggleMintingMessage' as const, queryId: _queryId };
}

function loadTupleToggleMintingMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ToggleMintingMessage' as const, queryId: _queryId };
}

function loadGetterTupleToggleMintingMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ToggleMintingMessage' as const, queryId: _queryId };
}

function storeTupleToggleMintingMessage(source: ToggleMintingMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserToggleMintingMessage(): DictionaryValue<ToggleMintingMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeToggleMintingMessage(src)).endCell());
        },
        parse: (src) => {
            return loadToggleMintingMessage(src.loadRef().beginParse());
        }
    }
}

export type EmergencyWithdrawMessage = {
    $$type: 'EmergencyWithdrawMessage';
    queryId: bigint;
}

export function storeEmergencyWithdrawMessage(src: EmergencyWithdrawMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3855890798, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadEmergencyWithdrawMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3855890798) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'EmergencyWithdrawMessage' as const, queryId: _queryId };
}

function loadTupleEmergencyWithdrawMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'EmergencyWithdrawMessage' as const, queryId: _queryId };
}

function loadGetterTupleEmergencyWithdrawMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'EmergencyWithdrawMessage' as const, queryId: _queryId };
}

function storeTupleEmergencyWithdrawMessage(source: EmergencyWithdrawMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
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

export type UpdateTokenRateMessage = {
    $$type: 'UpdateTokenRateMessage';
    queryId: bigint;
    new_rate: bigint;
}

export function storeUpdateTokenRateMessage(src: UpdateTokenRateMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1372787303, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeInt(src.new_rate, 257);
    };
}

export function loadUpdateTokenRateMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1372787303) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _new_rate = sc_0.loadIntBig(257);
    return { $$type: 'UpdateTokenRateMessage' as const, queryId: _queryId, new_rate: _new_rate };
}

function loadTupleUpdateTokenRateMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_rate = source.readBigNumber();
    return { $$type: 'UpdateTokenRateMessage' as const, queryId: _queryId, new_rate: _new_rate };
}

function loadGetterTupleUpdateTokenRateMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _new_rate = source.readBigNumber();
    return { $$type: 'UpdateTokenRateMessage' as const, queryId: _queryId, new_rate: _new_rate };
}

function storeTupleUpdateTokenRateMessage(source: UpdateTokenRateMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.new_rate);
    return builder.build();
}

function dictValueParserUpdateTokenRateMessage(): DictionaryValue<UpdateTokenRateMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateTokenRateMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTokenRateMessage(src.loadRef().beginParse());
        }
    }
}

export type AdminParams = {
    $$type: 'AdminParams';
    tempAdmin: Address | null;
    recoveryAddress: Address;
    lockUntil: bigint;
}

export function storeAdminParams(src: AdminParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.tempAdmin);
        b_0.storeAddress(src.recoveryAddress);
        b_0.storeInt(src.lockUntil, 257);
    };
}

export function loadAdminParams(slice: Slice) {
    const sc_0 = slice;
    const _tempAdmin = sc_0.loadMaybeAddress();
    const _recoveryAddress = sc_0.loadAddress();
    const _lockUntil = sc_0.loadIntBig(257);
    return { $$type: 'AdminParams' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}

function loadTupleAdminParams(source: TupleReader) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    return { $$type: 'AdminParams' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}

function loadGetterTupleAdminParams(source: TupleReader) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    return { $$type: 'AdminParams' as const, tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}

function storeTupleAdminParams(source: AdminParams) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.tempAdmin);
    builder.writeAddress(source.recoveryAddress);
    builder.writeNumber(source.lockUntil);
    return builder.build();
}

function dictValueParserAdminParams(): DictionaryValue<AdminParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAdminParams(src)).endCell());
        },
        parse: (src) => {
            return loadAdminParams(src.loadRef().beginParse());
        }
    }
}

export type AnimalHelperToken$Data = {
    $$type: 'AnimalHelperToken$Data';
    totalSupply: bigint;
    maxSupply: bigint;
    mintable: boolean;
    owner: Address;
    content: Cell;
    walletCode: Cell;
    tokenRate: bigint;
    teamVestingContract: Address;
    tokenSaleContract: Address;
}

export function storeAnimalHelperToken$Data(src: AnimalHelperToken$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeInt(src.maxSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
        const b_1 = new Builder();
        b_1.storeInt(src.tokenRate, 257);
        b_1.storeAddress(src.teamVestingContract);
        b_1.storeAddress(src.tokenSaleContract);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadAnimalHelperToken$Data(slice: Slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _maxSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _walletCode = sc_0.loadRef();
    const sc_1 = sc_0.loadRef().beginParse();
    const _tokenRate = sc_1.loadIntBig(257);
    const _teamVestingContract = sc_1.loadAddress();
    const _tokenSaleContract = sc_1.loadAddress();
    return { $$type: 'AnimalHelperToken$Data' as const, totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate, teamVestingContract: _teamVestingContract, tokenSaleContract: _tokenSaleContract };
}

function loadTupleAnimalHelperToken$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _maxSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    const _teamVestingContract = source.readAddress();
    const _tokenSaleContract = source.readAddress();
    return { $$type: 'AnimalHelperToken$Data' as const, totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate, teamVestingContract: _teamVestingContract, tokenSaleContract: _tokenSaleContract };
}

function loadGetterTupleAnimalHelperToken$Data(source: TupleReader) {
    const _totalSupply = source.readBigNumber();
    const _maxSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    const _teamVestingContract = source.readAddress();
    const _tokenSaleContract = source.readAddress();
    return { $$type: 'AnimalHelperToken$Data' as const, totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate, teamVestingContract: _teamVestingContract, tokenSaleContract: _tokenSaleContract };
}

function storeTupleAnimalHelperToken$Data(source: AnimalHelperToken$Data) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeNumber(source.maxSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    builder.writeNumber(source.tokenRate);
    builder.writeAddress(source.teamVestingContract);
    builder.writeAddress(source.tokenSaleContract);
    return builder.build();
}

function dictValueParserAnimalHelperToken$Data(): DictionaryValue<AnimalHelperToken$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAnimalHelperToken$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAnimalHelperToken$Data(src.loadRef().beginParse());
        }
    }
}

 type JettonWallet_init_args = {
    $$type: 'JettonWallet_init_args';
    jettonMaster: Address;
    owner: Address;
}

function initJettonWallet_init_args(src: JettonWallet_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.jettonMaster);
        b_0.storeAddress(src.owner);
    };
}

async function JettonWallet_init(jettonMaster: Address, owner: Address) {
    const __code = Cell.fromHex('b5ee9c7241021001000415000114ff00f4a413f4bcf2c80b01020162020d04d4d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200019d810101d700fa40fa4055206c139afa40fa405902d1017002e204925f04e002d70d1ff2e082218210b7c72f59bae302218210997c01bdbae302218210b95d0502bae3020182101ffec056ba0304060b01cc5b02db3cf842708040c85007fa025005cf165003cf16ccc9135a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00c87f01ca0055205023810101cf0001cf1601cf16c9ed540e01e831d33ffa00fa40fa40fa00d2000191d4926d01e2555010235f0333f8425260c7057081114d0292307fdef2f45133a08d086000000000000000000000000000000000000000000000000000000000000000000423c705b3926c31e30d02c87f01ca0055205023810101cf0001cf1601cf16c9ed540500a0708040c882107362d09c01cb1f14cb3f5005fa0225cf16c944405a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002fe31d33ffa00fa40fa40d2000191d4926d01e2fa00d2000191d4926d01e2556032368138c6f8425290c705f2f48200d5575374bef2f45163a15427835199db3c7f27820afaf080a071c88210178d451901cb1f5290cb3f28fa0226cf162ccf16500afa021af400c944304980146d50436d4133c8cf8580ca00cf8440ce01fa020709015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d00801224434db3cc85005cf165005cf16c91310240f01d68069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb008d086000000000000000000000000000000000000000000000000000000000000000000426c705b3951036355f03e30d58c87f01ca0055205023810101cf0001cf1601cf16c9ed540a00a6708040c882107362d09c01cb1f15cb3f5003fa025007cf16c91035125a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001201fe8ef7d33ffa00fa405520338138c6f8425260c705f2f48200d5575341bef2f45133a1708040c88210595f07bc01cb1f14cb3f5005fa0225cf165003cf16c9250344445a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002e05f04f2c0820c002ec87f01ca0055205023810101cf0001cf1601cf16c9ed54014da0f605da89a1a400033b020203ae01f481f480aa40d82735f481f480b205a202e005c5b678d8690e0112547210db3c103645400f0004c8c9265157fb');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initJettonWallet_init_args({ $$type: 'JettonWallet_init_args', jettonMaster, owner })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const JettonWallet_errors = {
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
    4429: { message: `Invalid sender` },
    14534: { message: `Not owner` },
    50322: { message: `Initial minting already done` },
    54615: { message: `Insufficient balance` },
} as const

export const JettonWallet_errors_backward = {
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
    "Invalid sender": 4429,
    "Not owner": 14534,
    "Initial minting already done": 50322,
    "Insufficient balance": 54615,
} as const

const JettonWallet_types: ABIType[] = [
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
    {"name":"GetWalletDataMessage","header":3083284313,"fields":[]},
    {"name":"InternalTransferMessage","header":2575040957,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"TransferMessage","header":3109881090,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"BurnMessage","header":536789078,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonWalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"JettonWallet$Data","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonData","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"tokenRate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"GetWalletAddress","header":3316846856,"fields":[{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateDistributionContractMessage","header":3597658823,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateNFTContractMessage","header":2320696427,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"UpdateContentMessage","header":1419921888,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"BuyTokensMessage","header":3668904916,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ToggleMintingMessage","header":1849045995,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"EmergencyWithdrawMessage","header":3855890798,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"UpdateTokenRateMessage","header":1372787303,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"new_rate","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AdminParams","header":null,"fields":[{"name":"tempAdmin","type":{"kind":"simple","type":"address","optional":true}},{"name":"recoveryAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"lockUntil","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"AnimalHelperToken$Data","header":null,"fields":[{"name":"totalSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"maxSupply","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mintable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"walletCode","type":{"kind":"simple","type":"cell","optional":false}},{"name":"tokenRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"teamVestingContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"tokenSaleContract","type":{"kind":"simple","type":"address","optional":false}}]},
]

const JettonWallet_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "GetWalletDataMessage": 3083284313,
    "InternalTransferMessage": 2575040957,
    "TransferMessage": 3109881090,
    "BurnMessage": 536789078,
    "GetWalletAddress": 3316846856,
    "UpdateDistributionContractMessage": 3597658823,
    "UpdateNFTContractMessage": 2320696427,
    "UpdateContentMessage": 1419921888,
    "BuyTokensMessage": 3668904916,
    "ToggleMintingMessage": 1849045995,
    "EmergencyWithdrawMessage": 3855890798,
    "UpdateTokenRateMessage": 1372787303,
}

const JettonWallet_getters: ABIGetter[] = [
    {"name":"get_wallet_data","methodId":97026,"arguments":[],"returnType":{"kind":"simple","type":"JettonWalletData","optional":false}},
]

export const JettonWallet_getterMapping: { [key: string]: string } = {
    'get_wallet_data': 'getGetWalletData',
}

const JettonWallet_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"GetWalletDataMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InternalTransferMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TransferMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BurnMessage"}},
]


export class JettonWallet implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = JettonWallet_errors_backward;
    public static readonly opcodes = JettonWallet_opcodes;
    
    static async init(jettonMaster: Address, owner: Address) {
        return await JettonWallet_init(jettonMaster, owner);
    }
    
    static async fromInit(jettonMaster: Address, owner: Address) {
        const __gen_init = await JettonWallet_init(jettonMaster, owner);
        const address = contractAddress(0, __gen_init);
        return new JettonWallet(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new JettonWallet(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  JettonWallet_types,
        getters: JettonWallet_getters,
        receivers: JettonWallet_receivers,
        errors: JettonWallet_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: GetWalletDataMessage | InternalTransferMessage | TransferMessage | BurnMessage) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetWalletDataMessage') {
            body = beginCell().store(storeGetWalletDataMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InternalTransferMessage') {
            body = beginCell().store(storeInternalTransferMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TransferMessage') {
            body = beginCell().store(storeTransferMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BurnMessage') {
            body = beginCell().store(storeBurnMessage(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetWalletData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_wallet_data', builder.build())).stack;
        const result = loadGetterTupleJettonWalletData(source);
        return result;
    }
    
}