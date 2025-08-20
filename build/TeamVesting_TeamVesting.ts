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

export type ClaimMessage = {
    $$type: 'ClaimMessage';
    queryId: bigint;
}

export function storeClaimMessage(src: ClaimMessage) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2777059954, 32);
        b_0.storeInt(src.queryId, 257);
    };
}

export function loadClaimMessage(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2777059954) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'ClaimMessage' as const, queryId: _queryId };
}

function loadTupleClaimMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ClaimMessage' as const, queryId: _queryId };
}

function loadGetterTupleClaimMessage(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ClaimMessage' as const, queryId: _queryId };
}

function storeTupleClaimMessage(source: ClaimMessage) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserClaimMessage(): DictionaryValue<ClaimMessage> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimMessage(src)).endCell());
        },
        parse: (src) => {
            return loadClaimMessage(src.loadRef().beginParse());
        }
    }
}

export type SetJettonWallet = {
    $$type: 'SetJettonWallet';
    queryId: bigint;
    address: Address;
}

export function storeSetJettonWallet(src: SetJettonWallet) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(968888784, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.address);
    };
}

export function loadSetJettonWallet(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 968888784) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _address = sc_0.loadAddress();
    return { $$type: 'SetJettonWallet' as const, queryId: _queryId, address: _address };
}

function loadTupleSetJettonWallet(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'SetJettonWallet' as const, queryId: _queryId, address: _address };
}

function loadGetterTupleSetJettonWallet(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'SetJettonWallet' as const, queryId: _queryId, address: _address };
}

function storeTupleSetJettonWallet(source: SetJettonWallet) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserSetJettonWallet(): DictionaryValue<SetJettonWallet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetJettonWallet(src)).endCell());
        },
        parse: (src) => {
            return loadSetJettonWallet(src.loadRef().beginParse());
        }
    }
}

export type VestingData = {
    $$type: 'VestingData';
    owner: Address;
    teamWallet: Address;
    jettonMaster: Address;
    jettonWallet: Address;
    totalAmount: bigint;
    claimedAmount: bigint;
    createdAt: bigint;
    cliffDate: bigint;
    vestingPeriod: bigint;
}

export function storeVestingData(src: VestingData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.teamWallet);
        b_0.storeAddress(src.jettonMaster);
        const b_1 = new Builder();
        b_1.storeAddress(src.jettonWallet);
        b_1.storeInt(src.totalAmount, 257);
        b_1.storeInt(src.claimedAmount, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.createdAt, 257);
        b_2.storeInt(src.cliffDate, 257);
        b_2.storeInt(src.vestingPeriod, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadVestingData(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _teamWallet = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _jettonWallet = sc_1.loadAddress();
    const _totalAmount = sc_1.loadIntBig(257);
    const _claimedAmount = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _createdAt = sc_2.loadIntBig(257);
    const _cliffDate = sc_2.loadIntBig(257);
    const _vestingPeriod = sc_2.loadIntBig(257);
    return { $$type: 'VestingData' as const, owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}

function loadTupleVestingData(source: TupleReader) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddress();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'VestingData' as const, owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}

function loadGetterTupleVestingData(source: TupleReader) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddress();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'VestingData' as const, owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}

function storeTupleVestingData(source: VestingData) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.teamWallet);
    builder.writeAddress(source.jettonMaster);
    builder.writeAddress(source.jettonWallet);
    builder.writeNumber(source.totalAmount);
    builder.writeNumber(source.claimedAmount);
    builder.writeNumber(source.createdAt);
    builder.writeNumber(source.cliffDate);
    builder.writeNumber(source.vestingPeriod);
    return builder.build();
}

function dictValueParserVestingData(): DictionaryValue<VestingData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVestingData(src)).endCell());
        },
        parse: (src) => {
            return loadVestingData(src.loadRef().beginParse());
        }
    }
}

