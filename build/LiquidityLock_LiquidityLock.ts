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

export type ReleaseTokensMessage = {
    $$type: 'ReleaseTokensMessage';
}

export function storeReleaseTokensMessage(src: ReleaseTokensMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1917540305, 32);
    };
}

export function loadReleaseTokensMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1917540305) { throw Error('Invalid prefix'); }
    return { $$type: 'ReleaseTokensMessage' as const };
}

function loadTupleReleaseTokensMessage(source: TupleReader) {
    return { $$type: 'ReleaseTokensMessage' as const };
}

function loadGetterTupleReleaseTokensMessage(source: TupleReader) {
    return { $$type: 'ReleaseTokensMessage' as const };
}

function storeTupleReleaseTokensMessage(source: ReleaseTokensMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserReleaseTokensMessage(): DictionaryValue<ReleaseTokensMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReleaseTokensMessage(src)).endCell());
        },
        parse: (src) => {
            return loadReleaseTokensMessage(src.loadRef().beginParse());
        }
    }
}

export type UpdateLiquidityPoolMessage = {
    $$type: 'UpdateLiquidityPoolMessage';
    new_address: Address;
}

export function storeUpdateLiquidityPoolMessage(src: UpdateLiquidityPoolMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(153144301, 32);
        b_0.storeAddress(src.new_address);
    };
}

export function loadUpdateLiquidityPoolMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 153144301) { throw Error('Invalid prefix'); }
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateLiquidityPoolMessage' as const, new_address: _new_address };
}

function loadTupleUpdateLiquidityPoolMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityPoolMessage' as const, new_address: _new_address };
}

function loadGetterTupleUpdateLiquidityPoolMessage(source: TupleReader) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityPoolMessage' as const, new_address: _new_address };
}

function storeTupleUpdateLiquidityPoolMessage(source: UpdateLiquidityPoolMessage) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.new_address);
    return builder.build();
}

function dictValueParserUpdateLiquidityPoolMessage(): DictionaryValue<UpdateLiquidityPoolMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateLiquidityPoolMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLiquidityPoolMessage(src.loadRef().beginParse());
        }
    }
}

export type GetLockInfoMessage = {
    $$type: 'GetLockInfoMessage';
}

export function storeGetLockInfoMessage(src: GetLockInfoMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3810183551, 32);
    };
}

export function loadGetLockInfoMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3810183551) { throw Error('Invalid prefix'); }
    return { $$type: 'GetLockInfoMessage' as const };
}

function loadTupleGetLockInfoMessage(source: TupleReader) {
    return { $$type: 'GetLockInfoMessage' as const };
}

function loadGetterTupleGetLockInfoMessage(source: TupleReader) {
    return { $$type: 'GetLockInfoMessage' as const };
}

function storeTupleGetLockInfoMessage(source: GetLockInfoMessage) {
    const builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserGetLockInfoMessage(): DictionaryValue<GetLockInfoMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetLockInfoMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetLockInfoMessage(src.loadRef().beginParse());
        }
    }
}

export type EmergencyReleaseMessage = {
    $$type: 'EmergencyReleaseMessage';
    amount: bigint;
    signatures: Cell;
}

export function storeEmergencyReleaseMessage(src: EmergencyReleaseMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2267712041, 32);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.signatures);
    };
}

export function loadEmergencyReleaseMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2267712041) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    const _signatures = sc_0.loadRef();
    return { $$type: 'EmergencyReleaseMessage' as const, amount: _amount, signatures: _signatures };
}

function loadTupleEmergencyReleaseMessage(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _signatures = source.readCell();
    return { $$type: 'EmergencyReleaseMessage' as const, amount: _amount, signatures: _signatures };
}

function loadGetterTupleEmergencyReleaseMessage(source: TupleReader) {
    const _amount = source.readBigNumber();
    const _signatures = source.readCell();
    return { $$type: 'EmergencyReleaseMessage' as const, amount: _amount, signatures: _signatures };
}

function storeTupleEmergencyReleaseMessage(source: EmergencyReleaseMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeCell(source.signatures);
    return builder.build();
}

