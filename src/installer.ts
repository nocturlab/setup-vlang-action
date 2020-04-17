import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as httpm from '@actions/http-client';
import * as sys from './system';
import {debug} from '@actions/core';
import {execSync} from 'child_process';

export async function download_v(v_version: string): Promise<string | undefined> {
  let download_path: string | undefined;
  let ext_path: string | undefined;
  let cache_path: string | undefined;

  try {
    // download
    let download_url: string = `https://github.com/vlang/v/releases/`
    if(v_version.includes('latest'))
      download_url+= `${v_version}/download/v_${sys.getPlatform()}.zip`
    else if(v_version.includes('master')){
      download_url = `https://github.com/vlang/v/archive/master.zip`
    }else
      download_url+= `download/${v_version}/v_${sys.getPlatform()}.zip`

    console.log(`Downloading V from ${download_url}`);

    download_path = await tc.downloadTool(download_url);
    console.log(`V downloaded to ${download_path}`);
  } catch (error) {
    throw new Error(`Failed to download V version ${v_version}: ${error}`);
  }

  try {
    // extract
    console.log('Extracting V...');
    ext_path = await tc.extractZip(download_path, './.vlang_tmp_build');
    console.log(`V extracted to ${ext_path}`);

    if(v_version.includes('master')) {
      console.log(`Building V from sources`);
      console.log(execSync(`make`, { cwd: ext_path }));
      ext_path = path.join(ext_path, 'v-master/');
    }
    
    // extracts with a root folder that matches the fileName downloaded
    console.log(`Add V to cache`);
    cache_path = await tc.cacheDir(ext_path, 'v', v_version);
    console.log(`V was added to cache using dir: ${cache_path}`);
  } catch (error) {
    throw new Error(`Failed to extract V version ${v_version}: ${error}`);
  }

  return cache_path;
}
