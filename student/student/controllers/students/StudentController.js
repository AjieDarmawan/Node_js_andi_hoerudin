
const studentModel = require('../../models/student/studentModel');

exports.getIndex=(req,res,next)=>{

    studentModel.findAll().then((rows)=>{

        res.render('students/student-list',{
        pageTitle:'students',
        path:'/student-list',
        student:rows

    })

    }).catch((err)=>{
        console.log(err);
    })

    

    

}

exports.getStudentAdd=(req,res,next)=>{
    res.render('students/student-add',{
        pageTitle:'students',
        path:'/student-list',
        edit: false,
        student: '',
        gender: '',
        message: ''

    })
}


exports.PostAddStudent = (req, res, next) => {
    
    const name = req.body.name;
    const classs = req.body.classs;
    const nik = req.body.nik;
    const Image = req.file;
    const gender = req.body.gender;
    const Address = req.body.Address;


    studentModel.create({

        name:name,
        classs:classs,
        nik:nik,
        Image:"Image",
        gender:gender,
        Address:Address,

    }).then((result)=>{
        console.log("create student");
        res.redirect('/student-list');
    }).catch((err)=>{
        console.log(err);
        res.redirect('/student-list');
    });

    // const Student = new studentModel(null,name,classs,nik,"123",gender,Address);
    // //const Student = new studentModel(null,"tes","1","1","Image","Male","Address");

    // console.log(req.body);

    // console.log(name);
    
    // Student.save().then(()=>{

    //     res.redirect('/student-list');
    // }).catch((err)=>{

    //     console.log(err);
    //     res.redirect('/student-list');

    // });


  }


  exports.getEditStudent = (req, res, next) => {

    const Edit = req.query.edit;

    console.log(Edit);
    console.log("edit");
    if(!Edit){
        res.redirect('/');
    }

    const studentId = req.params.student;

    studentModel.findByPk(studentId)
    .then(
        student=>{
        res.render('students/student-add', {
            pageTitle: 'Student List',
            path: '/student-list',
            student: student,
            edit: true,
            message: ''
          })

          console.log(student[0]);
         // console.log(student);

    }).catch((err)=>{
        console.log(err);
    })



  }

  exports.PostEditStudend=(req,res,next)=>{

    const name = req.body.name;
    const classs = req.body.classs;
    const nik = req.body.nik;
    const Image = req.file;
    const gender = req.body.gender;
    const Address = req.body.Address;
    const studentid = req.body.studentid;
    
    // const Student = new studentModel(studentid,name,classs,nik,"123",gender,Address);

    // Student.save().then(()=>{

    //     res.redirect('/student-list');
    // }).catch((err)=>{

    //     console.log(err);
    //     res.redirect('/student-list');

    // });


    studentModel.findByPk(studentid)
    .then(students=>{

        students.name = name;
        students.classs = classs;
        students.nik = nik;
        students.Image = "Image";
        students.gender = gender;
        students.Address = Address;

        return students.save();


    }).then(result=>{
        console.log("Update Student");
        res.redirect('/student-list');

    }).catch((err)=>{
        console.log(err);
    })

    

  }

  exports.deleteStudent = (req,res,next)=>{



    const studentid = req.body.studentid;

    console.log(studentid);

    studentModel.findByPk(studentid)
    .then((students)=>{
          return  students.destroy();
      
    }).then(result=>{
        console.log("delete success");
        res.redirect('/student-list');
    })
    
    
    .catch((err)=>{
        res.redirect('/student-list');   
    })

  }


  

  




