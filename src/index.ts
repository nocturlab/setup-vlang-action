// Inspired by https://github.com/actions/setup-go

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as cache from '@actions/cache';

import * as installer from './installer';
import * as sys from './system';
import * as path from 'path';
import * as fs from 'fs';

export async function run() {
  try {
    let v_version = core.getInput('v-version');

    console.log(`Setup V with version ${v_version}`);

    if (v_version) {
      let cache_dir: string | undefined = await cache.restoreCache(['./v'], , ["v-", "v-${v_version}"]);
      let install_dir: string | undefined;

      if (!cache_dir) {
        console.log(`V ${v_version} can't be found using cache, attempting to download ...`);
        install_dir = await installer.download_v(v_version);
        console.log(`V Installed to ${install_dir}`);
      }

      if (install_dir) {
        console.log(`Add V to cache`);
        cache_path = const cacheId = await cache.saveCache([install_dir], "v-${v_version}-${sys.getPlatform()}-${sys.getArch()}")
        console.log(`V was added to cache using dir: ${cache_path}`);
        
        core.exportVariable('V_HOME', install_dir);
        core.setOutput('v_home', install_dir);
        core.addPath(install_dir);
        console.log('Added V to the path');
      } else {
        throw new Error(`Could not find a version that satisfied version spec: ${v_version}`);
      }
    }

    // add problem matchers
    const matchersPath = path.join(__dirname, '..', 'matchers.json');
    console.log(`##[add-matcher]${matchersPath}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
