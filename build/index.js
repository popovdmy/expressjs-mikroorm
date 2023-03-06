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
exports.main = exports.app = exports.DI = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const core_1 = require("@mikro-orm/core");
const UserEntity_1 = require("./entities/UserEntity");
const UserRouter_1 = require("./routes/UserRouter");
dotenv_1.default.config();
exports.DI = {};
exports.app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
exports.app.use(body_parser_1.default.json());
exports.app.use(express_1.default.json());
exports.main = (() => __awaiter(void 0, void 0, void 0, function* () {
    exports.DI.orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    exports.DI.em = exports.DI.orm.em;
    exports.DI.userRepository = exports.DI.orm.em.getRepository(UserEntity_1.UserEntity);
    exports.app.use(body_parser_1.default.json());
    exports.app.use((_req, _res, next) => {
        core_1.RequestContext.create(exports.DI.orm.em, next);
    });
    const corsOptions = {
        origin: "http://localhost:4000",
        optionsSuccessStatus: 200
    };
    exports.app.use((0, cors_1.default)(corsOptions));
    exports.app.use(body_parser_1.default.json({ type: 'application/*+json' }));
    exports.app.use('/users/', UserRouter_1.UserRouter);
    exports.app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));
    exports.DI.server = exports.app.listen(PORT, () => {
        console.log(`express server started on localhost:${PORT}`);
    });
}))();
//# sourceMappingURL=index.js.map