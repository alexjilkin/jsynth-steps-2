import {sampleRate} from '../consts'

const bufferSize = 512;

export const play = (waveGenerator) => {
  let isPlaying = false;

  const master = new AudioContext({sampleRate});
  const buffer = master.createBuffer(1, bufferSize, sampleRate)
  const source = master.createScriptProcessor(bufferSize, 1, 1);

  const createBuffer = (output) => {
    for (let i = 0; i < buffer.length; i++) {
      const {value} = waveGenerator.next()

      output[i] = value
    }
  }

  source.buffer = buffer;
  source.connect(master.destination);
  
  source.addEventListener('audioprocess', (e) => {
    isPlaying ? createBuffer(e.outputBuffer.getChannelData(0)) : master.close();
  })

  isPlaying = true;

  return () => isPlaying = false
}