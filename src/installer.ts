import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as semver from 'semver';
import * as httpm from '@actions/http-client';
import * as sys from './system';
import {debug} from '@actions/core';

export async function download_v(
  version_v: string
): Promise<string | undefined> {
  let tool_path: string | undefined;

  try {
    // download
    let download_url: string = `https://github.com/vlang/v/releases/download/${v_version}/v_${sys.getPlatform()}.zip`
    console.log(`Downloading VLang from ${download_url}`);

    let downloadPath: string = await tc.downloadTool(download_url);
    debug(`Vlang downloaded to ${downloadPath}`);

    // extract
    console.log('Extracting VLang...');
    let ext_path: string = await tc.extractZip(download_path);
    debug(`VLang extracted to ${ext_path}`);

    // extracts with a root folder that matches the fileName downloaded
    const tool_root = path.join(ext_path, 'v');
    tool_path = await tc.cacheDir(tool_root, 'v', v_version);
  } catch (error) {
    throw new Error(`Failed to download version ${v_version}: ${error}`);
  }

  return tool_path;
}
