import Class from '../Modal/classModal.js'
import Student from '../Modal/studentModal.js'

//  cration of student
const studentRegister = async (req, res, next) => {
  try {
    const student = await new Student(req.body)
    const savedStudent = await student.save()
    res.status(200).json({ message: 'student has been created', savedStudent })
  } catch (error) {
    next(error)
  }
}

//creation of class

const classCreation = async (req, res, next) => {
  try {
    const class1 = await new Class(req.body)
    const savedClass = await class1.save()
    res.status(200).json({ message: 'class has been created', savedClass })
  } catch (error) {
    next(error)
  }
}

// update student details

const updateStudentDetails = async (req, res, next) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )

    const updateClass = await Class.findByIdAndUpdate(
      updateStudent.classId,
      { $set: { standard: req.body.standard, division: req.body.division } },
      { new: true }
    )

    res.status(200).json({
      message: 'Successfully updated',
      updatedStudent: updateStudent,
      updatedClass: updateClass
    })
  } catch (error) {
    next(error)
  }
}

// delete student

const deleteStudent = async (req, res, next) => {
  try {
    console.log(req.params.id)
    await Student.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'student has been deleted successfully' })
  } catch (error) {
    next(error)
  }
}

//delete class
const deleteClass = async (req, res, next) => {
  try {
    console.log(req.params.id)
    await Class.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Class has been deleted successfully' })
  } catch (error) {
    next(error)
  }
}

// read all student based on the standard and division

const getStudentStandAndDivision = async (req, res, next) => {
  try {
    const student = await Student.find({ classId: req.params.id })
    res.status(200).json({
      message: 'get all student details based on the stadard and division',
      student
    })
  } catch (error) {
    next(error)
  }
}

// real all studend based on the standard

const getStudentsBasedonStandard = async (req, res, next) => {
  try {
    const standard = Number(req.params.id)
    const students = await Student.aggregate([
      {
        $addFields: {
          classId: { $toObjectId: '$classId' } // Convert classId to ObjectId
        }
      },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'class'
        }
      },
      {
        $match: {
          'class.standard': standard
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          roll_no: 1,
          mobile: 1,
          'class.division': 1
        }
      }
    ])

    res.status(200).json({
      message: `Get all student details based on standard ${standard}`,
      students
    })
  } catch (error) {
    next(error)
  }
}

export {
  studentRegister,
  updateStudentDetails,
  classCreation,
  deleteStudent,
  deleteClass,
  getStudentStandAndDivision,
  getStudentsBasedonStandard
}
