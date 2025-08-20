"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalHelperToken = exports.AnimalHelperToken_getterMapping = exports.AnimalHelperToken_errors_backward = exports.AnimalHelperToken_errors = void 0;
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
exports.storeJettonData = storeJettonData;
exports.loadJettonData = loadJettonData;
exports.storeGetWalletAddress = storeGetWalletAddress;
exports.loadGetWalletAddress = loadGetWalletAddress;
exports.storeUpdateDistributionContractMessage = storeUpdateDistributionContractMessage;
exports.loadUpdateDistributionContractMessage = loadUpdateDistributionContractMessage;
exports.storeUpdateNFTContractMessage = storeUpdateNFTContractMessage;
exports.loadUpdateNFTContractMessage = loadUpdateNFTContractMessage;
exports.storeUpdateContentMessage = storeUpdateContentMessage;
exports.loadUpdateContentMessage = loadUpdateContentMessage;
exports.storeBuyTokensMessage = storeBuyTokensMessage;
exports.loadBuyTokensMessage = loadBuyTokensMessage;
exports.storeToggleMintingMessage = storeToggleMintingMessage;
exports.loadToggleMintingMessage = loadToggleMintingMessage;
exports.storeEmergencyWithdrawMessage = storeEmergencyWithdrawMessage;
exports.loadEmergencyWithdrawMessage = loadEmergencyWithdrawMessage;
exports.storeUpdateTokenRateMessage = storeUpdateTokenRateMessage;
exports.loadUpdateTokenRateMessage = loadUpdateTokenRateMessage;
exports.storeAdminParams = storeAdminParams;
exports.loadAdminParams = loadAdminParams;
exports.storeAnimalHelperToken$Data = storeAnimalHelperToken$Data;
exports.loadAnimalHelperToken$Data = loadAnimalHelperToken$Data;
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
function storeJettonData(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
        b_0.storeInt(src.tokenRate, 257);
    };
}
function loadJettonData(slice) {
    const sc_0 = slice;
    const _totalSupply = sc_0.loadIntBig(257);
    const _mintable = sc_0.loadBit();
    const _owner = sc_0.loadAddress();
    const _content = sc_0.loadRef();
    const _walletCode = sc_0.loadRef();
    const _tokenRate = sc_0.loadIntBig(257);
    return { $$type: 'JettonData', totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}
function loadTupleJettonData(source) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'JettonData', totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}
function loadGetterTupleJettonData(source) {
    const _totalSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    return { $$type: 'JettonData', totalSupply: _totalSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate };
}
function storeTupleJettonData(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.totalSupply);
    builder.writeBoolean(source.mintable);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeCell(source.walletCode);
    builder.writeNumber(source.tokenRate);
    return builder.build();
}
function dictValueParserJettonData() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeJettonData(src)).endCell());
        },
        parse: (src) => {
            return loadJettonData(src.loadRef().beginParse());
        }
    };
}
function storeGetWalletAddress(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3316846856, 32);
        b_0.storeAddress(src.owner_address);
    };
}
function loadGetWalletAddress(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3316846856) {
        throw Error('Invalid prefix');
    }
    const _owner_address = sc_0.loadAddress();
    return { $$type: 'GetWalletAddress', owner_address: _owner_address };
}
function loadTupleGetWalletAddress(source) {
    const _owner_address = source.readAddress();
    return { $$type: 'GetWalletAddress', owner_address: _owner_address };
}
function loadGetterTupleGetWalletAddress(source) {
    const _owner_address = source.readAddress();
    return { $$type: 'GetWalletAddress', owner_address: _owner_address };
}
function storeTupleGetWalletAddress(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.owner_address);
    return builder.build();
}
function dictValueParserGetWalletAddress() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeGetWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadGetWalletAddress(src.loadRef().beginParse());
        }
    };
}
function storeUpdateDistributionContractMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3597658823, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}
function loadUpdateDistributionContractMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3597658823) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateDistributionContractMessage', queryId: _queryId, new_address: _new_address };
}
function loadTupleUpdateDistributionContractMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateDistributionContractMessage', queryId: _queryId, new_address: _new_address };
}
function loadGetterTupleUpdateDistributionContractMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateDistributionContractMessage', queryId: _queryId, new_address: _new_address };
}
function storeTupleUpdateDistributionContractMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}
function dictValueParserUpdateDistributionContractMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateDistributionContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateDistributionContractMessage(src.loadRef().beginParse());
        }
    };
}
function storeUpdateNFTContractMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2320696427, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeAddress(src.new_address);
    };
}
function loadUpdateNFTContractMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2320696427) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateNFTContractMessage', queryId: _queryId, new_address: _new_address };
}
function loadTupleUpdateNFTContractMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateNFTContractMessage', queryId: _queryId, new_address: _new_address };
}
function loadGetterTupleUpdateNFTContractMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_address = source.readAddress();
    return { $$type: 'UpdateNFTContractMessage', queryId: _queryId, new_address: _new_address };
}
function storeTupleUpdateNFTContractMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.new_address);
    return builder.build();
}
function dictValueParserUpdateNFTContractMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateNFTContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateNFTContractMessage(src.loadRef().beginParse());
        }
    };
}
function storeUpdateContentMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1419921888, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeRef(src.new_content);
    };
}
function loadUpdateContentMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1419921888) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    const _new_content = sc_0.loadRef();
    return { $$type: 'UpdateContentMessage', queryId: _queryId, new_content: _new_content };
}
function loadTupleUpdateContentMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage', queryId: _queryId, new_content: _new_content };
}
function loadGetterTupleUpdateContentMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_content = source.readCell();
    return { $$type: 'UpdateContentMessage', queryId: _queryId, new_content: _new_content };
}
function storeTupleUpdateContentMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.new_content);
    return builder.build();
}
function dictValueParserUpdateContentMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateContentMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateContentMessage(src.loadRef().beginParse());
        }
    };
}
function storeBuyTokensMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3668904916, 32);
        b_0.storeInt(src.queryId, 257);
    };
}
function loadBuyTokensMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3668904916) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'BuyTokensMessage', queryId: _queryId };
}
function loadTupleBuyTokensMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'BuyTokensMessage', queryId: _queryId };
}
function loadGetterTupleBuyTokensMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'BuyTokensMessage', queryId: _queryId };
}
function storeTupleBuyTokensMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserBuyTokensMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeBuyTokensMessage(src)).endCell());
        },
        parse: (src) => {
            return loadBuyTokensMessage(src.loadRef().beginParse());
        }
    };
}
function storeToggleMintingMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1849045995, 32);
        b_0.storeInt(src.queryId, 257);
    };
}
function loadToggleMintingMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1849045995) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'ToggleMintingMessage', queryId: _queryId };
}
function loadTupleToggleMintingMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ToggleMintingMessage', queryId: _queryId };
}
function loadGetterTupleToggleMintingMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'ToggleMintingMessage', queryId: _queryId };
}
function storeTupleToggleMintingMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}
function dictValueParserToggleMintingMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeToggleMintingMessage(src)).endCell());
        },
        parse: (src) => {
            return loadToggleMintingMessage(src.loadRef().beginParse());
        }
    };
}
function storeEmergencyWithdrawMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3855890798, 32);
        b_0.storeInt(src.queryId, 257);
    };
}
function loadEmergencyWithdrawMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3855890798) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    return { $$type: 'EmergencyWithdrawMessage', queryId: _queryId };
}
function loadTupleEmergencyWithdrawMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'EmergencyWithdrawMessage', queryId: _queryId };
}
function loadGetterTupleEmergencyWithdrawMessage(source) {
    const _queryId = source.readBigNumber();
    return { $$type: 'EmergencyWithdrawMessage', queryId: _queryId };
}
function storeTupleEmergencyWithdrawMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
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
function storeUpdateTokenRateMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1372787303, 32);
        b_0.storeInt(src.queryId, 257);
        b_0.storeInt(src.new_rate, 257);
    };
}
function loadUpdateTokenRateMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1372787303) {
        throw Error('Invalid prefix');
    }
    const _queryId = sc_0.loadIntBig(257);
    const _new_rate = sc_0.loadIntBig(257);
    return { $$type: 'UpdateTokenRateMessage', queryId: _queryId, new_rate: _new_rate };
}
function loadTupleUpdateTokenRateMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_rate = source.readBigNumber();
    return { $$type: 'UpdateTokenRateMessage', queryId: _queryId, new_rate: _new_rate };
}
function loadGetterTupleUpdateTokenRateMessage(source) {
    const _queryId = source.readBigNumber();
    const _new_rate = source.readBigNumber();
    return { $$type: 'UpdateTokenRateMessage', queryId: _queryId, new_rate: _new_rate };
}
function storeTupleUpdateTokenRateMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.new_rate);
    return builder.build();
}
function dictValueParserUpdateTokenRateMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateTokenRateMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateTokenRateMessage(src.loadRef().beginParse());
        }
    };
}
function storeAdminParams(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.tempAdmin);
        b_0.storeAddress(src.recoveryAddress);
        b_0.storeInt(src.lockUntil, 257);
    };
}
function loadAdminParams(slice) {
    const sc_0 = slice;
    const _tempAdmin = sc_0.loadMaybeAddress();
    const _recoveryAddress = sc_0.loadAddress();
    const _lockUntil = sc_0.loadIntBig(257);
    return { $$type: 'AdminParams', tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}
function loadTupleAdminParams(source) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    return { $$type: 'AdminParams', tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}
function loadGetterTupleAdminParams(source) {
    const _tempAdmin = source.readAddressOpt();
    const _recoveryAddress = source.readAddress();
    const _lockUntil = source.readBigNumber();
    return { $$type: 'AdminParams', tempAdmin: _tempAdmin, recoveryAddress: _recoveryAddress, lockUntil: _lockUntil };
}
function storeTupleAdminParams(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.tempAdmin);
    builder.writeAddress(source.recoveryAddress);
    builder.writeNumber(source.lockUntil);
    return builder.build();
}
function dictValueParserAdminParams() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAdminParams(src)).endCell());
        },
        parse: (src) => {
            return loadAdminParams(src.loadRef().beginParse());
        }
    };
}
function storeAnimalHelperToken$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeInt(src.totalSupply, 257);
        b_0.storeInt(src.maxSupply, 257);
        b_0.storeBit(src.mintable);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.tokenRate, 257);
        b_1.storeAddress(src.teamVestingContract);
        b_1.storeAddress(src.tokenSaleContract);
        b_0.storeRef(b_1.endCell());
    };
}
function loadAnimalHelperToken$Data(slice) {
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
    return { $$type: 'AnimalHelperToken$Data', totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate, teamVestingContract: _teamVestingContract, tokenSaleContract: _tokenSaleContract };
}
function loadTupleAnimalHelperToken$Data(source) {
    const _totalSupply = source.readBigNumber();
    const _maxSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    const _teamVestingContract = source.readAddress();
    const _tokenSaleContract = source.readAddress();
    return { $$type: 'AnimalHelperToken$Data', totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate, teamVestingContract: _teamVestingContract, tokenSaleContract: _tokenSaleContract };
}
function loadGetterTupleAnimalHelperToken$Data(source) {
    const _totalSupply = source.readBigNumber();
    const _maxSupply = source.readBigNumber();
    const _mintable = source.readBoolean();
    const _owner = source.readAddress();
    const _content = source.readCell();
    const _walletCode = source.readCell();
    const _tokenRate = source.readBigNumber();
    const _teamVestingContract = source.readAddress();
    const _tokenSaleContract = source.readAddress();
    return { $$type: 'AnimalHelperToken$Data', totalSupply: _totalSupply, maxSupply: _maxSupply, mintable: _mintable, owner: _owner, content: _content, walletCode: _walletCode, tokenRate: _tokenRate, teamVestingContract: _teamVestingContract, tokenSaleContract: _tokenSaleContract };
}
function storeTupleAnimalHelperToken$Data(source) {
    const builder = new core_1.TupleBuilder();
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
function dictValueParserAnimalHelperToken$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAnimalHelperToken$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAnimalHelperToken$Data(src.loadRef().beginParse());
        }
    };
}
function initAnimalHelperToken_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeRef(src.walletCode);
        b_0.storeAddress(src.teamVestingContract);
        b_0.storeAddress(src.tokenSaleContract);
    };
}
async function AnimalHelperToken_init(owner, content, walletCode, teamVestingContract, tokenSaleContract) {
    const __code = core_1.Cell.fromHex('b5ee9c724102160100053c000114ff00f4a413f4bcf2c80b01020162020f01f6d0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e29810101d700810101d700d200fa40d4d401d0d4810101d700fa40fa4030104910481047104610456c198e23fa40d4d4fa40fa40554005d1550382300de0b6b3a76400007054411746541023704013e20a925f0ae028d7490304fcc21f8ff808d31f21821054a249e0ba8ed531810101d700d4596c21107810671056104510344139db3c3410781067105610455502c87f01ca0055805089810101cf0016810101cf0014ca0058cf16cc01c8cc12810101cf0058cf1658cf16c901ccc9ed54db31e0218210946a98b6bae302018210c5b31108bae30208de080a04060801b031d33f0131c8018210aff90f5758cb1fcb3fc9107910681057104610354430f84201706ddb3cc87f01ca0055805089810101cf0016810101cf0014ca0058cf16cc01c8cc12810101cf0058cf1658cf16c901ccc9ed54db310500966d6d226eb3945b6f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0002aafa400131107910681057104610354430db3cf842708042c85004cf16c941305a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0014070064c87f01ca0055805089810101cf0016810101cf0014ca0058cf16cc01c8cc12810101cf0058cf1658cf16c901ccc9ed54db3102a4f9012082f048d5d45447b8178d68743670ce5c7974685d5cb816f9efcc4cc9ac5bd7953d3dbae30282f09b1069dd0fbb446d0a0d52fd0dfe62942d9bd22999dbd96036f691d9e796562dbae3025f09f2c082090c03dc3010685515db3c8200c4925398baf2f4277aa9045380a1109a108a107a23107b106b105b104b43b370db3c1089107810671056104510344130520271db3cc87f01ca0055805089810101cf0016810101cf0014ca0058cf16cc01c8cc12810101cf0058cf1658cf16c901ccc9ed540a0b0b0012f8425260c705f2e08401d65591db3c7f820afaf0807170c88210178d451901cb1f1fcb3f500ffa02f828cf16f828cf1670fa021dca00c944304cd0146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00106855151402c610685515db3cf84210364540705076804206c855505056810101cf0013ca0001cf16cccc810101cf00c9c8ccc95a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb000d0e000c5478655477650060c87f01ca0055805089810101cf0016810101cf0014ca0058cf16cc01c8cc12810101cf0058cf1658cf16c901ccc9ed54020120101201bbbe28ef6a268690000c714c08080eb80408080eb8069007d206a6a00e86a408080eb807d207d201808248824082388230822b60cc711fd206a6a7d207d202aa002e8aa81c11806f05b59d3b20000382a208ba32a0811b82009f16d9e3648c1100022501bfbc9bcf6a268690000c714c08080eb80408080eb8069007d206a6a00e86a408080eb807d207d201808248824082388230822b60cc711fd206a6a7d207d202aa002e8aa81c11806f05b59d3b20000382a208ba32a0811b82009f12a846d9e3648c130104db3c14015edb3c705920f90022f9005ad76501d76582020134c8cb17cb0fcb0fcbffcbff71f90400c87401cb0212ca07cbffc9d0150016c8f828cf1601cf16c95240a8c2ded0');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initAnimalHelperToken_init_args({ $$type: 'AnimalHelperToken_init_args', owner, content, walletCode, teamVestingContract, tokenSaleContract })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
exports.AnimalHelperToken_errors = {
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
};
exports.AnimalHelperToken_errors_backward = {
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
};
const AnimalHelperToken_types = [
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
    { "name": "JettonData", "header": null, "fields": [{ "name": "totalSupply", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mintable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "content", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "walletCode", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "tokenRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "GetWalletAddress", "header": 3316846856, "fields": [{ "name": "owner_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateDistributionContractMessage", "header": 3597658823, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "new_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateNFTContractMessage", "header": 2320696427, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "new_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "UpdateContentMessage", "header": 1419921888, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "new_content", "type": { "kind": "simple", "type": "cell", "optional": false } }] },
    { "name": "BuyTokensMessage", "header": 3668904916, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "ToggleMintingMessage", "header": 1849045995, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "EmergencyWithdrawMessage", "header": 3855890798, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "UpdateTokenRateMessage", "header": 1372787303, "fields": [{ "name": "queryId", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "new_rate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "AdminParams", "header": null, "fields": [{ "name": "tempAdmin", "type": { "kind": "simple", "type": "address", "optional": true } }, { "name": "recoveryAddress", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "lockUntil", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
    { "name": "AnimalHelperToken$Data", "header": null, "fields": [{ "name": "totalSupply", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "maxSupply", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "mintable", "type": { "kind": "simple", "type": "bool", "optional": false } }, { "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "content", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "walletCode", "type": { "kind": "simple", "type": "cell", "optional": false } }, { "name": "tokenRate", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "teamVestingContract", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "tokenSaleContract", "type": { "kind": "simple", "type": "address", "optional": false } }] },
];
const AnimalHelperToken_opcodes = {
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
};
const AnimalHelperToken_getters = [
    { "name": "get_wallet_address", "methodId": 103289, "arguments": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }], "returnType": { "kind": "simple", "type": "address", "optional": false } },
    { "name": "owner", "methodId": 83229, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
];
exports.AnimalHelperToken_getterMapping = {
    'get_wallet_address': 'getGetWalletAddress',
    'owner': 'getOwner',
};
const AnimalHelperToken_receivers = [
    { "receiver": "internal", "message": { "kind": "text", "text": "mint_initial" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateContentMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
    { "receiver": "internal", "message": { "kind": "text", "text": "get_jetton_data" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "GetWalletAddress" } },
];
class AnimalHelperToken {
    static async init(owner, content, walletCode, teamVestingContract, tokenSaleContract) {
        return await AnimalHelperToken_init(owner, content, walletCode, teamVestingContract, tokenSaleContract);
    }
    static async fromInit(owner, content, walletCode, teamVestingContract, tokenSaleContract) {
        const __gen_init = await AnimalHelperToken_init(owner, content, walletCode, teamVestingContract, tokenSaleContract);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new AnimalHelperToken(address, __gen_init);
    }
    static fromAddress(address) {
        return new AnimalHelperToken(address);
    }
    constructor(address, init) {
        this.abi = {
            types: AnimalHelperToken_types,
            getters: AnimalHelperToken_getters,
            receivers: AnimalHelperToken_receivers,
            errors: exports.AnimalHelperToken_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message === "mint_initial") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateContentMessage') {
            body = (0, core_1.beginCell)().store(storeUpdateContentMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'Deploy') {
            body = (0, core_1.beginCell)().store(storeDeploy(message)).endCell();
        }
        if (message === "get_jetton_data") {
            body = (0, core_1.beginCell)().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'GetWalletAddress') {
            body = (0, core_1.beginCell)().store(storeGetWalletAddress(message)).endCell();
        }
        if (body === null) {
            throw new Error('Invalid message type');
        }
        await provider.internal(via, { ...args, body: body });
    }
    async getGetWalletAddress(provider, owner) {
        const builder = new core_1.TupleBuilder();
        builder.writeAddress(owner);
        const source = (await provider.get('get_wallet_address', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    async getOwner(provider) {
        const builder = new core_1.TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
}
exports.AnimalHelperToken = AnimalHelperToken;
AnimalHelperToken.storageReserve = 0n;
AnimalHelperToken.errors = exports.AnimalHelperToken_errors_backward;
AnimalHelperToken.opcodes = AnimalHelperToken_opcodes;
