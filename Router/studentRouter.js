import express from 'express'
import {
  classCreation,
  deleteClass,
  deleteStudent,
  getStudentStandAndDivision,
  getStudentsBasedonStandard,
  studentRegister,
  updateStudentDetails
} from '../Controller/studentController.js'
const router = express.Router()

router.post('/studentRegister', studentRegister)
router.post('/classCreation', classCreation)
router.post('/updateStudentDetails/:id', updateStudentDetails)
router.delete('/deleteStudent/:id', deleteStudent)
router.delete('/deleteClass/:id', deleteClass)
router.get('/getStudent/:id', getStudentStandAndDivision)
router.get('/getStudentBasedOnStandard/:id', getStudentsBasedonStandard)

export default router
