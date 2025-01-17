const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    try {
        // Path to your JSON file
        const filePath = path.join(__dirname, 'data.json');
        const data = fs.readFileSync(filePath, 'utf8');
        return {
            statusCode: 200,
            body: data,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to load data' }),
        };
    }
};