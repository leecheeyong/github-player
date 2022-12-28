"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statista = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/**
 * Search statistics.
 * Data provided by Statista.
 * @category Spice
 * @see https://www.statista.com/
 * @param query The query to search with
 * @param needleOptions The options for the HTTP request
 * @since v2.2.0
 * @returns The statista result
 */
async function statista(query, needleOptions) {
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/statista/${encodeURIComponent(query)}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
}
exports.statista = statista;
