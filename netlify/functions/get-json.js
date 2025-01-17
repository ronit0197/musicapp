const fs = require('fs');
const path = require('path');

exports.handler = async () => {
    try {
        const filePath = path.resolve(__dirname, 'data.json');
        console.log('File path:', filePath);

        // Check if the file exists
        const fileExists = fs.existsSync(filePath);
        console.log('File exists:', fileExists);

        if (!fileExists) {
            throw new Error('File does not exist');
        }

        const data = fs.readFileSync(filePath, 'utf8');
        return {
            statusCode: 200,
            body: data,
        };
    } catch (error) {
        console.error('Error loading file:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to load data',
                details: error.message,
            }),
        };
    }
};
