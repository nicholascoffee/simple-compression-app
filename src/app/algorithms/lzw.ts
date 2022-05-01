import { CompressionResult } from "./compression-result";

export class LZW {
    private data: string;

    constructor(s: string) {
        this.data = s;
    }

    compress() {
        let code = 256;
        let output: string[] = []

        let dictionary = new Map<string, string>();

        let w: string = this.data.charAt(0);

        for(let i = 1; i < this.data.length; i++) {
            let k = this.data.charAt(i);

            if(dictionary.has(w + k)) {
                w = w + k;
            } else {
                dictionary.set(w + k, code.toString());
                code++;
                
                if(dictionary.has(w)) {
                    output.push(dictionary.get(w)!);
                } else {
                    output.push(w)
                }

                w = k
            }
        }

        if(dictionary.has(w)) {
            output.push(dictionary.get(w)!.toString());
        } else {
            output.push(w)
        }

        return new CompressionResult(output.join(" "), dictionary, undefined, undefined)
    }
}