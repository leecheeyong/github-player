import { NeedleOptions } from 'needle';
export declare type DictionaryPronunciationType = 'ahd-5' | 'arpabet' | 'gcide-diacritical' | 'IPA';
/**
 * The result from the dictionary pronunciation spice.
 * @see https://developer.wordnik.com/docs#!/word/getTextPronunciations
 */
export interface DictionaryPronunciationResult {
    seq: number;
    raw: string;
    rawType: DictionaryPronunciationType;
    id: string;
    attributionText: string;
    attributionUrl: string;
}
/**
 * Get text pronunciations of a word.
 * Data provided by Wordnik.
 * @category Spice
 * @see https://www.wordnik.com/
 * @param word The word to define
 * @param needleOptions The options for the HTTP request
 * @returns The dictionary pronunciation result
 */
export declare function dictionaryPronunciation(word: string, needleOptions?: NeedleOptions): Promise<DictionaryPronunciationResult[]>;
