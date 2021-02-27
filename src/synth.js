import {getTriggers} from './input/KeyboardManager'
import oscillator from './modules/oscillator'

let masterClock = 0;

export const getMasterClock = () => masterClock

let modules = [];

export const subscribeModule = (module) => {
  modules.push(module)

  return () => {
    const index = modules.findIndex(_module => _module === module);
    modules = [...modules.slice(0, index), ...modules.slice(index + 1)]
  }
}

subscribeModule(oscillator)

export function* waveGenerator() {
    while(true) {   
      const triggers = getTriggers()
      let wave = 0;

      Object.keys(triggers).forEach((id) => {
        const {frequencyModulation, shouldGenerate} = triggers[id]

        if (!shouldGenerate) return;
        wave = modules.reduce((acc, {func}) => {
          return acc + func(wave, masterClock, frequencyModulation)
        }, wave)
        // wave += getSineWave(masterClock, 440 * frequencyModulation)
      })

      // Decrease volume 
      const mixVolume =  0.3
      yield wave * mixVolume

      masterClock++
    }
  }