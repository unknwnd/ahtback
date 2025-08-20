"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityLock = exports.LiquidityLock_getterMapping = exports.LiquidityLock_errors_backward = exports.LiquidityLock_errors = void 0;
exports.storeDataSize = storeDataSize;
exports.loadDataSize = loadDataSize;
exports.storeStateInit = storeStateInit;
exports.loadStateInit = loadStateInit;
exports.storeContext = storeContext;
exports.loadContext = loadContext;
exports.storeSendParameters = storeSendParameters;
exports.loadSendParameters = loadSendParameters;
exports.storeMessageParameters = storeMessageParameters;
exports.loadMessageParameters = loadMessageParameters;
exports.storeDeployParameters = storeDeployParameters;
exports.loadDeployParameters = loadDeployParameters;
exports.storeStdAddress = storeStdAddress;
exports.loadStdAddress = loadStdAddress;
exports.storeVarAddress = storeVarAddress;
exports.loadVarAddress = loadVarAddress;
exports.storeBasechainAddress = storeBasechainAddress;
exports.loadBasechainAddress = loadBasechainAddress;
exports.storeDeploy = storeDeploy;
exports.loadDeploy = loadDeploy;
exports.storeDeployOk = storeDeployOk;
exports.loadDeployOk = loadDeployOk;
exports.storeFactoryDeploy = storeFactoryDeploy;
exports.loadFactoryDeploy = loadFactoryDeploy;
exports.storeChangeOwner = storeChangeOwner;
exports.loadChangeOwner = loadChangeOwner;
exports.storeChangeOwnerOk = storeChangeOwnerOk;
exports.loadChangeOwnerOk = loadChangeOwnerOk;
exports.storeReleaseTokensMessage = storeReleaseTokensMessage;
exports.loadReleaseTokensMessage = loadReleaseTokensMessage;
exports.storeUpdateLiquidityPoolMessage = storeUpdateLiquidityPoolMessage;
exports.loadUpdateLiquidityPoolMessage = loadUpdateLiquidityPoolMessage;
exports.storeGetLockInfoMessage = storeGetLockInfoMessage;
exports.loadGetLockInfoMessage = loadGetLockInfoMessage;
exports.storeEmergencyReleaseMessage = storeEmergencyReleaseMessage;
exports.loadEmergencyReleaseMessage = loadEmergencyReleaseMessage;
exports.storeEmergencyWithdrawMessage = storeEmergencyWithdrawMessage;
exports.loadEmergencyWithdrawMessage = loadEmergencyWithdrawMessage;
exports.storeLiquidityLock$Data = storeLiquidityLock$Data;
exports.loadLiquidityLock$Data = loadLiquidityLock$Data;
const core_1 = require("@ton/core");
function storeDataSize(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}
function loadDataSize(slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
function loadTupleDataSize(source) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
function loadGetterTupleDataSize(source) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize', cells: _cells, bits: _bits, refs: _refs };
}
function storeTupleDataSize(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}
function dictValueParserDataSize() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    };
}
function storeStateInit(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}
function loadStateInit(slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function loadTupleStateInit(source) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function loadGetterTupleStateInit(source) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit', code: _code, data: _data };
}
function storeTupleStateInit(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}
function dictValueParserStateInit() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    };
}
function storeContext(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}
function loadContext(slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
function loadTupleContext(source) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
function loadGetterTupleContext(source) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context', bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}
function storeTupleContext(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}
function dictValueParserContext() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    };
}
function storeSendParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.code !== null && src.code !== undefined) {
            b_0.storeBit(true).storeRef(src.code);
        }
        else {
            b_0.storeBit(false);
        }
        if (src.data !== null && src.data !== undefined) {
            b_0.storeBit(true).storeRef(src.data);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}
function loadSendParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
function loadTupleSendParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
function loadGetterTupleSendParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters', mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}
function storeTupleSendParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}
function dictValueParserSendParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    };
}
function storeMessageParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}
function loadMessageParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
function loadTupleMessageParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
function loadGetterTupleMessageParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters', mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}
function storeTupleMessageParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}
function dictValueParserMessageParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    };
}
function storeDeployParameters(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) {
            b_0.storeBit(true).storeRef(src.body);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}
