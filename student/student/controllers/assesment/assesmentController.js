
const assesmentModel = require('../../models/assessment/assessmentModel');

const studentModel = require('../../models/student/studentModel');

exports.getIndex=(req,res,next)=>{

    assesmentModel.findAll({
        include:[{
            model:studentModel,
            attributes: ['name', 'classs', 'nik','gender','Address','Image'],
        }]
    })
    .then((rows)=>{

        // console.log(rows);
        res.render('assesment/assesment-list',{
            pageTitle:'assessment',
            path:'/assessment',
            assessment:rows,
    
        })

       // console.log(rows);

    }).catch((err)=>{
        console.log(err);
    });


   
}

exports.getAsessmentAdd=(req,res,next)=>{


    studentModel.findAll()
    .then((rows,fieldData)=>{

        res.render('assesment/assesment-add',{
            pageTitle:'assessment',
            path:'/assessment',
            student:rows,
            assessment: '',
            edit: false,
            message:'',
    
        })

        console.log(rows);

        

    }).catch((err)=>{
            console.log(err);
    })

}


exports.PostAsessmentAdd=(req,res,next)=>{

    const student_id = req.body.student_id;
    const score = req.body.score;

    assesmentModel.create({
        score : score,
        studentId:student_id, 
    }).then((result)=>{
        console.log("sukksess assement");
        res.redirect('/assessment');
    }).catch((err)=>{
        console.log(err);
    })

    // const assesment = new assesmentModel(null,student_id,score);

    // assesment.save().then((result)=>{


    //     res.redirect('/assessment');


    // }).catch((err)=>{
    //     console.log(err);
    //     //res.redirect('/assessment');
    // });
  

    // console.log(score);
    // console.log('aasa');
}


exports.getEditAssesment = (req, res, next) => {

    const edit = req.query.edit;
    if (!edit) {
        return res.redirect('/assessment');
    }

    const assessmentId = req.params.assessment;
    assesmentModel.findByPk(assessmentId, {
            include: [{
                model: studentModel,
                attributes: ['id', 'name', 'classs', 'nik', 'gender', 'Address', 'Image'],
            }]
        })
        .then(rows => {
            return rows;
        })
        .then(rows => {
            studentModel.findAll()
                .then((result) => {
                    res.render('assesment/assesment-add', {
                        pageTitle: 'Add Assessment',
                        path: '/assessment',
                        assessment: rows,
                        student: result,
                        edit: true,
                        message: ''
                    })
                })
        })
    .catch((err)=>{
        console.log(err);
    })

  }




  exports.PostEditAsessment=(req,res,next)=>{

    const assment_id = req.body.id;
    const student_id = req.body.student_id;
    const score = req.body.score;

    console.log(student_id);
    assesmentModel.findByPk(assment_id)
    .then(ass=>{
        ass.score    =  score;
        ass.studentId = student_id;

        return ass.save();
    }).then((result)=>{
        console.log("Berhasil Di Update")
        res.redirect('/assessment');
    }).catch((err)=>{
        console.log(err);
        res.redirect('/assessment');
    });


    // const assesment = new assesmentModel(assment_id,student_id,score);

    // assesment.save().then((result)=>{


    //     res.redirect('/assessment');


    // }).catch((err)=>{
    //     console.log(err);
    //     //res.redirect('/assessment');
    // });
  

  }

 


  exports.getAsessmentDelete=(req,res,next)=>{

    const assessmentId = req.body.assessmentId;
    console.log(assessmentId);

    assesmentModel.findByPk(assessmentId)
    .then((assement)=>{

        return assement.destroy();
       // res.redirect('/assessment');
    }).then((result)=>{
        console.log("suksses hapus delete");
        res.redirect('/assessment'); 
    })
    
    
    .catch((err)=>{
        res.redirect('/assessment'); 
    })
      
}

