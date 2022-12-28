"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.time = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/**
 * Search the time of locations with a query.
 * Data provided by TimeAndDate.com.
 * @category Spice
 * @see https://www.timeanddate.com/
 * @param query The query to search with
 * @param needleOptions The options of the HTTP request
 * @returns The time result
 */
async function time(query, needleOptions) {
    if (!query)
        throw new Error('Query cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/time/${query}`, needleOptions);
    return (0, util_1.parseSpiceBody)(response.body);
}
exports.time = time;
