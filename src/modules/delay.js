import {sampleRate} from '../consts'
import createModule from './createModule'

const time = 0.5;
const depth = 6;
const gain = 0.6;
const feedbackSize = sampleRate * 4 * depth;
const feedback = new Array(feedbackSize).fill(0)

function delay(u, n) {
    const delayAmountBySamples = time * sampleRate;
    const cyclicN = n % feedbackSize
    feedback[cyclicN] = u;
    
    for(let i = 1; i < depth; i++) {     
        const currentFeedbackIndex = cyclicN - (i * delayAmountBySamples) < 0 ? feedbackSize - (i * delayAmountBySamples) : cyclicN - (i * delayAmountBySamples)
        const currentFeedback = feedback[currentFeedbackIndex]
        
        u = (u * 0.9) + (Math.pow(gain, i) * (u + currentFeedback))
    }

    return u;
}

export default createModule(delay, 'transform')