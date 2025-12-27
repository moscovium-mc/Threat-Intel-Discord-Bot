"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// Logger
class Logger {
    static getTimestamp() {
        return new Date().toISOString();
    }
    static info(message) {
        console.log(`[INFO] ${this.getTimestamp()} - ${message}`);
    }
    static error(message, error) {
        console.error(`[ERROR] ${this.getTimestamp()} - ${message}`);
        if (error)
            console.error(error);
    }
    static warn(message) {
        console.warn(`[WARN] ${this.getTimestamp()} - ${message}`);
    }
    static success(message) {
        console.log(`[SUCCESS] ${this.getTimestamp()} - SUCCESS ${message}`);
    }
}
exports.Logger = Logger;
