"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dns = exports.DNSRecordType = void 0;
const needle_1 = __importDefault(require("needle"));
const util_1 = require("../util");
/** A type of DNS record. */
var DNSRecordType;
(function (DNSRecordType) {
    DNSRecordType["ANY"] = "any";
    DNSRecordType["A"] = "a";
    DNSRecordType["AAAA"] = "aaaa";
    DNSRecordType["AFSDB"] = "afsdb";
    DNSRecordType["APL"] = "apl";
    DNSRecordType["CAA"] = "caa";
    DNSRecordType["CERT"] = "cert";
    DNSRecordType["CNAME"] = "cname";
    DNSRecordType["DHCID"] = "dhcid";
    DNSRecordType["DLV"] = "dlv";
    DNSRecordType["DNAME"] = "dname";
    DNSRecordType["DNSKEY"] = "dnskey";
    DNSRecordType["DS"] = "ds";
    DNSRecordType["HIP"] = "hip";
    DNSRecordType["IPSECKEY"] = "ipseckey";
    DNSRecordType["KEY"] = "key";
    DNSRecordType["KX"] = "kx";
    DNSRecordType["LOC"] = "loc";
    DNSRecordType["MX"] = "mx";
    DNSRecordType["NS"] = "ns";
    DNSRecordType["NSEC"] = "nsec";
    DNSRecordType["NSEC3"] = "nsec3";
    DNSRecordType["NSEC3PARAM"] = "nsec3param";
    DNSRecordType["RRSIG"] = "rrsig";
    DNSRecordType["RP"] = "rp";
    DNSRecordType["SIG"] = "sig";
    DNSRecordType["SOA"] = "soa";
    DNSRecordType["SPF"] = "spf";
    DNSRecordType["SRV"] = "srv";
    DNSRecordType["SSHFP"] = "sshfp";
    DNSRecordType["TA"] = "ta";
    DNSRecordType["TKEY"] = "tkey";
    DNSRecordType["TLSA"] = "tlsa";
    DNSRecordType["TSIG"] = "tsig";
    DNSRecordType["TX"] = "tx";
    DNSRecordType["TXT"] = "txt";
})(DNSRecordType = exports.DNSRecordType || (exports.DNSRecordType = {}));
/**
 * Get DNS records of a domain.
 * Data provided by ViewDNS.info.
 * @category Spice
 * @see https://viewdns.info/
 * @param from The domain name to lookup
 * @param recordType The type of DNS record to retrieve
 * @param needleOptions The options for the HTTP request
 * @since v2.1.0
 * @returns The dns result
 */
async function dns(domain, recordType = DNSRecordType.ANY, needleOptions) {
    if (!domain)
        throw new Error('Domain cannot be empty!');
    const response = await (0, needle_1.default)('get', `${util_1.SPICE_BASE}/dns/${recordType}/${domain}`, needleOptions);
    const result = (0, util_1.parseSpiceBody)(response.body);
    return result;
}
exports.dns = dns;
