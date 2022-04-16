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
class LeagueCheck {
    name() {
        return "LeagueCheck";
    }
    description() {
        return "Function that bans anyone who has played LoL for more than 30 minutes at a time.";
    }
    execute(args, msgObject, client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (msgObject.author.id != "242960634461814784")
                return;
            let user = msgObject.mentions.users.first();
            let guild = msgObject.guild;
            let member = guild.members.resolve(user);
            if (typeof (member.presence.activities[1].timestamps) == 'undefined') {
                console.log("No Activity!");
                return;
            }
            if (typeof ((_a = member.presence.activities[1].timestamps) === null || _a === void 0 ? void 0 : _a.start) == 'undefined') {
                console.log("No TimeStamp!");
                return;
            }
            let activityDate = new Date(member.presence.activities[1].timestamps.start);
            let activityElapsed = (Date.now() - activityDate.getTime()) / 1000 / 60;
            if (member.presence.activities[1].name.toLowerCase() == "league of legends") {
                if (activityElapsed >= 2) {
                    msgObject.reply("Ubi se . . .");
                    return;
                }
                msgObject.reply("Jos mozes da iskljucis :(");
                return;
            }
            msgObject.reply("U tvojim sam zidovima. ");
        });
    }
}
exports.default = LeagueCheck;
