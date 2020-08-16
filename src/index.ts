// Inspired by https://github.com/actions/setup-go

import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as installer from './installer';
import * as path from 'path';
import * as fs from 'fs';

export async function run() {
  try {
    let v_version = core.getInput('v-version');

    console.log(`Setup V with version ${v_version}`);

    if (v_version) {
      let cache_dir: string | undefined = tc.find('v', v_version);
      let install_dir: string | undefined;

      if (!cache_dir) {
        console.log(`V ${v_version} can't be found using cache, attempting to download ...`);
        install_dir = await installer.download_v(v_version);
        console.log(`V Installed to ${install_dir}`);
      }

      if (install_dir) {
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
