import express from 'express';
import cors from 'cors';

import { pinoHttp } from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { getAllStudents, getStudentsById } from './services/students.js';

const PORT = Number(getEnvVar('PORT', '3000'));

function serverStart() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pinoHttp({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'все заебися',
    });
  });

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({
      data: students,
    });
  });

  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const student = await getStudentsById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'нема',
      });
    }
    res.status(200).json({
      data: student,
    });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'ти йобнувся',
    });
  });

  app.listen(PORT, () => {
    console.log(`${PORT} працює`);
  });
}

export default serverStart;
