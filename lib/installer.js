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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const tc = __importStar(require("@actions/tool-cache"));
const path = __importStar(require("path"));
const sys = __importStar(require("./system"));
const core_1 = require("@actions/core");
function download_v(v_version) {
    return __awaiter(this, void 0, void 0, function* () {
        let tool_path;
        let download_path;
        try {
            // download
            let download_url = `https://github.com/vlang/v/releases/`;
            if (v_version.includes('latest'))
                download_url += `${v_version}/download/v_${sys.getPlatform()}.zip`;
            else
                download_url += `download/${v_version}/v_${sys.getPlatform()}.zip`;
            console.log(`Downloading VLang from ${download_url}`);
            download_path = yield tc.downloadTool(download_url);
            core_1.debug(`Vlang downloaded to ${download_path}`);
        }
        catch (error) {
            throw new Error(`Failed to download VLang version ${v_version}: ${error}`);
        }
        try {
            // extract
            console.log('Extracting VLang...');
            let ext_path = yield tc.extractZip(download_path);
            core_1.debug(`VLang extracted to ${ext_path}`);
            // extracts with a root folder that matches the fileName downloaded
            const tool_root = path.join(ext_path, 'v');
            tool_path = yield tc.cacheDir(tool_root, 'v', v_version);
        }
        catch (error) {
            throw new Error(`Failed to extract VLang version ${v_version}: ${error}`);
        }
        return tool_path;
    });
}
exports.download_v = download_v;