function dictValueParserEmergencyReleaseMessage(): DictionaryValue<EmergencyReleaseMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEmergencyReleaseMessage(src)).endCell());
        },
        parse: (src) => {
            return loadEmergencyReleaseMessage(src.loadRef().beginParse());
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

export type LiquidityLock$Data = {
    $$type: 'LiquidityLock$Data';
    owner: Address;
    liquidityPool: Address;
    initialLockTime: bigint;
    releaseStartTime: bigint;
    releaseEndTime: bigint;
    totalLocked: bigint;
    totalReleased: bigint;
    lastReleaseTime: bigint;
}

export function storeLiquidityLock$Data(src: LiquidityLock$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.liquidityPool);
        b_0.storeInt(src.initialLockTime, 257);
        const b_1 = new Builder();
        b_1.storeInt(src.releaseStartTime, 257);
        b_1.storeInt(src.releaseEndTime, 257);
        b_1.storeInt(src.totalLocked, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.totalReleased, 257);
        b_2.storeInt(src.lastReleaseTime, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLiquidityLock$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _liquidityPool = sc_0.loadAddress();
    const _initialLockTime = sc_0.loadIntBig(257);
    const sc_1 = sc_0.loadRef().beginParse();
    const _releaseStartTime = sc_1.loadIntBig(257);
    const _releaseEndTime = sc_1.loadIntBig(257);
    const _totalLocked = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _totalReleased = sc_2.loadIntBig(257);
    const _lastReleaseTime = sc_2.loadIntBig(257);
    return { $$type: 'LiquidityLock$Data' as const, owner: _owner, liquidityPool: _liquidityPool, initialLockTime: _initialLockTime, releaseStartTime: _releaseStartTime, releaseEndTime: _releaseEndTime, totalLocked: _totalLocked, totalReleased: _totalReleased, lastReleaseTime: _lastReleaseTime };
}

function loadTupleLiquidityLock$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _liquidityPool = source.readAddress();
    const _initialLockTime = source.readBigNumber();
    const _releaseStartTime = source.readBigNumber();
    const _releaseEndTime = source.readBigNumber();
    const _totalLocked = source.readBigNumber();
    const _totalReleased = source.readBigNumber();
    const _lastReleaseTime = source.readBigNumber();
    return { $$type: 'LiquidityLock$Data' as const, owner: _owner, liquidityPool: _liquidityPool, initialLockTime: _initialLockTime, releaseStartTime: _releaseStartTime, releaseEndTime: _releaseEndTime, totalLocked: _totalLocked, totalReleased: _totalReleased, lastReleaseTime: _lastReleaseTime };
}

function loadGetterTupleLiquidityLock$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _liquidityPool = source.readAddress();
    const _initialLockTime = source.readBigNumber();
    const _releaseStartTime = source.readBigNumber();
    const _releaseEndTime = source.readBigNumber();
    const _totalLocked = source.readBigNumber();
    const _totalReleased = source.readBigNumber();
    const _lastReleaseTime = source.readBigNumber();
    return { $$type: 'LiquidityLock$Data' as const, owner: _owner, liquidityPool: _liquidityPool, initialLockTime: _initialLockTime, releaseStartTime: _releaseStartTime, releaseEndTime: _releaseEndTime, totalLocked: _totalLocked, totalReleased: _totalReleased, lastReleaseTime: _lastReleaseTime };
}

function storeTupleLiquidityLock$Data(source: LiquidityLock$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.liquidityPool);
    builder.writeNumber(source.initialLockTime);
    builder.writeNumber(source.releaseStartTime);
    builder.writeNumber(source.releaseEndTime);
    builder.writeNumber(source.totalLocked);
    builder.writeNumber(source.totalReleased);
    builder.writeNumber(source.lastReleaseTime);
    return builder.build();
}

function dictValueParserLiquidityLock$Data(): DictionaryValue<LiquidityLock$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLiquidityLock$Data(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityLock$Data(src.loadRef().beginParse());
        }
    }
}

 type LiquidityLock_init_args = {
    $$type: 'LiquidityLock_init_args';
    owner: Address;
    liquidityPool: Address;
    lockDurationSeconds: bigint;
}

function initLiquidityLock_init_args(src: LiquidityLock_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.liquidityPool);
        b_0.storeInt(src.lockDurationSeconds, 257);
    };
}

