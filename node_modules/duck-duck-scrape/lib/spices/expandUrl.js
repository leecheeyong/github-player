"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expandUrl = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/**
 * Expand a shortened link.
 * Data provided by Unshorten.me.
 * @category Spice
 * @see https://unshorten.me/
 * @param url The URL to unshorten
 * @param needleOptions The options for the HTTP request
 * @since v2.2.0
 * @returns The expandUrl result
 */
async function expandUrl(url, needleOptions) {
    if (!url)
        throw new Error('URL cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/expand_url/${encodeURIComponent(url)}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
}
exports.expandUrl = expandUrl;
