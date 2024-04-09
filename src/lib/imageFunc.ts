import { unzipSync } from 'fflate';
import { Buffer } from 'buffer';

export const imageProcessing = (props: any) => {
    const reader = new FileReader();
    reader.onload = function (e) {
        const arrayBuffer = new Uint8Array(reader.result as ArrayBuffer);
        const imagesArray = unzipSync(arrayBuffer);
        let keys: any[] = [];
        let images: any[] = [];
        for (const key in imagesArray) {
            keys.push(key);
            const newImage = Buffer.from(imagesArray[key]).toString('base64');
            images.push(newImage);
        }
        // setImageNames(keys);
        props.setImages(images);
    };
    reader.onerror = function (e) {
        console.error('Error reading file:', e?.target?.error);
    };
    reader.readAsArrayBuffer(props.data);
};
