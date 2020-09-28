
const studentModel = require('../../models/student/studentModel');

exports.getIndex=(req,res,next)=>{

    studentModel.fetchAll().then(([rows,fileData])=>{

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

    const Student = new studentModel(null,name,classs,nik,"123",gender,Address);
    //const Student = new studentModel(null,"tes","1","1","Image","Male","Address");

    console.log(req.body);

    console.log(name);
    
    Student.save().then(()=>{

        res.redirect('/student-list');
    }).catch((err)=>{

        console.log(err);
        res.redirect('/student-list');

    });


  }


  exports.getEditStudent = (req, res, next) => {

    const Edit = req.query.edit;

    console.log(Edit);
    console.log("edit");
    if(!Edit){
        res.redirect('/');
    }

    const studentId = req.params.student;

    studentModel.FindById(studentId).then((student)=>{
        res.render('students/student-add', {
            pageTitle: 'Student List',
            path: '/student-list',
            student: student[0],
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
    
    const Student = new studentModel(studentid,name,classs,nik,"123",gender,Address);

    Student.save().then(()=>{

        res.redirect('/student-list');
    }).catch((err)=>{

        console.log(err);
        res.redirect('/student-list');

    });

    

  }

  exports.deleteStudent = (req,res,next)=>{



    const studentid = req.body.studentid;

    console.log(studentid);

    studentModel.deleteById(studentid)
    .then((result)=>{
        res.redirect('/student-list');
    }).catch((err)=>{
        res.redirect('/student-list');   
    })

  }


  

  