export type TeamVesting$Data = {
    $$type: 'TeamVesting$Data';
    owner: Address;
    teamWallet: Address;
    jettonMaster: Address;
    jettonWallet: Address | null;
    totalAmount: bigint;
    claimedAmount: bigint;
    createdAt: bigint;
    cliffDate: bigint;
    vestingPeriod: bigint;
}

export function storeTeamVesting$Data(src: TeamVesting$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.teamWallet);
        b_0.storeAddress(src.jettonMaster);
        const b_1 = new Builder();
        b_1.storeAddress(src.jettonWallet);
        b_1.storeInt(src.totalAmount, 257);
        b_1.storeInt(src.claimedAmount, 257);
        const b_2 = new Builder();
        b_2.storeInt(src.createdAt, 257);
        b_2.storeInt(src.cliffDate, 257);
        b_2.storeInt(src.vestingPeriod, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTeamVesting$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _teamWallet = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _jettonWallet = sc_1.loadMaybeAddress();
    const _totalAmount = sc_1.loadIntBig(257);
    const _claimedAmount = sc_1.loadIntBig(257);
    const sc_2 = sc_1.loadRef().beginParse();
    const _createdAt = sc_2.loadIntBig(257);
    const _cliffDate = sc_2.loadIntBig(257);
    const _vestingPeriod = sc_2.loadIntBig(257);
    return { $$type: 'TeamVesting$Data' as const, owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}

function loadTupleTeamVesting$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddressOpt();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'TeamVesting$Data' as const, owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}

function loadGetterTupleTeamVesting$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddressOpt();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'TeamVesting$Data' as const, owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}

function storeTupleTeamVesting$Data(source: TeamVesting$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.teamWallet);
    builder.writeAddress(source.jettonMaster);
    builder.writeAddress(source.jettonWallet);
    builder.writeNumber(source.totalAmount);
    builder.writeNumber(source.claimedAmount);
    builder.writeNumber(source.createdAt);
    builder.writeNumber(source.cliffDate);
    builder.writeNumber(source.vestingPeriod);
    return builder.build();
}

function dictValueParserTeamVesting$Data(): DictionaryValue<TeamVesting$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTeamVesting$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTeamVesting$Data(src.loadRef().beginParse());
        }
    }
}

 type TeamVesting_init_args = {
    $$type: 'TeamVesting_init_args';
    owner: Address;
    teamWallet: Address;
    jettonMaster: Address;
    cliffDuration: bigint;
    vestingDuration: bigint;
}

