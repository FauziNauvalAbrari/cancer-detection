const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

async function getAllData() {
    try {
        const predictCollection = db.collection('predictions');
        const snapshot = await predictCollection.get();
        
        if (snapshot.empty) {
            return [];
        }
        
        return snapshot.docs;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch prediction history');
    }
}
module.exports = getAllData;