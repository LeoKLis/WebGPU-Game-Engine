export class TextureAtlas {
    image!: ImageBitmap;
    rowElements!: number;
    colElements!: number;

    async loadImage(src: string, rowElements: number, colElements: number) {
        this.image = await this.loadImageBitmap(src);
        this.rowElements = rowElements;
        this.colElements = colElements;
    }

    private async loadImageBitmap(url: string) {
        const res = await fetch(url);
        const blob = await res.blob();
        return await createImageBitmap(blob, { colorSpaceConversion: 'none' });
    }
}