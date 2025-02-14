const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Academic Details Api',
        description: 'Academical Details Api'   
    },
    info: {
        title: 'Class Info Api',
        description: 'Class Info Api'   
    },
    info: {
        title: 'Finances Api',
        description: 'Finances Api'   
    },
    info: {
        title: 'Students Api',
        description: 'Students Api'   
    },

    host: 'localhost:3000',
    schemes: ['https, http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles,doc);