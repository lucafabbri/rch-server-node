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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rch_driver_js_1 = require("rch-driver-js");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080; // default port to listen
app.use(express_1.default.json());
// define a route handler for the default home page
app.post("/print-receipt", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let driver = new rch_driver_js_1.Driver();
    yield driver.open({ ip: "192.168.1.10", ipPort: 23, connection: rch_driver_js_1.ConnectionConst.TCPIP });
    let result = yield driver.printReceipt(req.body, false, false);
    yield driver.close();
    res.send(result);
}));
app.post("/send-commands", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let driver = new rch_driver_js_1.Driver();
    yield driver.open({ ip: "192.168.1.10", ipPort: 23, connection: rch_driver_js_1.ConnectionConst.TCPIP });
    let result = yield driver.sendCommands(req.body.commands);
    yield driver.close();
    res.send(result);
}));
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map