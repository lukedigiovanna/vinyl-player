
export async function getAudioData(filePath: string) {
    const audioContext = new AudioContext();
    
    const response = await fetch(filePath);
    const buffer = await response.arrayBuffer();
    const decodeData = await audioContext.decodeAudioData(buffer);

    const rawData: Float32Array = decodeData.getChannelData(0);
    const blockSize = 1000;
    const numBlocks = Math.floor(decodeData.length / blockSize) + 1;
    const data = [];
    let max = 0;
    for (let i = 0; i < numBlocks; i++) {
        const start = i * blockSize;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum += rawData[start + j];
        }
        if (Math.abs(sum) > max) {
            max = Math.abs(sum);
        }
        data.push(sum);
    }
    for (let i = 0; i < numBlocks; i++) {
        data[i] /= max;
    }

    return data;
}