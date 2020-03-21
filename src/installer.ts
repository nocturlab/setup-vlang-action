import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as fs from 'fs';
import * as httpm from '@actions/http-client';
import * as sys from './system';
import {debug} from '@actions/core';

export async function download_v(v_version: string): Promise<string | undefined> {
  let download_path: string | undefined;
  let ext_path: string | undefined;
  let cache_path: string | undefined;

  try {
    // download
    let download_url: string = `https://github.com/vlang/v/releases/`
    if(v_version.includes('latest'))
      download_url+= `${v_version}/download/v_${sys.getPlatform()}.zip`
    else
      download_url+= `download/${v_version}/v_${sys.getPlatform()}.zip`
      
    console.log(`Downloading VLang from ${download_url}`);

    download_path = await tc.downloadTool(download_url);
    console.log(`Vlang downloaded to ${download_path}`);
  } catch (error) {
    throw new Error(`Failed to download VLang version ${v_version}: ${error}`);
  }
  
  try {
    // extract
    console.log('Extracting VLang...');
    ext_path = await tc.extractZip(download_path, '/home/runner/work/_temp/vlang');
    console.log(`VLang extracted to ${ext_path}`);

    // extracts with a root folder that matches the fileName downloaded
    console.log(`Add VLang to cache`);
    cache_path = await tc.cacheDir(ext_path, 'v', v_version);
    console.log(`VLang was added to cache using dir: ${cache_path}`);
    fs.readdir(cache_path, (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    })
  } catch (error) {
    throw new Error(`Failed to extract VLang version ${v_version}: ${error}`);
  }

  return path.join(ext_path, 'v');
}