function initTeamVesting_init_args(src: TeamVesting_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.teamWallet);
        b_0.storeAddress(src.jettonMaster);
        const b_1 = new Builder();
        b_1.storeInt(src.cliffDuration, 257);
        b_1.storeInt(src.vestingDuration, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function TeamVesting_init(owner: Address, teamWallet: Address, jettonMaster: Address, cliffDuration: bigint, vestingDuration: bigint) {
    const __code = Cell.fromHex('b5ee9c724102130100044d000114ff00f4a413f4bcf2c80b01020162020c03f8d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e3cfa40fa40fa40d401d0810101d700810101d7003010251024102305d155036d7020f8235206a081507325c200f2f482009a8a5316bef2f41035440302e30d0a925f0ae07029d74920c21f953109d31f0ade21821039c011d0bae3022110030401e65b08810101d700fa40596c21107810671056104510344139db3c816ac2066e16f2f41078106710565503c87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed540602e08210a5869272bae302218210946a98b6bae3023ac00009c12119b08e4d10685515c87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed54e05f09f2c082050a04ea5b08810101d7000131107810671056104510344139db3cdb3c5580db3c8200ed3721c200f2f45144a0821005f5e1007170c88210178d451901cb1f1fcb3f5007fa02f828cf162bcf1670fa021dca00c9103b4c505a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf81061207080012f8425290c705f2e0840038f82322b99170e0f82323a15301be94305343a1e05250a821a90424a101aa8ae2f400c901fb0010685515c87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed5409001a58cf8680cf8480f400f400cf8101e05b08d33f0131c8018210aff90f5758cb1fcb3fc9107910681057104610354430f84201706ddb3cc87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed540b00966d6d226eb3945b6f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000201200d0f0299be28ef6a268690000c71e7d207d207d206a00e8408080eb80408080eb801808128812081182e8aa81b6b8107c11a9035040a83992e100797a41004d45298b5f797a081aa201817186ed9e3648c100e0002280299bd0d476a268690000c71e7d207d207d206a00e8408080eb80408080eb801808128812081182e8aa81b6b8107c11a9035040a83992e100797a41004d45298b5f797a081aa201817186ed9e364cc1011007efa40fa40fa40d401d020d70b01c30093fa40019472d7216de201810101d700810101d700d430d0810101d700810101d700810101d700301069106810676c190118db3c54699054698154787628120012812a8b266eb3f2f42511a1c354');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initTeamVesting_init_args({ $$type: 'TeamVesting_init_args', owner, teamWallet, jettonMaster, cliffDuration, vestingDuration })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const TeamVesting_errors = {
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
    10891: { message: `Jetton wallet address is not set yet` },
    14534: { message: `Not owner` },
    20595: { message: `Vesting period should be positive` },
    27330: { message: `Jetton wallet address is already set` },
    39562: { message: `Cliff date cannot be in the past` },
    54615: { message: `Insufficient balance` },
    60727: { message: `No tokens available to claim` },
} as const

export const TeamVesting_errors_backward = {
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
    "Jetton wallet address is not set yet": 10891,
    "Not owner": 14534,
    "Vesting period should be positive": 20595,
    "Jetton wallet address is already set": 27330,
    "Cliff date cannot be in the past": 39562,
    "Insufficient balance": 54615,
    "No tokens available to claim": 60727,
} as const

const TeamVesting_types: ABIType[] = [
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
    {"name":"ClaimMessage","header":2777059954,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SetJettonWallet","header":968888784,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"VestingData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"teamWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"totalAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"claimedAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"createdAt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cliffDate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"vestingPeriod","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"TeamVesting$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"teamWallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonMaster","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonWallet","type":{"kind":"simple","type":"address","optional":true}},{"name":"totalAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"claimedAmount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"createdAt","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"cliffDate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"vestingPeriod","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const TeamVesting_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "GetWalletDataMessage": 3083284313,
    "InternalTransferMessage": 2575040957,
    "TransferMessage": 3109881090,
    "BurnMessage": 536789078,
    "ClaimMessage": 2777059954,
    "SetJettonWallet": 968888784,
}

const TeamVesting_getters: ABIGetter[] = [
    {"name":"getVestingData","methodId":106920,"arguments":[],"returnType":{"kind":"simple","type":"VestingData","optional":false}},
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const TeamVesting_getterMapping: { [key: string]: string } = {
    'getVestingData': 'getGetVestingData',
    'owner': 'getOwner',
}

const TeamVesting_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetJettonWallet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]


export class TeamVesting implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = TeamVesting_errors_backward;
    public static readonly opcodes = TeamVesting_opcodes;
    
    static async init(owner: Address, teamWallet: Address, jettonMaster: Address, cliffDuration: bigint, vestingDuration: bigint) {
        return await TeamVesting_init(owner, teamWallet, jettonMaster, cliffDuration, vestingDuration);
    }
    
    static async fromInit(owner: Address, teamWallet: Address, jettonMaster: Address, cliffDuration: bigint, vestingDuration: bigint) {
        const __gen_init = await TeamVesting_init(owner, teamWallet, jettonMaster, cliffDuration, vestingDuration);
        const address = contractAddress(0, __gen_init);
        return new TeamVesting(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new TeamVesting(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TeamVesting_types,
        getters: TeamVesting_getters,
        receivers: TeamVesting_receivers,
        errors: TeamVesting_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | SetJettonWallet | ClaimMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetJettonWallet') {
            body = beginCell().store(storeSetJettonWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimMessage') {
            body = beginCell().store(storeClaimMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetVestingData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('getVestingData', builder.build())).stack;
        const result = loadGetterTupleVestingData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}