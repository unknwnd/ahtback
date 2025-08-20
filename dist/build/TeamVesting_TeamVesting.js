"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamVesting = exports.TeamVesting_getterMapping = exports.TeamVesting_errors_backward = exports.TeamVesting_errors = void 0;
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
exports.storeGetWalletDataMessage = storeGetWalletDataMessage;
exports.loadGetWalletDataMessage = loadGetWalletDataMessage;
exports.storeInternalTransferMessage = storeInternalTransferMessage;
exports.loadInternalTransferMessage = loadInternalTransferMessage;
exports.storeTransferMessage = storeTransferMessage;
exports.loadTransferMessage = loadTransferMessage;
exports.storeBurnMessage = storeBurnMessage;
exports.loadBurnMessage = loadBurnMessage;
exports.storeJettonWalletData = storeJettonWalletData;
exports.loadJettonWalletData = loadJettonWalletData;
exports.storeJettonWallet$Data = storeJettonWallet$Data;
exports.loadJettonWallet$Data = loadJettonWallet$Data;
exports.storeClaimMessage = storeClaimMessage;
exports.loadClaimMessage = loadClaimMessage;
exports.storeSetJettonWallet = storeSetJettonWallet;
exports.loadSetJettonWallet = loadSetJettonWallet;
exports.storeVestingData = storeVestingData;
exports.loadVestingData = loadVestingData;
exports.storeTeamVesting$Data = storeTeamVesting$Data;
exports.loadTeamVesting$Data = loadTeamVesting$Data;
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
function storeGetWalletDataMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3083284313, 32);
    };
}
function loadGetWalletDataMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3083284313) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'GetWalletDataMessage' };
}
function loadTupleGetWalletDataMessage(source) {
    return { $$type: 'GetWalletDataMessage' };
}
function loadGetterTupleGetWalletDataMessage(source) {
    return { $$type: 'GetWalletDataMessage' };
}
function storeTupleGetWalletDataMessage(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserGetWalletDataMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeGetWalletDataMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetWalletDataMessage(src.loadRef().beginParse());
        }
    };
}
function storeInternalTransferMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2575040957, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.forward_payload);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadInternalTransferMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2575040957) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _from = sc_0.loadAddress();
    const _response_destination = sc_0.loadAddress();
    const _forward_ton_amount = sc_0.loadCoins();
    const _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'InternalTransferMessage', query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function loadTupleInternalTransferMessage(source) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _response_destination = source.readAddress();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'InternalTransferMessage', query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function loadGetterTupleInternalTransferMessage(source) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _from = source.readAddress();
    const _response_destination = source.readAddress();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'InternalTransferMessage', query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleInternalTransferMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}
function dictValueParserInternalTransferMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeInternalTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadInternalTransferMessage(src.loadRef().beginParse());
        }
    };
}
function storeTransferMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3109881090, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.custom_payload);
        }
        else {
            b_0.storeBit(false);
        }
        b_0.storeCoins(src.forward_ton_amount);
        if (src.forward_payload !== null && src.forward_payload !== undefined) {
            b_0.storeBit(true).storeRef(src.forward_payload);
        }
        else {
            b_0.storeBit(false);
        }
    };
}
function loadTransferMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3109881090) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    const _response_destination = sc_0.loadAddress();
    const _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forward_ton_amount = sc_0.loadCoins();
    const _forward_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TransferMessage', query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function loadTupleTransferMessage(source) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _response_destination = source.readAddress();
    const _custom_payload = source.readCellOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'TransferMessage', query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function loadGetterTupleTransferMessage(source) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _destination = source.readAddress();
    const _response_destination = source.readAddress();
    const _custom_payload = source.readCellOpt();
    const _forward_ton_amount = source.readBigNumber();
    const _forward_payload = source.readCellOpt();
    return { $$type: 'TransferMessage', query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}
function storeTupleTransferMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.forward_payload);
    return builder.build();
}
function dictValueParserTransferMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadTransferMessage(src.loadRef().beginParse());
        }
    };
}
function storeBurnMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(536789078, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
    };
}
function loadBurnMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 536789078) {
        throw Error('Invalid prefix');
    }
    const _query_id = sc_0.loadUintBig(64);
    const _amount = sc_0.loadCoins();
    const _response_destination = sc_0.loadAddress();
    return { $$type: 'BurnMessage', query_id: _query_id, amount: _amount, response_destination: _response_destination };
}
function loadTupleBurnMessage(source) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _response_destination = source.readAddress();
    return { $$type: 'BurnMessage', query_id: _query_id, amount: _amount, response_destination: _response_destination };
}
function loadGetterTupleBurnMessage(source) {
    const _query_id = source.readBigNumber();
    const _amount = source.readBigNumber();
    const _response_destination = source.readAddress();
    return { $$type: 'BurnMessage', query_id: _query_id, amount: _amount, response_destination: _response_destination };
}
function storeTupleBurnMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    return builder.build();
}
function dictValueParserBurnMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBurnMessage(src)).endCell());
        },
        parse: (src) => {
            return loadBurnMessage(src.loadRef().beginParse());
        }
    };
}
function storeJettonWalletData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonMaster);
        b_0.storeRef(src.walletCode);
    };
}
function loadJettonWalletData(slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    const _walletCode = sc_0.loadRef();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, jettonMaster: _jettonMaster, walletCode: _walletCode };
}
function loadTupleJettonWalletData(source) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _walletCode = source.readCell();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, jettonMaster: _jettonMaster, walletCode: _walletCode };
}
function loadGetterTupleJettonWalletData(source) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _walletCode = source.readCell();
    return { $$type: 'JettonWalletData', balance: _balance, owner: _owner, jettonMaster: _jettonMaster, walletCode: _walletCode };
}
function storeTupleJettonWalletData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jettonMaster);
    builder.writeCell(source.walletCode);
    return builder.build();
}
function dictValueParserJettonWalletData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWalletData(src.loadRef().beginParse());
        }
    };
}
function storeJettonWallet$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonMaster);
    };
}
function loadJettonWallet$Data(slice) {
    const sc_0 = slice;
    const _balance = sc_0.loadIntBig(257);
    const _owner = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    return { $$type: 'JettonWallet$Data', balance: _balance, owner: _owner, jettonMaster: _jettonMaster };
}
function loadTupleJettonWallet$Data(source) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    return { $$type: 'JettonWallet$Data', balance: _balance, owner: _owner, jettonMaster: _jettonMaster };
}
function loadGetterTupleJettonWallet$Data(source) {
    const _balance = source.readBigNumber();
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    return { $$type: 'JettonWallet$Data', balance: _balance, owner: _owner, jettonMaster: _jettonMaster };
}
function storeTupleJettonWallet$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jettonMaster);
    return builder.build();
}
function dictValueParserJettonWallet$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonWallet$Data(src)).endCell());
        },
        parse: (src) => {
            return loadJettonWallet$Data(src.loadRef().beginParse());
        }
    };
}
function storeClaimMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2777059954, 32);
        b_0.storeInt(src.queryId, 257);
    };
}
function loadClaimMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2777059954) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'ClaimMessage', queryId: _queryId };
}
function loadTupleClaimMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ClaimMessage', queryId: _queryId };
}
function loadGetterTupleClaimMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ClaimMessage', queryId: _queryId };
}
function storeTupleClaimMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserClaimMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeClaimMessage(src)).endCell());
        },
        parse: (src) => {
            return loadClaimMessage(src.loadRef().beginParse());
        }
    };
}
function storeSetJettonWallet(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(968888784, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.address);
    };
}
function loadSetJettonWallet(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 968888784) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    const _address = sc_0.loadAddress();
    return { $$type: 'SetJettonWallet', queryId: _queryId, address: _address };
}
function loadTupleSetJettonWallet(source) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'SetJettonWallet', queryId: _queryId, address: _address };
}
function loadGetterTupleSetJettonWallet(source) {
    const _queryId = source.readBigNumber();
    const _address = source.readAddress();
    return { $$type: 'SetJettonWallet', queryId: _queryId, address: _address };
}
function storeTupleSetJettonWallet(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}
function dictValueParserSetJettonWallet() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSetJettonWallet(src)).endCell());
        },
        parse: (src) => {
            return loadSetJettonWallet(src.loadRef().beginParse());
        }
    };
}
function storeVestingData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.teamWallet);
        b_0.storeAddress(src.jettonMaster);
        const b_1 = new core_1.Builder();
        b_1.storeAddress(src.jettonWallet);
        b_1.storeInt(src.totalAmount, 257);
        b_1.storeInt(src.claimedAmount, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.createdAt, 257);
        b_2.storeInt(src.cliffDate, 257);
        b_2.storeInt(src.vestingPeriod, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadVestingData(slice) {
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
    return { $$type: 'VestingData', owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}
function loadTupleVestingData(source) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddress();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'VestingData', owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}
function loadGetterTupleVestingData(source) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddress();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'VestingData', owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}
function storeTupleVestingData(source) {
    const builder = new core_1.TupleBuilder();
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
function dictValueParserVestingData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeVestingData(src)).endCell());
        },
        parse: (src) => {
            return loadVestingData(src.loadRef().beginParse());
        }
    };
}
function storeTeamVesting$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.teamWallet);
        b_0.storeAddress(src.jettonMaster);
        const b_1 = new core_1.Builder();
        b_1.storeAddress(src.jettonWallet);
        b_1.storeInt(src.totalAmount, 257);
        b_1.storeInt(src.claimedAmount, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.createdAt, 257);
        b_2.storeInt(src.cliffDate, 257);
        b_2.storeInt(src.vestingPeriod, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadTeamVesting$Data(slice) {
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
    return { $$type: 'TeamVesting$Data', owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}
function loadTupleTeamVesting$Data(source) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddressOpt();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'TeamVesting$Data', owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}
function loadGetterTupleTeamVesting$Data(source) {
    const _owner = source.readAddress();
    const _teamWallet = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddressOpt();
    const _totalAmount = source.readBigNumber();
    const _claimedAmount = source.readBigNumber();
    const _createdAt = source.readBigNumber();
    const _cliffDate = source.readBigNumber();
    const _vestingPeriod = source.readBigNumber();
    return { $$type: 'TeamVesting$Data', owner: _owner, teamWallet: _teamWallet, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, totalAmount: _totalAmount, claimedAmount: _claimedAmount, createdAt: _createdAt, cliffDate: _cliffDate, vestingPeriod: _vestingPeriod };
}
function storeTupleTeamVesting$Data(source) {
    const builder = new core_1.TupleBuilder();
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
function dictValueParserTeamVesting$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTeamVesting$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTeamVesting$Data(src.loadRef().beginParse());
        }
    };
}
function initTeamVesting_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.teamWallet);
        b_0.storeAddress(src.jettonMaster);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.cliffDuration, 257);
        b_1.storeInt(src.vestingDuration, 257);
        b_0.storeRef(b_1.endCell());
    };
}
async function TeamVesting_init(owner, teamWallet, jettonMaster, cliffDuration, vestingDuration) {
    const __code = core_1.Cell.fromHex('b5ee9c724102130100044d000114ff00f4a413f4bcf2c80b01020162020c03f8d001d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e3cfa40fa40fa40d401d0810101d700810101d7003010251024102305d155036d7020f8235206a081507325c200f2f482009a8a5316bef2f41035440302e30d0a925f0ae07029d74920c21f953109d31f0ade21821039c011d0bae3022110030401e65b08810101d700fa40596c21107810671056104510344139db3c816ac2066e16f2f41078106710565503c87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed540602e08210a5869272bae302218210946a98b6bae3023ac00009c12119b08e4d10685515c87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed54e05f09f2c082050a04ea5b08810101d7000131107810671056104510344139db3cdb3c5580db3c8200ed3721c200f2f45144a0821005f5e1007170c88210178d451901cb1f1fcb3f5007fa02f828cf162bcf1670fa021dca00c9103b4c505a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf81061207080012f8425290c705f2e0840038f82322b99170e0f82323a15301be94305343a1e05250a821a90424a101aa8ae2f400c901fb0010685515c87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed5409001a58cf8680cf8480f400f400cf8101e05b08d33f0131c8018210aff90f5758cb1fcb3fc9107910681057104610354430f84201706ddb3cc87f01ca0055805098cf165006cf165004cf16c85003206e95307001cb0192cf16e2810101cf0012810101cf0002c8810101cf0014810101cf0012810101cf00c901ccc901ccc9ed540b00966d6d226eb3945b6f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000201200d0f0299be28ef6a268690000c71e7d207d207d206a00e8408080eb80408080eb801808128812081182e8aa81b6b8107c11a9035040a83992e100797a41004d45298b5f797a081aa201817186ed9e3648c100e0002280299bd0d476a268690000c71e7d207d207d206a00e8408080eb80408080eb801808128812081182e8aa81b6b8107c11a9035040a83992e100797a41004d45298b5f797a081aa201817186ed9e364cc1011007efa40fa40fa40d401d020d70b01c30093fa40019472d7216de201810101d700810101d700d430d0810101d700810101d700810101d700301069106810676c190118db3c54699054698154787628120012812a8b266eb3f2f42511a1c354');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initTeamVesting_init_args({ $$type: 'TeamVesting_init_args', owner, teamWallet, jettonMaster, cliffDuration, vestingDuration })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
exports.TeamVesting_errors = {
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
};
exports.TeamVesting_errors_backward = {
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
};
const TeamVesting_types = [
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
    { "name": "GetWalletDataMessage", "header": 3083284313, "fields": [] },
    { "name": "InternalTransferMessage", "header": 2575040957, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "from", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "TransferMessage", "header": 3109881090, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "custom_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }, { "name": "forward_ton_amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "forward_payload", "type": { "kind": "simple", "type": "cell", "optional": true } }] },
    { "name": "BurnMessage", "header": 536789078, "fields": [{ "name": "query_id", "type": { "kind": "simple", "type": "uint", "optional": false, "format": 64 } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }, { "name": "response_destination", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "JettonWalletData", "header": null, "fields": [{ "name": "balance", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonMaster", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "walletCode", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "JettonWallet$Data", "header": null, "fields": [{ "name": "balance", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonMaster", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "ClaimMessage", "header": 2777059954, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "SetJettonWallet", "header": 968888784, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "VestingData", "header": null, "fields": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "teamWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonMaster", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "totalAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "claimedAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "createdAt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "cliffDate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "vestingPeriod", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "TeamVesting$Data", "header": null, "fields": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "teamWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonMaster", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonWallet", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "totalAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "claimedAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "createdAt", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "cliffDate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "vestingPeriod", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
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
};
const TeamVesting_getters = [
    { "name": "getVestingData", "methodId": 106920, "arguments": [], "returnType": { "kind": "simple", "type": "VestingData", "optional": false } },
    { "name": "owner", "methodId": 83229, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
];
exports.TeamVesting_getterMapping = {
    'getVestingData': 'getGetVestingData',
    'owner': 'getOwner',
};
const TeamVesting_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "SetJettonWallet" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ClaimMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class TeamVesting {
    static async init(owner, teamWallet, jettonMaster, cliffDuration, vestingDuration) {
        return await TeamVesting_init(owner, teamWallet, jettonMaster, cliffDuration, vestingDuration);
    }
    static async fromInit(owner, teamWallet, jettonMaster, cliffDuration, vestingDuration) {
        const __gen_init = await TeamVesting_init(owner, teamWallet, jettonMaster, cliffDuration, vestingDuration);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new TeamVesting(address, __gen_init);
    }
    static fromAddress(address) {
        return new TeamVesting(address);
    }
    constructor(address, init) {
        this.abi = {
            types: TeamVesting_types,
            getters: TeamVesting_getters,
            receivers: TeamVesting_receivers,
            errors: exports.TeamVesting_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message === null) {
            body = new core_1.Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'SetJettonWallet') {
            body = (0, core_1.beginCell)().store(storeSetJettonWallet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ClaimMessage') {
            body = (0, core_1.beginCell)().store(storeClaimMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getGetVestingData(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('getVestingData', builder.build())).stack;
        const result = loadGetterTupleVestingData(source);
        return result;
    }
    async getOwner(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
}
exports.TeamVesting = TeamVesting;
TeamVesting.storageReserve = 0n;
TeamVesting.errors = exports.TeamVesting_errors_backward;
TeamVesting.opcodes = TeamVesting_opcodes;
