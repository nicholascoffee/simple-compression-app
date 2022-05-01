import { Component, Input, OnInit } from '@angular/core';
import { DisplayDictionary } from '../algorithms/display-dictionary';
import { LZW } from '../algorithms/lzw';

@Component({
  selector: 'app-lzw',
  templateUrl: './lzw.component.html',
  styleUrls: ['./lzw.component.css']
})
export class LZWComponent implements OnInit {
  compressedData: string = "";
  dictionary: Map<string, string>;
  numOfChar: number = 0;

  displayedColumns: string[] = ['char', 'code'];

  _inputData: string = ""
  displayDictionary: DisplayDictionary[] = [];

  get inputData(): string {
    return this._inputData;
  }

  @Input() set inputData(newInput: string) {
    this._inputData = newInput;
    this.updateCompression();
  }

  constructor() {
    this.dictionary = new Map<string, string>();

  }

  ngOnInit(): void {

  }

  updateCompression() {
    if (this.inputData === "") {
      this.compressedData = "";
      this.dictionary = new Map<string, string>();
      this.displayDictionary = [];
      this.numOfChar = 0;
      return;
    }

    let lzw = new LZW(this.inputData);
    let compressionResult = lzw.compress();

    this.compressedData = compressionResult.compressedData;

    this.numOfChar = compressionResult.compressedData.split(" ").length;

    this.dictionary = compressionResult.dictionary;

    let frequency = compressionResult.frequency;

    this.displayDictionary = [];

    this.dictionary.forEach((k, v) => {
      this.displayDictionary.push({
        char: v,
        encoding: k,
        frequency: 0
      });
    });

    this.displayDictionary.sort((a, b) => {
      if(a.encoding > b.encoding)
        return 1;
      else if (b.encoding > a.encoding)
        return -1;
      else 
        return 0;
    });
  }
}

