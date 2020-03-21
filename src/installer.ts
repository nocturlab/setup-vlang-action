import * as tc from '@actions/tool-cache';
import * as path from 'path';
import * as fs from 'fs';
import * as httpm from '@actions/http-client';
import * as sys from './system';
import {debug} from '@actions/core';

export async function download_v(v_version: string): Promise<string | undefined> {
  let tool_path: string | undefined;
  let download_path: string | undefined;
  try {
    // download
    let download_url: string = `https://github.com/vlang/v/releases/`
    if(v_version.includes('latest'))
      download_url+= `${v_version}/download/v_${sys.getPlatform()}.zip`
    else
      download_url+= `download/${v_version}/v_${sys.getPlatform()}.zip`
      
    console.log(`Downloading VLang from ${download_url}`);

    download_path = await tc.downloadTool(download_url);
    debug(`Vlang downloaded to ${download_path}`);
  } catch (error) {
    throw new Error(`Failed to download VLang version ${v_version}: ${error}`);
  }
  
  try {
    // extract
    console.log('Extracting VLang...');
    fs.mkdirSync('/home/runner/work/_temp/vlang');
    fs.readdir('/home/runner/work/_temp/', function(err, items) {
      console.log(items);
      for (var i=0; i<items.length; i++) {
          console.log(items[i]);
      }
    });
    let ext_path: string = await tc.extractZip(download_path, '/home/runner/work/_temp/vlang');
    debug(`VLang extracted to ${ext_path}`);

    // extracts with a root folder that matches the fileName downloaded
    const tool_root = path.join(ext_path, 'v');
    tool_path = await tc.cacheDir(tool_root, 'v', v_version);
  } catch (error) {
    throw new Error(`Failed to extract VLang version ${v_version}: ${error}`);
  }

  return tool_path;
}