function loadDeployParameters(slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
function loadTupleDeployParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
function loadGetterTupleDeployParameters(source) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters', mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}
function storeTupleDeployParameters(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}
function dictValueParserDeployParameters() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    };
}
function storeStdAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}
function loadStdAddress(slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
function loadTupleStdAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
function loadGetterTupleStdAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress', workchain: _workchain, address: _address };
}
function storeTupleStdAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}
function dictValueParserStdAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    };
}
function storeVarAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}
function loadVarAddress(slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
function loadTupleVarAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
function loadGetterTupleVarAddress(source) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress', workchain: _workchain, address: _address };
}
function storeTupleVarAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}
function dictValueParserVarAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    };
}
function storeBasechainAddress(src) {
    return (builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) {
            b_0.storeBit(true).storeInt(src.hash, 257);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadBasechainAddress(slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress', hash: _hash };
}
function loadTupleBasechainAddress(source) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress', hash: _hash };
}
function loadGetterTupleBasechainAddress(source) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress', hash: _hash };
}
function storeTupleBasechainAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}
function dictValueParserBasechainAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    };
}
function storeDeploy(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
function loadDeploy(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy', queryId: _queryId };
}
function loadTupleDeploy(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy', queryId: _queryId };
}
function loadGetterTupleDeploy(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy', queryId: _queryId };
}
function storeTupleDeploy(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    };
}
function storeDeployOk(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}
function loadDeployOk(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk', queryId: _queryId };
}
function loadTupleDeployOk(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk', queryId: _queryId };
}
function loadGetterTupleDeployOk(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk', queryId: _queryId };
}
function storeTupleDeployOk(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserDeployOk() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    };
}
function storeFactoryDeploy(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}
function loadFactoryDeploy(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function loadTupleFactoryDeploy(source) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function loadGetterTupleFactoryDeploy(source) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy', queryId: _queryId, cashback: _cashback };
}
function storeTupleFactoryDeploy(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}
function dictValueParserFactoryDeploy() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    };
}
function storeChangeOwner(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}
function loadChangeOwner(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function loadTupleChangeOwner(source) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function loadGetterTupleChangeOwner(source) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner', queryId: _queryId, newOwner: _newOwner };
}
function storeTupleChangeOwner(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}
function dictValueParserChangeOwner() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    };
}
function storeChangeOwnerOk(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}
function loadChangeOwnerOk(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk', queryId: _queryId, newOwner: _newOwner };
}
function loadTupleChangeOwnerOk(source) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk', queryId: _queryId, newOwner: _newOwner };
}
function loadGetterTupleChangeOwnerOk(source) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk', queryId: _queryId, newOwner: _newOwner };
}
function storeTupleChangeOwnerOk(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}
function dictValueParserChangeOwnerOk() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    };
}
function storeReleaseTokensMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1917540305, 32);
    };
}
function loadReleaseTokensMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1917540305) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'ReleaseTokensMessage' };
}
function loadTupleReleaseTokensMessage(source) {
    return { $$type: 'ReleaseTokensMessage' };
}
function loadGetterTupleReleaseTokensMessage(source) {
    return { $$type: 'ReleaseTokensMessage' };
}
function storeTupleReleaseTokensMessage(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserReleaseTokensMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeReleaseTokensMessage(src)).endCell());
        },
        parse: (src) => {
            return loadReleaseTokensMessage(src.loadRef().beginParse());
        }
    };
}
function storeUpdateLiquidityPoolMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(153144301, 32);
        b_0.storeAddress(src.new_address);
    };
}
function loadUpdateLiquidityPoolMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 153144301) {
        throw Error('Invalid prefix');
    }
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateLiquidityPoolMessage', new_address: _new_address };
}
function loadTupleUpdateLiquidityPoolMessage(source) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityPoolMessage', new_address: _new_address };
}
function loadGetterTupleUpdateLiquidityPoolMessage(source) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateLiquidityPoolMessage', new_address: _new_address };
}
function storeTupleUpdateLiquidityPoolMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.new_address);
    return builder.build();
}
function dictValueParserUpdateLiquidityPoolMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateLiquidityPoolMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateLiquidityPoolMessage(src.loadRef().beginParse());
        }
    };
}
function storeGetLockInfoMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3810183551, 32);
    };
}
function loadGetLockInfoMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3810183551) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'GetLockInfoMessage' };
}
function loadTupleGetLockInfoMessage(source) {
    return { $$type: 'GetLockInfoMessage' };
}
function loadGetterTupleGetLockInfoMessage(source) {
    return { $$type: 'GetLockInfoMessage' };
}
function storeTupleGetLockInfoMessage(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserGetLockInfoMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeGetLockInfoMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetLockInfoMessage(src.loadRef().beginParse());
        }
    };
}
function storeEmergencyReleaseMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2267712041, 32);
        b_0.storeCoins(src.amount);
        b_0.storeRef(src.signatures);
    };
}
function loadEmergencyReleaseMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2267712041) {
        throw Error('Invalid prefix');
    }
    const _amount = sc_0.loadCoins();
    const _signatures = sc_0.loadRef();
    return { $$type: 'EmergencyReleaseMessage', amount: _amount, signatures: _signatures };
}
function loadTupleEmergencyReleaseMessage(source) {
    const _amount = source.readBigNumber();
    const _signatures = source.readCell();
    return { $$type: 'EmergencyReleaseMessage', amount: _amount, signatures: _signatures };
}
function loadGetterTupleEmergencyReleaseMessage(source) {
    const _amount = source.readBigNumber();
    const _signatures = source.readCell();
    return { $$type: 'EmergencyReleaseMessage', amount: _amount, signatures: _signatures };
}
function storeTupleEmergencyReleaseMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeCell(source.signatures);
    return builder.build();
}
function dictValueParserEmergencyReleaseMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmergencyReleaseMessage(src)).endCell());
        },
        parse: (src) => {
            return loadEmergencyReleaseMessage(src.loadRef().beginParse());
        }
    };
}
function storeEmergencyWithdrawMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(4207437585, 32);
    };
}
function loadEmergencyWithdrawMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4207437585) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'EmergencyWithdrawMessage' };
}
function loadTupleEmergencyWithdrawMessage(source) {
    return { $$type: 'EmergencyWithdrawMessage' };
}
function loadGetterTupleEmergencyWithdrawMessage(source) {
    return { $$type: 'EmergencyWithdrawMessage' };
}
function storeTupleEmergencyWithdrawMessage(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserEmergencyWithdrawMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmergencyWithdrawMessage(src)).endCell());
        },
        parse: (src) => {
            return loadEmergencyWithdrawMessage(src.loadRef().beginParse());
        }
    };
}
function storeLiquidityLock$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.liquidityPool);
        b_0.storeInt(src.initialLockTime, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.releaseStartTime, 257);
        b_1.storeInt(src.releaseEndTime, 257);
        b_1.storeInt(src.totalLocked, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.totalReleased, 257);
        b_2.storeInt(src.lastReleaseTime, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadLiquidityLock$Data(slice) {
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
    return { $$type: 'LiquidityLock$Data', owner: _owner, liquidityPool: _liquidityPool, initialLockTime: _initialLockTime, releaseStartTime: _releaseStartTime, releaseEndTime: _releaseEndTime, totalLocked: _totalLocked, totalReleased: _totalReleased, lastReleaseTime: _lastReleaseTime };
}
function loadTupleLiquidityLock$Data(source) {
    const _owner = source.readAddress();
    const _liquidityPool = source.readAddress();
    const _initialLockTime = source.readBigNumber();
    const _releaseStartTime = source.readBigNumber();
    const _releaseEndTime = source.readBigNumber();
    const _totalLocked = source.readBigNumber();
    const _totalReleased = source.readBigNumber();
    const _lastReleaseTime = source.readBigNumber();
    return { $$type: 'LiquidityLock$Data', owner: _owner, liquidityPool: _liquidityPool, initialLockTime: _initialLockTime, releaseStartTime: _releaseStartTime, releaseEndTime: _releaseEndTime, totalLocked: _totalLocked, totalReleased: _totalReleased, lastReleaseTime: _lastReleaseTime };
}
function loadGetterTupleLiquidityLock$Data(source) {
    const _owner = source.readAddress();
    const _liquidityPool = source.readAddress();
    const _initialLockTime = source.readBigNumber();
    const _releaseStartTime = source.readBigNumber();
    const _releaseEndTime = source.readBigNumber();
    const _totalLocked = source.readBigNumber();
    const _totalReleased = source.readBigNumber();
    const _lastReleaseTime = source.readBigNumber();
    return { $$type: 'LiquidityLock$Data', owner: _owner, liquidityPool: _liquidityPool, initialLockTime: _initialLockTime, releaseStartTime: _releaseStartTime, releaseEndTime: _releaseEndTime, totalLocked: _totalLocked, totalReleased: _totalReleased, lastReleaseTime: _lastReleaseTime };
}
function storeTupleLiquidityLock$Data(source) {
    const builder = new core_1.TupleBuilder();
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
function dictValueParserLiquidityLock$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeLiquidityLock$Data(src)).endCell());
        },
        parse: (src) => {
            return loadLiquidityLock$Data(src.loadRef().beginParse());
        }
    };
}
function initLiquidityLock_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.liquidityPool);
        b_0.storeInt(src.lockDurationSeconds, 257);
    };
}
async function LiquidityLock_init(owner, liquidityPool, lockDurationSeconds) {
    const __code = core_1.Cell.fromHex('b5ee9c72410210010004b3000114ff00f4a413f4bcf2c80b01020162020e01f8d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e31fa40fa40810101d700d401d0810101d700810101d700810101d700d430d0810101d700810101d700301058105710566c188e23fa40fa40810101d700552003d1587020f8235303a004a703ab005240a0544215504403e209925f09e00304687028d74920c21f953108d31f09de218210724b57d1bae302218210e31ac97fbae302218210872a8a29bae3022182100920cbedba0405070802d45b3781097df82324bef2f4812bfe5317bcf2f410575514db3c31817f8b21c200f2f466a0f8237f72c87001cb1fc92a044666146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001060a02c05b3710575514db3cc85270cb3f5260cb3f5250cb3f24fa0223fa0201fa025210cb3fc9f84270588042015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00060a0050f82325b99170e0f82324be935321a1e05334a1f82326a1a76401a9045230a88064a90422a170b60901d05b07fa00d45930318138c6f8425280c705f2f48149ab5328a15220bbf2f45177a07f72c87001cb1fc928044bbb146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00105755140a03fa8e575b3506fa4001318138c6f8425270c705f2f410570610355512c87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed54e0218210fac86711bae302218210946a98b6bae30239c00008c12118b0e3025f08f2c082090b0d01a05b378138c6f8425270c705f2f4f8427070810082036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00105755140a007cc87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed5401c85b07d33f0131c8018210aff90f5758cb1fcb3fc91068105710461035443012f84201706ddb3cc87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed540c00966d6d226eb3945b6f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000094f8416f24135f03a010575514c87f01ca0055705087cf165005cf1613810101cf0001c8810101cf0012810101cf0012810101cf0003c8810101cf0012810101cf00c958ccc901ccc9ed5401cba08a3bda89a1a400031c63f481f481020203ae01a803a1020203ae01020203ae01020203ae01a861a1020203ae01020203ae006020b020ae20acd8311c47f481f481020203ae00aa4007a2b0e041f046a60740094e075600a48140a8842aa08807c5b678d9030f0002273b501efd');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initLiquidityLock_init_args({ $$type: 'LiquidityLock_init_args', owner, liquidityPool, lockDurationSeconds })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
exports.LiquidityLock_errors = {
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
};
exports.LiquidityLock_errors_backward = {
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
};
const LiquidityLock_types = [
    { "name": "DataSize", "header": null, "fields": [{ "name": "cells", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bits", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "refs", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "StateInit", "header": null, "fields": [{ "name": "code", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "Context", "header": null, "fields": [{ "name": "bounceable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "sender", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "raw", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "SendParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "code", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "data", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "MessageParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "to", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "DeployParameters", "header": null, "fields": [{ "name": "mode", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "body", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "value", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "bounce", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "init", "type": { "kind": "simple", "type": "StateInit", "optional": false } }] },
    { "name": "StdAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 8 } }, { "name": "address", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 256 } }] },
    { "name": "VarAddress", "header": null, "fields": [{ "name": "workchain", "type": { "kind": "simple", "type": "int", "optional": false, "format": 32 } }, { "name": "address", "type": { "kind": "simple", "type": "slice", "optional": false } }] },
    { "name": "BasechainAddress", "header": null, "fields": [{ "name": "hash", "type": { "kind": "simple", "type": "int", "optional": true, "format": 257 } }] },
    { "name": "Deploy", "header": 2490013878, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "DeployOk", "header": 2952335191, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }] },
    { "name": "FactoryDeploy", "header": 1829761339, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "cashback", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ChangeOwner", "header": 2174598809, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ChangeOwnerOk", "header": 846932810, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "newOwner", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ReleaseTokensMessage", "header": 1917540305, "fields": [] },
    { "name": "UpdateLiquidityPoolMessage", "header": 153144301, "fields": [{ "name": "new_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "GetLockInfoMessage", "header": 3810183551, "fields": [] },
    { "name": "EmergencyReleaseMessage", "header": 2267712041, "fields": [{ "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "signatures", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "EmergencyWithdrawMessage", "header": 4207437585, "fields": [] },
    { "name": "LiquidityLock$Data", "header": null, "fields": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "liquidityPool", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "initialLockTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "releaseStartTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "releaseEndTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "totalLocked", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "totalReleased", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lastReleaseTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
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
};
const LiquidityLock_getters = [
    { "name": "owner", "methodId": 83229, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
];
exports.LiquidityLock_getterMapping = {
    'owner': 'getOwner',
};
const LiquidityLock_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ReleaseTokensMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "GetLockInfoMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "EmergencyReleaseMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateLiquidityPoolMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "EmergencyWithdrawMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class LiquidityLock {
    static async init(owner, liquidityPool, lockDurationSeconds) {
        return await LiquidityLock_init(owner, liquidityPool, lockDurationSeconds);
    }
    static async fromInit(owner, liquidityPool, lockDurationSeconds) {
        const __gen_init = await LiquidityLock_init(owner, liquidityPool, lockDurationSeconds);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new LiquidityLock(address, __gen_init);
    }
    static fromAddress(address) {
        return new LiquidityLock(address);
    }
    constructor(address, init) {
        this.abi = {
            types: LiquidityLock_types,
            getters: LiquidityLock_getters,
            receivers: LiquidityLock_receivers,
            errors: exports.LiquidityLock_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message === null) {
            body = new core_1.Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ReleaseTokensMessage') {
            body = (0, core_1.beginCell)().store(storeReleaseTokensMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'GetLockInfoMessage') {
            body = (0, core_1.beginCell)().store(storeGetLockInfoMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'EmergencyReleaseMessage') {
            body = (0, core_1.beginCell)().store(storeEmergencyReleaseMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateLiquidityPoolMessage') {
            body = (0, core_1.beginCell)().store(storeUpdateLiquidityPoolMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'EmergencyWithdrawMessage') {
            body = (0, core_1.beginCell)().store(storeEmergencyWithdrawMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getOwner(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
}
exports.LiquidityLock = LiquidityLock;
LiquidityLock.storageReserve = 0n;
LiquidityLock.errors = exports.LiquidityLock_errors_backward;
LiquidityLock.opcodes = LiquidityLock_opcodes;
