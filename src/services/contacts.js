import { ContactsCollections } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollections.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollections.findById(contactId);
  console.log(contact);

  return contact;
};
