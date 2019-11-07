import { MediaObject } from '@ionic-native/media';
export class Record {
    constructor(public recording: boolean,public filePath: string, public fileName: string, public audioList: any[]  ) {}
  }
  