async function LiquidityLock_init(owner: Address, liquidityPool: Address, lockDurationSeconds: bigint) {
    const __code = Cell.fromHex('b5ee9c72410210010004b3000114ff00f4a413f4bcf2c80b01020162020e01f8d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e31fa40fa40810101d700d401d0810101d700810101d700810101d700d430d0810101d700810101d700301058105710566c188e23fa40fa40810101d700552003d1587020f8235303a004a703ab005240a0544215504403e209925f09e00304687028d74920c21f953108d31f09de218210724b57d1bae302218210e31ac97fbae302218210872a8a29bae3022182100920cbedba0405070802d45b3781097df82324bef2f4812bfe5317bcf2f410575514db3c31817f8b21c200f2f466a0f8237f72c87001cb1fc92a044666146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001060a02c05b3710575514db3cc85270cb3f5260cb3f5250cb3f24fa0223fa0201fa025210cb3fc9f84270588042015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00060a0050f82325b99170e0f82324be935321a1e05334a1f82326a1a76401a9045230a88064a90422a170b60901d05b07fa00d45930318138c6f8425280c705f2f48149ab5328a15220bbf2f45177a07f72c87001cb1fc928044bbb146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00105755140a03fa8e575b3506fa4001318138c6f8425270c705f2f410570610355512c87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed54e0218210fac86711bae302218210946a98b6bae30239c00008c12118b0e3025f08f2c082090b0d01a05b378138c6f8425270c705f2f4f8427070810082036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00105755140a007cc87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed5401c85b07d33f0131c8018210aff90f5758cb1fcb3fc91068105710461035443012f84201706ddb3cc87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed540c00966d6d226eb3945b6f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000094f8416f24135f03a010575514c87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed5401cba08a3bda89a1a400031c63f481f481020203ae01a803a1020203ae01020203ae01020203ae01a861a1020203ae01020203ae006020b020ae20acd8311c47f481f481020203ae00aa4007a2b0e041f046a60740094e075600a48140a8842aa08807c5b678d9030f0002273b501efd');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initLiquidityLock_init_args({ $$type: 'LiquidityLock_init_args', owner, liquidityPool, lockDurationSeconds })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const LiquidityLock_errors = {
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
    2429: { message: `Release period not started` },
    11262: { message: `No tokens to release` },
    14534: { message: `Not owner` },
    18859: { message: `Insufficient locked funds` },
    32651: { message: `No tokens available for release yet` },
} as const

export const LiquidityLock_errors_backward = {
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
    "Release period not started": 2429,
    "No tokens to release": 11262,
    "Not owner": 14534,
    "Insufficient locked funds": 18859,
    "No tokens available for release yet": 32651,
} as const

const LiquidityLock_types: ABIType[] = [
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
    {"name":"ReleaseTokensMessage","header":1917540305,"fields":[]},
    {"name":"UpdateLiquidityPoolMessage","header":153144301,"fields":[{"name":"new_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetLockInfoMessage","header":3810183551,"fields":[]},
    {"name":"EmergencyReleaseMessage","header":2267712041,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"signatures","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"EmergencyWithdrawMessage","header":4207437585,"fields":[]},
    {"name":"LiquidityLock$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"liquidityPool","type":{"kind":"simple","type":"address","optional":false}},{"name":"initialLockTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"releaseStartTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"releaseEndTime","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalLocked","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalReleased","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"lastReleaseTime","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const LiquidityLock_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "ReleaseTokensMessage": 1917540305,
    "UpdateLiquidityPoolMessage": 153144301,
    "GetLockInfoMessage": 3810183551,
    "EmergencyReleaseMessage": 2267712041,
    "EmergencyWithdrawMessage": 4207437585,
}

const LiquidityLock_getters: ABIGetter[] = [
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const LiquidityLock_getterMapping: { [key: string]: string } = {
    'owner': 'getOwner',
}

const LiquidityLock_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReleaseTokensMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetLockInfoMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyReleaseMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UpdateLiquidityPoolMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EmergencyWithdrawMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class LiquidityLock implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = LiquidityLock_errors_backward;
    public static readonly opcodes = LiquidityLock_opcodes;
    
    static async init(owner: Address, liquidityPool: Address, lockDurationSeconds: bigint) {
        return await LiquidityLock_init(owner, liquidityPool, lockDurationSeconds);
    }
    
    static async fromInit(owner: Address, liquidityPool: Address, lockDurationSeconds: bigint) {
        const __gen_init = await LiquidityLock_init(owner, liquidityPool, lockDurationSeconds);
        const address = contractAddress(0, __gen_init);
        return new LiquidityLock(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new LiquidityLock(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  LiquidityLock_types,
        getters: LiquidityLock_getters,
        receivers: LiquidityLock_receivers,
        errors: LiquidityLock_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | ReleaseTokensMessage | GetLockInfoMessage | EmergencyReleaseMessage | UpdateLiquidityPoolMessage | EmergencyWithdrawMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReleaseTokensMessage') {
            body = beginCell().store(storeReleaseTokensMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetLockInfoMessage') {
            body = beginCell().store(storeGetLockInfoMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EmergencyReleaseMessage') {
            body = beginCell().store(storeEmergencyReleaseMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UpdateLiquidityPoolMessage') {
            body = beginCell().store(storeUpdateLiquidityPoolMessage(message)).endCell();
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