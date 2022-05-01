import { TreeNode } from "./binary-tree";
import { PriorityQueue } from "./priority-queue";
import { CompressionResult } from "./compression-result";

export class Huffman {

    private data: string;

    constructor(s: string) {
        this.data = s;
    }

    private calcFrequency() {
        let frequency: Map<string, number> = new Map<string, number>();

        for(let i: number = 0; i < this.data.length; i++) {
            let char: string = this.data[i];

            let current: number | undefined = frequency.get(char);

            if(current == undefined) {
                frequency.set(char, 1);
            } else {
                frequency.set(char, current + 1);
            }
        }
        return frequency;
    }

    private buildQueue(frequency: Map<string, number>): PriorityQueue<TreeNode> {
        let queue: PriorityQueue<TreeNode> = new PriorityQueue<TreeNode>(true);
        frequency.forEach((k, v) => {
            let node: TreeNode = new TreeNode(v, k);
            queue.enqueue(node, k);
        });
        return queue;
    }

    private buildDictionaryRec(node: TreeNode | null, currentEncoding:string, dictionary: Map<string, string>) {
        if(node === null) {
            return;
        }

        if(node.isLeaf()) {
            dictionary.set(node.data, currentEncoding)
        } else {
            this.buildDictionaryRec(node.left, currentEncoding + "0", dictionary)
            this.buildDictionaryRec(node.right, currentEncoding + "1", dictionary)
        }
    }

    private buildDictionary(node: TreeNode): Map<string, string> {
        let dictionary: Map<string, string> = new Map<string, string>();
        this.buildDictionaryRec(node, "", dictionary)

        return dictionary;
    }

    compress() : CompressionResult {
        let frequency = this.calcFrequency()
        let queue: PriorityQueue<TreeNode> = this.buildQueue(frequency);
        console.log(queue);
        while(queue.size != 1) {
            let m1: TreeNode = queue.dequeue();
            let m2: TreeNode = queue.dequeue();

            let mergedNode = TreeNode.merge(m1, m2);
            
            queue.enqueue(mergedNode, mergedNode.key);
        }
        let tree = queue.dequeue();
        let dictionary: Map<string, string> = this.buildDictionary(tree);
        console.log(dictionary);
        let result: string = "";

        for(let i: number = 0; i < this.data.length; i++) {
            let char: string = this.data[i];

            result += dictionary.get(char) + " ";
        }
        
        return new CompressionResult(result, dictionary, tree, frequency);
    }
}