"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSale = exports.TokenSale_getterMapping = exports.TokenSale_errors_backward = exports.TokenSale_errors = void 0;
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
exports.storeBuyTokens = storeBuyTokens;
exports.loadBuyTokens = loadBuyTokens;
exports.storeWithdrawRemaining = storeWithdrawRemaining;
exports.loadWithdrawRemaining = loadWithdrawRemaining;
exports.storeUpdateRate = storeUpdateRate;
exports.loadUpdateRate = loadUpdateRate;
exports.storeTokenSale$Data = storeTokenSale$Data;
exports.loadTokenSale$Data = loadTokenSale$Data;
exports.storeSaleData = storeSaleData;
exports.loadSaleData = loadSaleData;
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
function storeBuyTokens(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1461950307, 32);
    };
}
function loadBuyTokens(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1461950307) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'BuyTokens' };
}
function loadTupleBuyTokens(source) {
    return { $$type: 'BuyTokens' };
}
function loadGetterTupleBuyTokens(source) {
    return { $$type: 'BuyTokens' };
}
function storeTupleBuyTokens(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserBuyTokens() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBuyTokens(src)).endCell());
        },
        parse: (src) => {
            return loadBuyTokens(src.loadRef().beginParse());
        }
    };
}
function storeWithdrawRemaining(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(452244840, 32);
        b_0.storeInt(src.queryId, 257);
    };
}
function loadWithdrawRemaining(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 452244840) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'WithdrawRemaining', queryId: _queryId };
}
function loadTupleWithdrawRemaining(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'WithdrawRemaining', queryId: _queryId };
}
function loadGetterTupleWithdrawRemaining(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'WithdrawRemaining', queryId: _queryId };
}
function storeTupleWithdrawRemaining(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserWithdrawRemaining() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeWithdrawRemaining(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawRemaining(src.loadRef().beginParse());
        }
    };
}
function storeUpdateRate(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2397651930, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeInt(src.newRate, 257);
    };
}
function loadUpdateRate(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2397651930) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    const _newRate = sc_0.loadIntBig(257);
    return { $$type: 'UpdateRate', queryId: _queryId, newRate: _newRate };
}
function loadTupleUpdateRate(source) {
    const _queryId = source.readBigNumber();
    const _newRate = source.readBigNumber();
    return { $$type: 'UpdateRate', queryId: _queryId, newRate: _newRate };
}
function loadGetterTupleUpdateRate(source) {
    const _queryId = source.readBigNumber();
    const _newRate = source.readBigNumber();
    return { $$type: 'UpdateRate', queryId: _queryId, newRate: _newRate };
}
function storeTupleUpdateRate(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.newRate);
    return builder.build();
}
function dictValueParserUpdateRate() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateRate(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateRate(src.loadRef().beginParse());
        }
    };
}
function storeTokenSale$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonMaster);
        b_0.storeAddress(src.jettonWallet);
        const b_1 = new core_1.Builder();
        b_1.storeAddress(src.fundsDistributor);
        b_1.storeInt(src.tokenRate, 257);
        b_1.storeBit(src.isActive);
        b_0.storeRef(b_1.endCell());
    };
}
function loadTokenSale$Data(slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _jettonMaster = sc_0.loadAddress();
    const _jettonWallet = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _fundsDistributor = sc_1.loadAddress();
    const _tokenRate = sc_1.loadIntBig(257);
    const _isActive = sc_1.loadBit();
    return { $$type: 'TokenSale$Data', owner: _owner, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, fundsDistributor: _fundsDistributor, tokenRate: _tokenRate, isActive: _isActive };
}
function loadTupleTokenSale$Data(source) {
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddress();
    const _fundsDistributor = source.readAddress();
    const _tokenRate = source.readBigNumber();
    const _isActive = source.readBoolean();
    return { $$type: 'TokenSale$Data', owner: _owner, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, fundsDistributor: _fundsDistributor, tokenRate: _tokenRate, isActive: _isActive };
}
function loadGetterTupleTokenSale$Data(source) {
    const _owner = source.readAddress();
    const _jettonMaster = source.readAddress();
    const _jettonWallet = source.readAddress();
    const _fundsDistributor = source.readAddress();
    const _tokenRate = source.readBigNumber();
    const _isActive = source.readBoolean();
    return { $$type: 'TokenSale$Data', owner: _owner, jettonMaster: _jettonMaster, jettonWallet: _jettonWallet, fundsDistributor: _fundsDistributor, tokenRate: _tokenRate, isActive: _isActive };
}
function storeTupleTokenSale$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jettonMaster);
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.fundsDistributor);
    builder.writeNumber(source.tokenRate);
    builder.writeBoolean(source.isActive);
    return builder.build();
}
function dictValueParserTokenSale$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTokenSale$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTokenSale$Data(src.loadRef().beginParse());
        }
    };
}
function storeSaleData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.jettonWallet);
        b_0.storeAddress(src.fundsDistributor);
        b_0.storeBit(src.isActive);
        b_0.storeInt(src.tokenRate, 257);
    };
}
function loadSaleData(slice) {
    const sc_0 = slice;
    const _jettonWallet = sc_0.loadAddress();
    const _fundsDistributor = sc_0.loadAddress();
    const _isActive = sc_0.loadBit();
    const _tokenRate = sc_0.loadIntBig(257);
    return { $$type: 'SaleData', jettonWallet: _jettonWallet, fundsDistributor: _fundsDistributor, isActive: _isActive, tokenRate: _tokenRate };
}
function loadTupleSaleData(source) {
    const _jettonWallet = source.readAddress();
    const _fundsDistributor = source.readAddress();
    const _isActive = source.readBoolean();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'SaleData', jettonWallet: _jettonWallet, fundsDistributor: _fundsDistributor, isActive: _isActive, tokenRate: _tokenRate };
}
function loadGetterTupleSaleData(source) {
    const _jettonWallet = source.readAddress();
    const _fundsDistributor = source.readAddress();
    const _isActive = source.readBoolean();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'SaleData', jettonWallet: _jettonWallet, fundsDistributor: _fundsDistributor, isActive: _isActive, tokenRate: _tokenRate };
}
function storeTupleSaleData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.jettonWallet);
    builder.writeAddress(source.fundsDistributor);
    builder.writeBoolean(source.isActive);
    builder.writeNumber(source.tokenRate);
    return builder.build();
}
function dictValueParserSaleData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeSaleData(src)).endCell());
        },
        parse: (src) => {
            return loadSaleData(src.loadRef().beginParse());
        }
    };
}
function initTokenSale_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jettonMaster);
        b_0.storeAddress(src.jettonWallet);
        const b_1 = new core_1.Builder();
        b_1.storeAddress(src.fundsDistributor);
        b_1.storeInt(src.tokenRate, 257);
        b_0.storeRef(b_1.endCell());
    };
}
async function TokenSale_init(owner, jettonMaster, jettonWallet, fundsDistributor, tokenRate) {
    const __code = core_1.Cell.fromHex('b5ee9c72410212010003ee000114ff00f4a413f4bcf2c80b01020162020d02dad0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e1bfa40fa40fa40d401d0fa40810101d700d200301036103510346c168e1cfa40fa40fa40d401d0fa40810101d7003010251024102305d155037fe207925f07e025d749c21fe30005f901030b04ec05d31f21821057239763bae3022182108ee943daba8ecc31810101d700810101d700596c21104510344136db3c318200f37f26c200f2f4104510344130c87f01ca0055505065cf165003cf1601cf16c858cf1613810101cf00ca00c901ccc9ed54db31e02182101af4b568bae302018210946a98b6ba040c080901fe5b81470d26f2f482100bebc200f8416f24135f037aa904b608f8416f24135f0301a1820093a321c200f2f45305a882103b9aca00a904821005f5e10071c8f842cf16c97fc88210178d451901cb1f7001cb3f5005fa02f828cf16f842cf16820afaf080fa0214ca0013ccc92550335a6d6d40037fc8cf8580ca00cf8440ce010502c8fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0071882355205a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb001035551206070000004cc87f01ca0055505065cf165003cf1601cf16c858cf1613810101cf00ca00c901ccc9ed54db3101685b10355512db3c81446421b3f2f4c87f01ca0055505065cf165003cf1601cf16c858cf1613810101cf00ca00c901ccc9ed54db310c01948ec6d33f0131c8018210aff90f5758cb1fcb3fc910461035443012f84201706ddb3cc87f01ca0055505065cf165003cf1601cf16c858cf1613810101cf00ca00c901ccc9ed54db31e0050a00966d6d226eb3945b6f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001ac82f07d1a04f802248014fe5508e1b33aa5ef39c1d718e864d5d88d687e2af3ff9a5aba8eab10355512db3cb3c87f01ca0055505065cf165003cf1601cf16c858cf1613810101cf00ca00c901ccc9ed54e05f06f2c0820c0012f8425260c705f2e0840201200e100191be28ef6a268690000c70dfd207d207d206a00e87d20408080eb80690018081b081a881a360b470e7d207d207d206a00e87d20408080eb801808128812081182e8aa81bff16d9e3630c0f0002250191bd7bbf6a268690000c70dfd207d207d206a00e87d20408080eb80690018081b081a881a360b470e7d207d207d206a00e87d20408080eb801808128812081182e8aa81bff16d9e3632411000854732024f03438e8');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initTokenSale_init_args({ $$type: 'TokenSale_init_args', owner, jettonMaster, jettonWallet, fundsDistributor, tokenRate })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
exports.TokenSale_errors = {
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
    17508: { message: `Cannot withdraw while sale is active` },
    18189: { message: `Token sale is not active` },
    37795: { message: `Insufficient funds to buy tokens` },
    54615: { message: `Insufficient balance` },
    62335: { message: `Invalid token rate` },
};
exports.TokenSale_errors_backward = {
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
    "Cannot withdraw while sale is active": 17508,
    "Token sale is not active": 18189,
    "Insufficient funds to buy tokens": 37795,
    "Insufficient balance": 54615,
    "Invalid token rate": 62335,
};
const TokenSale_types = [
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
    { "name": "BuyTokens", "header": 1461950307, "fields": [] },
    { "name": "WithdrawRemaining", "header": 452244840, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdateRate", "header": 2397651930, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "newRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "TokenSale$Data", "header": null, "fields": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonMaster", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "jettonWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "fundsDistributor", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "tokenRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "isActive", "type": { "kind": "simple", "type": "bool", "optional": false } }] },
    { "name": "SaleData", "header": null, "fields": [{ "name": "jettonWallet", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "fundsDistributor", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "isActive", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "tokenRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
const TokenSale_opcodes = {
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "GetWalletDataMessage": 3083284313,
    "InternalTransferMessage": 2575040957,
    "TransferMessage": 3109881090,
    "BurnMessage": 536789078,
    "BuyTokens": 1461950307,
    "WithdrawRemaining": 452244840,
    "UpdateRate": 2397651930,
};
const TokenSale_getters = [
    { "name": "getSaleData", "methodId": 110455, "arguments": [], "returnType": { "kind": "simple", "type": "SaleData", "optional": false } },
    { "name": "owner", "methodId": 83229, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
];
exports.TokenSale_getterMapping = {
    'getSaleData': 'getGetSaleData',
    'owner': 'getOwner',
};
const TokenSale_receivers = [
    { "receiver": "internal", "message": { "kind": "typed", "type": "BuyTokens" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "toggle_sale" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateRate" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "WithdrawRemaining" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class TokenSale {
    static async init(owner, jettonMaster, jettonWallet, fundsDistributor, tokenRate) {
        return await TokenSale_init(owner, jettonMaster, jettonWallet, fundsDistributor, tokenRate);
    }
    static async fromInit(owner, jettonMaster, jettonWallet, fundsDistributor, tokenRate) {
        const __gen_init = await TokenSale_init(owner, jettonMaster, jettonWallet, fundsDistributor, tokenRate);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new TokenSale(address, __gen_init);
    }
    static fromAddress(address) {
        return new TokenSale(address);
    }
    constructor(address, init) {
        this.abi = {
            types: TokenSale_types,
            getters: TokenSale_getters,
            receivers: TokenSale_receivers,
            errors: exports.TokenSale_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'BuyTokens') {
            body = (0, core_1.beginCell)().store(storeBuyTokens(message)).endCell();
        }
        if (message === "toggle_sale") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateRate') {
            body = (0, core_1.beginCell)().store(storeUpdateRate(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'WithdrawRemaining') {
            body = (0, core_1.beginCell)().store(storeWithdrawRemaining(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getGetSaleData(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('getSaleData', builder.build())).stack;
        const result = loadGetterTupleSaleData(source);
        return result;
    }
    async getOwner(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
}
exports.TokenSale = TokenSale;
TokenSale.storageReserve = 0n;
TokenSale.errors = exports.TokenSale_errors_backward;
TokenSale.opcodes = TokenSale_opcodes;
