"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalHelperPool = exports.AnimalHelperPool_getterMapping = exports.AnimalHelperPool_errors_backward = exports.AnimalHelperPool_errors = void 0;
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
exports.storeTransferToAnimalShelterMessage = storeTransferToAnimalShelterMessage;
exports.loadTransferToAnimalShelterMessage = loadTransferToAnimalShelterMessage;
exports.storeEmergencyTransferMessage = storeEmergencyTransferMessage;
exports.loadEmergencyTransferMessage = loadEmergencyTransferMessage;
exports.storeUpdateVotingContractMessage = storeUpdateVotingContractMessage;
exports.loadUpdateVotingContractMessage = loadUpdateVotingContractMessage;
exports.storeGetStatisticsMessage = storeGetStatisticsMessage;
exports.loadGetStatisticsMessage = loadGetStatisticsMessage;
exports.storeConvertToTokenMessage = storeConvertToTokenMessage;
exports.loadConvertToTokenMessage = loadConvertToTokenMessage;
exports.storeExternalDonationMessage = storeExternalDonationMessage;
exports.loadExternalDonationMessage = loadExternalDonationMessage;
exports.storeEmergencyWithdrawMessage = storeEmergencyWithdrawMessage;
exports.loadEmergencyWithdrawMessage = loadEmergencyWithdrawMessage;
exports.storeAnimalHelperPool$Data = storeAnimalHelperPool$Data;
exports.loadAnimalHelperPool$Data = loadAnimalHelperPool$Data;
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
function storeTransferToAnimalShelterMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3066446376, 32);
        b_0.storeAddress(src.shelter_address);
    };
}
function loadTransferToAnimalShelterMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3066446376) {
        throw Error('Invalid prefix');
    }
    const _shelter_address = sc_0.loadAddress();
    return { $$type: 'TransferToAnimalShelterMessage', shelter_address: _shelter_address };
}
function loadTupleTransferToAnimalShelterMessage(source) {
    const _shelter_address = source.readAddress();
    return { $$type: 'TransferToAnimalShelterMessage', shelter_address: _shelter_address };
}
function loadGetterTupleTransferToAnimalShelterMessage(source) {
    const _shelter_address = source.readAddress();
    return { $$type: 'TransferToAnimalShelterMessage', shelter_address: _shelter_address };
}
function storeTupleTransferToAnimalShelterMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.shelter_address);
    return builder.build();
}
function dictValueParserTransferToAnimalShelterMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeTransferToAnimalShelterMessage(src)).endCell());
        },
        parse: (src) => {
            return loadTransferToAnimalShelterMessage(src.loadRef().beginParse());
        }
    };
}
function storeEmergencyTransferMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(2251700865, 32);
        b_0.storeAddress(src.target);
        b_0.storeCoins(src.amount);
    };
}
function loadEmergencyTransferMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2251700865) {
        throw Error('Invalid prefix');
    }
    const _target = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    return { $$type: 'EmergencyTransferMessage', target: _target, amount: _amount };
}
function loadTupleEmergencyTransferMessage(source) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'EmergencyTransferMessage', target: _target, amount: _amount };
}
function loadGetterTupleEmergencyTransferMessage(source) {
    const _target = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'EmergencyTransferMessage', target: _target, amount: _amount };
}
function storeTupleEmergencyTransferMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.target);
    builder.writeNumber(source.amount);
    return builder.build();
}
function dictValueParserEmergencyTransferMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeEmergencyTransferMessage(src)).endCell());
        },
        parse: (src) => {
            return loadEmergencyTransferMessage(src.loadRef().beginParse());
        }
    };
}
function storeUpdateVotingContractMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(626563495, 32);
        b_0.storeAddress(src.new_address);
    };
}
function loadUpdateVotingContractMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 626563495) {
        throw Error('Invalid prefix');
    }
    const _new_address = sc_0.loadAddress();
    return { $$type: 'UpdateVotingContractMessage', new_address: _new_address };
}
function loadTupleUpdateVotingContractMessage(source) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateVotingContractMessage', new_address: _new_address };
}
function loadGetterTupleUpdateVotingContractMessage(source) {
    const _new_address = source.readAddress();
    return { $$type: 'UpdateVotingContractMessage', new_address: _new_address };
}
function storeTupleUpdateVotingContractMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.new_address);
    return builder.build();
}
function dictValueParserUpdateVotingContractMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeUpdateVotingContractMessage(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateVotingContractMessage(src.loadRef().beginParse());
        }
    };
}
function storeGetStatisticsMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(3573077268, 32);
    };
}
function loadGetStatisticsMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3573077268) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'GetStatisticsMessage' };
}
function loadTupleGetStatisticsMessage(source) {
    return { $$type: 'GetStatisticsMessage' };
}
function loadGetterTupleGetStatisticsMessage(source) {
    return { $$type: 'GetStatisticsMessage' };
}
function storeTupleGetStatisticsMessage(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserGetStatisticsMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeGetStatisticsMessage(src)).endCell());
        },
        parse: (src) => {
            return loadGetStatisticsMessage(src.loadRef().beginParse());
        }
    };
}
function storeConvertToTokenMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(1511005038, 32);
        b_0.storeAddress(src.token_address);
        b_0.storeCoins(src.amount);
    };
}
function loadConvertToTokenMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1511005038) {
        throw Error('Invalid prefix');
    }
    const _token_address = sc_0.loadAddress();
    const _amount = sc_0.loadCoins();
    return { $$type: 'ConvertToTokenMessage', token_address: _token_address, amount: _amount };
}
function loadTupleConvertToTokenMessage(source) {
    const _token_address = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ConvertToTokenMessage', token_address: _token_address, amount: _amount };
}
function loadGetterTupleConvertToTokenMessage(source) {
    const _token_address = source.readAddress();
    const _amount = source.readBigNumber();
    return { $$type: 'ConvertToTokenMessage', token_address: _token_address, amount: _amount };
}
function storeTupleConvertToTokenMessage(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.token_address);
    builder.writeNumber(source.amount);
    return builder.build();
}
function dictValueParserConvertToTokenMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeConvertToTokenMessage(src)).endCell());
        },
        parse: (src) => {
            return loadConvertToTokenMessage(src.loadRef().beginParse());
        }
    };
}
function storeExternalDonationMessage(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeUint(820711374, 32);
    };
}
function loadExternalDonationMessage(slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 820711374) {
        throw Error('Invalid prefix');
    }
    return { $$type: 'ExternalDonationMessage' };
}
function loadTupleExternalDonationMessage(source) {
    return { $$type: 'ExternalDonationMessage' };
}
function loadGetterTupleExternalDonationMessage(source) {
    return { $$type: 'ExternalDonationMessage' };
}
function storeTupleExternalDonationMessage(source) {
    const builder = new core_1.TupleBuilder();
    return builder.build();
}
function dictValueParserExternalDonationMessage() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeExternalDonationMessage(src)).endCell());
        },
        parse: (src) => {
            return loadExternalDonationMessage(src.loadRef().beginParse());
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
function storeAnimalHelperPool$Data(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.votingContract);
        b_0.storeInt(src.lastTransferTime, 257);
        const b_1 = new core_1.Builder();
        b_1.storeInt(src.lastTransferAmount, 257);
        b_1.storeAddress(src.lastTransferTarget);
        b_1.storeInt(src.totalDonated, 257);
        const b_2 = new core_1.Builder();
        b_2.storeInt(src.totalTransfers, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}
function loadAnimalHelperPool$Data(slice) {
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
    return { $$type: 'AnimalHelperPool$Data', owner: _owner, votingContract: _votingContract, lastTransferTime: _lastTransferTime, lastTransferAmount: _lastTransferAmount, lastTransferTarget: _lastTransferTarget, totalDonated: _totalDonated, totalTransfers: _totalTransfers };
}
function loadTupleAnimalHelperPool$Data(source) {
    const _owner = source.readAddress();
    const _votingContract = source.readAddress();
    const _lastTransferTime = source.readBigNumber();
    const _lastTransferAmount = source.readBigNumber();
    const _lastTransferTarget = source.readAddress();
    const _totalDonated = source.readBigNumber();
    const _totalTransfers = source.readBigNumber();
    return { $$type: 'AnimalHelperPool$Data', owner: _owner, votingContract: _votingContract, lastTransferTime: _lastTransferTime, lastTransferAmount: _lastTransferAmount, lastTransferTarget: _lastTransferTarget, totalDonated: _totalDonated, totalTransfers: _totalTransfers };
}
function loadGetterTupleAnimalHelperPool$Data(source) {
    const _owner = source.readAddress();
    const _votingContract = source.readAddress();
    const _lastTransferTime = source.readBigNumber();
    const _lastTransferAmount = source.readBigNumber();
    const _lastTransferTarget = source.readAddress();
    const _totalDonated = source.readBigNumber();
    const _totalTransfers = source.readBigNumber();
    return { $$type: 'AnimalHelperPool$Data', owner: _owner, votingContract: _votingContract, lastTransferTime: _lastTransferTime, lastTransferAmount: _lastTransferAmount, lastTransferTarget: _lastTransferTarget, totalDonated: _totalDonated, totalTransfers: _totalTransfers };
}
function storeTupleAnimalHelperPool$Data(source) {
    const builder = new core_1.TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.votingContract);
    builder.writeNumber(source.lastTransferTime);
    builder.writeNumber(source.lastTransferAmount);
    builder.writeAddress(source.lastTransferTarget);
    builder.writeNumber(source.totalDonated);
    builder.writeNumber(source.totalTransfers);
    return builder.build();
}
function dictValueParserAnimalHelperPool$Data() {
    return {
        serialize: (src, builder) => {
            builder.storeRef((0, core_1.beginCell)().store(storeAnimalHelperPool$Data(src)).endCell());
        },
        parse: (src) => {
            return loadAnimalHelperPool$Data(src.loadRef().beginParse());
        }
    };
}
function initAnimalHelperPool_init_args(src) {
    return (builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.votingContract);
    };
}
async function AnimalHelperPool_init(owner, votingContract) {
    const __code = core_1.Cell.fromHex('b5ee9c72410212010005a5000114ff00f4a413f4bcf2c80b0102016202100130d001d072d721d200d200fa4021103450666f04f86102f8620301feed44d0d200018e29fa40fa40810101d700d401d0810101d700fa40810101d700d430d0810101d700301047104610456c178e31fa40fa405902d101705470008d086000000000000000000000000000000000000000000000000000000000000000000459e208925f08e07027d74920c21f953107d31f08de218210b6c642280403febae30221821086363a81ba8ef110255f0503fa40fa0059328138c6f8425250c705f2f48200ca2af8276f105230bbf2f47f72c87001cb1fc92343132502146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00f82306a4104610354130e0050c0701fe10255f0503fa4001318200a5c3f8425230c705917f96f8425240c705e2f2f4f8276f10aa027aa9048200ca2a21821005f5e100bcf2f4f823531208a47f72c87001cb1fc9104710231026146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c90106007efb001046103544145033c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed5404fc218210255899a7ba8e4d5b3405fa4001318138c6f8425260c705f2f4104645155034c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed54e0218210d4f8d514bae3022182105a101b6ebae30221821030eb0fcebae302218210fac86711ba08090a0b01be5b36c85260cb3f5270cb1f5230cb3f5220cb3f21cf16f8276f1001cb3fc9f84270588042015a6d6d40037fc8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00104655130c01e85b06fa40fa0059328138c6f8425280c705f2f48200ca2af8276f105230bbf2f47f72c8821015a038fb01cb1f7001cb3ff828cf16c910341023146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00104655130c008e5b36f8416f24135f0316a010461035440302c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed5403d88ed05b368138c6f8425260c705f2f4f8427070810082036d6d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0010465513e0218210946a98b6bae30238c00007c12117b0e3025f07f2c0820c0d0f006ac87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed5401b05b06d33f0131c8018210aff90f5758cb1fcb3fc91057104610354430f84201706ddb3cc87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed540e00966d6d226eb3945b6f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00008af8416f24135f0316a010461035440302c87f01ca0055605076cf165004cf1612810101cf0001c8810101cf0058cf1613810101cf0001c8810101cf00c901ccc901ccc9ed5401d7a08a3bda89a1a400031c53f481f481020203ae01a803a1020203ae01f481020203ae01a861a1020203ae0060208e208c208ad82f1c63f481f480b205a202e0a8e0011a10c0000000000000000000000000000000000000000000000000000000000000000008b3c5b678d8e311000226261098bc');
    const builder = (0, core_1.beginCell)();
    builder.storeUint(0, 1);
    initAnimalHelperPool_init_args({ $$type: 'AnimalHelperPool_init_args', owner, votingContract })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}
