const tf = require('@tensorflow/tfjs-node');

let cachedModel = null;

async function loadModel() {
    if (!cachedModel) {
        console.log('Loading model...');
        cachedModel = await tf.loadGraphModel(process.env.MODEL_URL);
        console.log('Model loaded successfully.');
    }
    return cachedModel;
}

module.exports = loadModel;
