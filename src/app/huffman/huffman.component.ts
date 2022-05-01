import { Component, Input, OnInit, Output } from '@angular/core';
import { TreeNode } from '../algorithms/binary-tree';
import { DisplayDictionary } from '../algorithms/display-dictionary';
import { Huffman } from '../algorithms/huffman';

@Component({
  selector: 'app-huffman',
  templateUrl: './huffman.component.html',
  styleUrls: ['./huffman.component.css']
})
export class HuffmanComponent implements OnInit {
  compressedData: string = "";
  dictionary: Map<string, string>;
  bitLen: number = 0;
  tree: TreeNode | null = null;
  displayDictionary: DisplayDictionary[] = []

  displayedColumns: string[] = ['char', 'frequency', 'encoding'];

  _inputData: string = ""

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
    if(this.inputData === "") {
      this.compressedData = "";
      this.dictionary = new Map<string, string>();
      this.displayDictionary = [];
      this.bitLen = 0;
      return;
    }
    let huffman = new Huffman(this.inputData);
    let compressionResult = huffman.compress();

    this.compressedData = compressionResult.compressedData;

    this.bitLen = this.compressedData.match(/\S/g)?.length || 0;

    this.dictionary = compressionResult.dictionary;
    this.tree = compressionResult.tree!;

    let frequency = compressionResult.frequency;

    this.displayDictionary = [];

    this.dictionary.forEach((k, v) => {
      this.displayDictionary.push({
        char: v,
        encoding: k,
        frequency: frequency!.get(v) || 0
      });
    });

    this.displayDictionary.sort((a, b) => b.frequency - a.frequency);
  }
}
