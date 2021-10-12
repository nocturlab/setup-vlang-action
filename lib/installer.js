"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.download_v = void 0;
const tc = __importStar(require("@actions/tool-cache"));
const path = __importStar(require("path"));
const sys = __importStar(require("./system"));
const child_process_1 = require("child_process");
function download_v(v_version) {
    return __awaiter(this, void 0, void 0, function* () {
        let download_path;
        let ext_path;
        let cache_path;
        try {
            // download
            let download_url = `https://github.com/vlang/v/releases/`;
            if (v_version.includes('latest'))
                download_url += `${v_version}/download/v_${sys.getPlatform()}.zip`;
            else if (v_version.includes('master')) {
                download_url = `https://github.com/vlang/v/archive/master.zip`;
            }
            else
                download_url += `download/${v_version}/v_${sys.getPlatform()}.zip`;
            console.log(`Downloading V from ${download_url}`);
            download_path = yield tc.downloadTool(download_url);
            console.log(`V downloaded to ${download_path}`);
        }
        catch (error) {
            throw new Error(`Failed to download V version ${v_version}: ${error}`);
        }
        try {
            // extract
            console.log('Extracting V...');
            ext_path = yield tc.extractZip(download_path, './.vlang_tmp_build');
            console.log(`V extracted to ${ext_path}`);
            if (v_version.includes('master')) {
                console.log(`Building V from sources`);
                ext_path = path.join(ext_path, 'v-master/');
                console.log((0, child_process_1.execSync)(`make`, { cwd: ext_path }).toString());
            }
            else {
                ext_path = path.join(ext_path, 'v/');
            }
            // extracts with a root folder that matches the fileName downloaded
            console.log(`Add V to cache`);
            cache_path = yield tc.cacheDir(ext_path, 'nocturlab/setup-vlang-action', v_version);
            console.log(`V was added to cache using dir: ${cache_path}`);
        }
        catch (error) {
            throw new Error(`Failed to extract V version ${v_version}: ${error}`);
        }
        return cache_path;
    });
}
exports.download_v = download_v;
