"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currency = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/**
 * Get the currency conversion between two currencies.
 * Data provided by XE.
 * @category Spice
 * @see https://www.xe.com/
 * @param from The currency to convert from
 * @param to The currency to convert to
 * @param amount The amount of currency to convert
 * @param needleOptions The options for the HTTP request
 * @returns The currency result
 */
async function currency(from, to, amount = 1, needleOptions) {
    if (!from)
        throw new Error('Currency `from` cannot be empty!');
    if (!to)
        throw new Error('Currency `to` cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/currency/${amount}/${from}/${to}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    if (result.headers.status !== '0')
        throw new Error(result.headers.description);
    return result;
}
exports.currency = currency;
