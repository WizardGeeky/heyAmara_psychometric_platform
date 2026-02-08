declare module 'jspdf' {
    export class jsPDF {
        constructor(options?: any);
        constructor(orientation?: string, unit?: string, format?: string | number[], compressPdf?: boolean);
        internal: any;
        save(filename: string): void;
        addImage(imageData: string, format: string, x: number, y: number, w: number, h: number, alias?: string, compression?: string, rotation?: number): void;
    }
    export default jsPDF;
}
