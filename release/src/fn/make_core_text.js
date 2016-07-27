"use strict";

function make_core_text(lang) {
    var result = {};
    for (var key in text.core[lang]) {
        result[key] = text.core[lang][key].text;
    }return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = make_core_text;