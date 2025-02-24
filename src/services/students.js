import { StudentsCollections } from '../db/models/students.js';

export const getAllStudents = async () => {
  const students = await StudentsCollections.find();
  return students;
};

export const getStudentsById = async (studentId) => {
  const student = await StudentsCollections.findById(studentId);
  return student;
};
