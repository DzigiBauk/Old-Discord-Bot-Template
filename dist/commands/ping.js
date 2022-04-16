"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ping {
    name() {
        return "ping";
    }
    description() {
        return "Ping command or something. Take a guess :P";
    }
    execute(args, msgObject, client) {
        msgObject.reply("Pong!");
    }
}
exports.default = ping;
