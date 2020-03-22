"use strict";
// Inspired by https://github.com/actions/setup-go
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
const core = __importStar(require("@actions/core"));
const tc = __importStar(require("@actions/tool-cache"));
const installer = __importStar(require("./installer"));
const path = __importStar(require("path"));
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let v_version = core.getInput('v-version');
            console.log(`Setup V with version ${v_version}`);
            if (v_version) {
                let cache_dir = tc.find('v', v_version);
                let install_dir;
                if (!cache_dir) {
                    console.log(`V ${v_version} can't be found using cache, attempting to download ...`);
                    install_dir = yield installer.download_v(v_version);
                    console.log(`V Installed to ${install_dir}`);
                }
                if (install_dir) {
                    core.exportVariable('V_HOME', install_dir);
                    core.addPath(install_dir);
                    console.log('Added V to the path');
                }
                else {
                    throw new Error(`Could not find a version that satisfied version spec: ${v_version}`);
                }
            }
            // add problem matchers
            const matchersPath = path.join(__dirname, '..', 'matchers.json');
            console.log(`##[add-matcher]${matchersPath}`);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
exports.run = run;
run();
