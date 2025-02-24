import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';
// import mongoose from 'mongoose';

const PORT = Number(getEnvVar('PORT', '3000'));

const setUpServer = () => {
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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully found contacts',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(contactId)) return false;

    try {
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(200).json({
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });
    } catch (error) {
      console.log(error);
    }
  });

  app.get('*', (req, res) => {
    res.status(404).json({
      message: 'Ops',
    });
  });
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
  });
};

export default setUpServer;
