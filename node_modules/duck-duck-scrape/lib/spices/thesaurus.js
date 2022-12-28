"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thesaurus = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/**
 * Get synonyms and antonyms of a word.
 * Data provided by Big Huge Thesaurus.
 * @category Spice
 * @see https://words.bighugelabs.com/
 * @param word The word to define
 * @param needleOptions The options for the HTTP request
 * @since v2.2.0
 * @returns The thesaurus result
 */
async function thesaurus(word, needleOptions) {
    if (!word)
        throw new Error('Word cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/thesaurus/${word}`, needleOptions);
    if (response.body.toString() === 'ddg_spice_thesaurus();\n')
        return null;
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
}
exports.thesaurus = thesaurus;
