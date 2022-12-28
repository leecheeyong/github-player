"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dictionaryAudio = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../../util");
/**
 * Get audio of the word being said.
 * Data provided by Wordnik.
 * @category Spice
 * @see https://www.wordnik.com/
 * @param word The word to define
 * @param needleOptions The options for the HTTP request
 * @returns The dictionary audio result
 */
async function dictionaryAudio(word, needleOptions) {
    if (!word)
        throw new Error('Word cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/dictionary/audio/${word}`, needleOptions);
    if (response.body.toString() === 'ddg_spice_dictionary_audio();\n')
        return [];
    return response.body;
}
exports.dictionaryAudio = dictionaryAudio;
