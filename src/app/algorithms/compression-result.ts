import { TreeNode } from "./binary-tree";

export class CompressionResult {

    compressedData: string;
    dictionary: Map<string, string>;
    tree?: TreeNode;
    frequency?: Map<string, number>;

    constructor(compressedData: string, dictionary: Map<string, string>, tree?: TreeNode, frequency?: Map<string, number>) {
        this.compressedData = compressedData;
        this.dictionary = dictionary;
        this.tree = tree;
        this.frequency = frequency;

    }
}