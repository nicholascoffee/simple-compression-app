export class TreeNode {
    data: string;
    key: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(data: string, key: number, left: TreeNode | null = null, 
        right: TreeNode | null = null) {
        this.data = data;
        this.key = key;
        this.left = left;
        this.right = right;
    }

    isLeaf(): boolean {
        return this.right == null && this.left == null;
    }

    static merge(left: TreeNode, right: TreeNode): TreeNode {
        let data: string = left.data + right.data;
        let key: number = left.key + right.key;

        let result: TreeNode = new TreeNode(data, key);

        result.left = left;
        result.right = right;
        
        return result;
    }

    //https://www.baeldung.com/java-print-binary-tree-diagram
    private traversePreOrderRec(result: string[], padding: string, pointer: string, node: TreeNode | null, hasRight: boolean) {
        if (node != null) {
            result.push(padding);
            result.push(pointer);
            result.push("(" + node.key + ") ");
            result.push(node.data);
            result.push("\n");
    

            let paddingForBoth: string = padding + "│  ";

            if(!hasRight) {
                paddingForBoth = padding + "   ";
            }


            let pointerForRight: string = "└─1─";
            let pointerForLeft: string = (node.right != null) ? "├─0─" : "└─0─";
    
            this.traversePreOrderRec(result, paddingForBoth, pointerForLeft, node.left, node.right != null);
            this.traversePreOrderRec(result, paddingForBoth, pointerForRight, node.right, false);
        }
    }

    toString(): string {
        console.log(this)
        let result: string[] = [];
        this.traversePreOrderRec(result, "", "", this, false)
        return result.join("");
    }

}
