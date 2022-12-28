"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stocks = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/**
 * Get the stocks of a symbol.
 * Data provided by Xignite.
 * @category Spice
 * @see https://www.xignite.com/
 * @param symbol What symbol to get stats from
 * @param needleOptions The options for the HTTP request
 * @returns The stocks result
 */
async function stocks(symbol, needleOptions) {
    if (!symbol)
        throw new Error('Symbol cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/stocks/${symbol}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    if (result.Outcome !== 'Success')
        throw new Error(`${result.Outcome}: ${result.Message}`);
    return result;
}
exports.stocks = stocks;
