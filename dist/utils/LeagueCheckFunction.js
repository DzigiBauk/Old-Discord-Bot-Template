"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(member, client, guild) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof ((_a = member.presence) === null || _a === void 0 ? void 0 : _a.activities[1]) == 'undefined') {
            console.log("No Activity!");
            return;
        }
        if (typeof ((_b = member.presence.activities[1].timestamps) === null || _b === void 0 ? void 0 : _b.start) == 'undefined') {
            console.log("No TimeStamp!");
            return;
        }
        let activityDate = new Date(member.presence.activities[1].timestamps.start);
        let activityElapsed = (Date.now() - activityDate.getTime()) / 1000 / 60;
        if (member.presence.activities[1].name.toLowerCase() == "league of legends") {
            if (activityElapsed >= 2) {
                client.channels.cache.get('834199676068036609').send(`${member} treba da se ubije`);
                return;
            }
            client.channels.cache.get('834199676068036609').send(`${member} jos uvek moze da ugasi Lol. Ima nade :(`);
            return;
        }
        client.channels.cache.get('834199676068036609').send(`${member} gledam te.`);
    });
}
exports.default = default_1;
