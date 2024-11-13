const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const getAllData = require('../services/getAllData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  if (!image) {
    // Jika gambar tidak ada, lempar InputError
    throw new InputError('Image is required');
}
  const { model } = request.server.app;
 
  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
 
  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "createdAt": createdAt
  }
 
  await storeData(id, data);

  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data
  })
  response.code(201);
  return response;
}

async function postPredictHistoriesHandler(request, h) {
  try {
    const allData = await getAllData(); // Fetch historical data

    const formatAllData = allData.map(doc => {
      const data = doc.data(); // Extract document data
      return {
        id: doc.id,
        history: {
          result: data.result,
          createdAt: data.createdAt,
          suggestion: data.suggestion,
          id: doc.id
        }
      };
    });

    const response = h.response({
      status: 'success',
      data: formatAllData
    });

    response.code(200); // HTTP status code for "OK"
    return response;

  } catch (error) {
    console.error('Error in postPredictHistoriesHandler:', error);
    return h.response({
      status: 'fail',
      message: 'Internal Server Error',
      error: error.message
    }).code(500);
  }
}

module.exports = { postPredictHandler, postPredictHistoriesHandler };
