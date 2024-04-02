import express from 'express'
import {
  classCreation,
  deleteClass,
  deleteStudent,
  getStudentStandAndDivision,
  getStudentsBasedonStandard,
  studentRegister,
  updateStudentClass
} from '../Controller/studentController.js'
const router = express.Router()

router.post('/studentRegister', studentRegister)
router.post('/classCreation', classCreation)
router.post('/updateStudentClass/:id', updateStudentClass)
router.delete('/deleteStudent/:id', deleteStudent)
router.delete('/deleteClass/:id', deleteClass)
router.get('/getStudent', getStudentStandAndDivision)
router.get('/getStudentBasedOnStandard', getStudentsBasedonStandard)

export default router