exports.AnimalHelperPool_errors = {
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
};
exports.AnimalHelperPool_errors_backward = {
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
};
const AnimalHelperPool_types = [
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
    { "name": "TransferToAnimalShelterMessage", "header": 3066446376, "fields": [{ "name": "shelter_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "EmergencyTransferMessage", "header": 2251700865, "fields": [{ "name": "target", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "UpdateVotingContractMessage", "header": 626563495, "fields": [{ "name": "new_address", "type": { "kind": "simple", "type": "address", "optional": false } }] },
    { "name": "GetStatisticsMessage", "header": 3573077268, "fields": [] },
    { "name": "ConvertToTokenMessage", "header": 1511005038, "fields": [{ "name": "token_address", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "amount", "type": { "kind": "simple", "type": "uint", "optional": false, "format": "coins" } }] },
    { "name": "ExternalDonationMessage", "header": 820711374, "fields": [] },
    { "name": "EmergencyWithdrawMessage", "header": 4207437585, "fields": [] },
    { "name": "AnimalHelperPool$Data", "header": null, "fields": [{ "name": "owner", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "votingContract", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "lastTransferTime", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lastTransferAmount", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "lastTransferTarget", "type": { "kind": "simple", "type": "address", "optional": false } }, { "name": "totalDonated", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }, { "name": "totalTransfers", "type": { "kind": "simple", "type": "int", "optional": false, "format": 257 } }] },
];
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
};
const AnimalHelperPool_getters = [
    { "name": "owner", "methodId": 83229, "arguments": [], "returnType": { "kind": "simple", "type": "address", "optional": false } },
];
exports.AnimalHelperPool_getterMapping = {
    'owner': 'getOwner',
};
const AnimalHelperPool_receivers = [
    { "receiver": "internal", "message": { "kind": "empty" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "TransferToAnimalShelterMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "EmergencyTransferMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "UpdateVotingContractMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "GetStatisticsMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ConvertToTokenMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "ExternalDonationMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "EmergencyWithdrawMessage" } },
    { "receiver": "internal", "message": { "kind": "typed", "type": "Deploy" } },
];
class AnimalHelperPool {
    static async init(owner, votingContract) {
        return await AnimalHelperPool_init(owner, votingContract);
    }
    static async fromInit(owner, votingContract) {
        const __gen_init = await AnimalHelperPool_init(owner, votingContract);
        const address = (0, core_1.contractAddress)(0, __gen_init);
        return new AnimalHelperPool(address, __gen_init);
    }
    static fromAddress(address) {
        return new AnimalHelperPool(address);
    }
    constructor(address, init) {
        this.abi = {
            types: AnimalHelperPool_types,
            getters: AnimalHelperPool_getters,
            receivers: AnimalHelperPool_receivers,
            errors: exports.AnimalHelperPool_errors,
        };
        this.address = address;
        this.init = init;
    }
    async send(provider, via, args, message) {
        let body = null;
        if (message === null) {
            body = new core_1.Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'TransferToAnimalShelterMessage') {
            body = (0, core_1.beginCell)().store(storeTransferToAnimalShelterMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'EmergencyTransferMessage') {
            body = (0, core_1.beginCell)().store(storeEmergencyTransferMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'UpdateVotingContractMessage') {
            body = (0, core_1.beginCell)().store(storeUpdateVotingContractMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'GetStatisticsMessage') {
            body = (0, core_1.beginCell)().store(storeGetStatisticsMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ConvertToTokenMessage') {
            body = (0, core_1.beginCell)().store(storeConvertToTokenMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof core_1.Slice) && message.$$type === 'ExternalDonationMessage') {
            body = (0, core_1.beginCell)().store(storeExternalDonationMessage(message)).endCell();
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
exports.AnimalHelperPool = AnimalHelperPool;
AnimalHelperPool.storageReserve = 0n;
AnimalHelperPool.errors = exports.AnimalHelperPool_errors_backward;
AnimalHelperPool.opcodes = AnimalHelperPool_opcodes;
