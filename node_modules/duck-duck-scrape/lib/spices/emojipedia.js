"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emojipedia = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/**
 * Get information on an emoji.
 * Data provided by Emojipedia.
 * @category Spice
 * @see https://emojipedia.org/
 * @param emoji The emoji to use
 * @param needleOptions The options for the HTTP request
 * @since v2.2.0
 * @returns The emojipedia result
 */
async function emojipedia(emoji, needleOptions) {
    if (!emoji)
        throw new Error('Emoji cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/emojipedia/${emoji}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
}
exports.emojipedia = emojipedia;
