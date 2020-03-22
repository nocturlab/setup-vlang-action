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
const sys = __importStar(require("./system"));
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
            // extracts with a root folder that matches the fileName downloaded
            console.log(`Add V to cache`);
            cache_path = yield tc.cacheDir(ext_path, 'v', v_version);
            console.log(`V was added to cache using dir: ${cache_path}`);
        }
        catch (error) {
            throw new Error(`Failed to extract V version ${v_version}: ${error}`);
        }
        return cache_path;
    });
}
exports.download_v = download_v;
