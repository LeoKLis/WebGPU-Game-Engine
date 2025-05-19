
export class FixedFloat32Array {
    private buffer: Float32Array;
    public readonly size: number;

    constructor(size: number, initialValues?: ArrayBufferLike | number[], offset?: number) {
        if (size <= 0) {
            throw new Error("Size must be positive.");
        }
        this.size = size;

        if (initialValues instanceof ArrayBuffer || initialValues instanceof SharedArrayBuffer) {
            if (initialValues.byteLength > size * 4) {
                throw new Error("Initial values exceed fixed size.");
            }
            this.buffer = new Float32Array(initialValues, offset, size);
        } else if (this.isNumberArray(initialValues)) {
            if (initialValues.length > size) {
                throw new Error("Initial values exceeded fixed size.")
            }
            this.buffer = new Float32Array(initialValues);
        } else {
            this.buffer = new Float32Array(size);
        }
    }

    get(index: number): number {
        this.checkBounds(index);
        return this.buffer[index];
    }

    set(index: number, value: number): void {
        this.checkBounds(index);
        this.buffer[index] = value;
    }

    toArray(): number[] {
        return Array.from(this.buffer);
    }

    fill(value: number): void {
        this.buffer.fill(value);
    }

    private checkBounds(index: number): void {
        if (index < 0 || index >= this.size) {
            throw new RangeError(`Index ${index} is out of bounds (0 - ${this.size - 1})`);
        }
    }
    
    private isNumberArray(value: any): value is number[] {
        return Array.isArray(value) && value.every(item => typeof item === 'number');
    }

    get raw(): Float32Array {
    return this.buffer;
}
}
