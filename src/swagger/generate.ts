import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Menu API',
    description: 'Documentación auto-generada con swagger-autogen + TypeScript',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './src/swagger/swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);