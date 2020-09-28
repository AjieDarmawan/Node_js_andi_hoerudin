
const assesmentModel = require('../../models/assessment/assessmentModel');

const studentModel = require('../../models/student/studentModel');

exports.getIndex=(req,res,next)=>{

    assesmentModel.fetcAll()
    .then(([rows,fieldData])=>{

         console.log(rows);
        res.render('assesment/assesment-list',{
            pageTitle:'assessment',
            path:'/assessment',
            assessment:rows,
    
        })

        console.log(rows);

    }).catch((err)=>{
        console.log(err);
    });


   
}

exports.getAsessmentAdd=(req,res,next)=>{


    studentModel.fetchAll()
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

    const assesment = new assesmentModel(null,student_id,score);

    assesment.save().then((result)=>{


        res.redirect('/assessment');


    }).catch((err)=>{
        console.log(err);
        //res.redirect('/assessment');
    });
  

    // console.log(score);
    // console.log('aasa');
}


exports.getEditAssesment = (req, res, next) => {
    const Edit = req.query.edit;
    console.log(Edit);
    console.log("edit");
    if(!Edit){
        res.redirect('/');
    }

    const assessmentId = req.params.assessment;

    console.log(assessmentId);

    assesmentModel.findById(assessmentId)
    .then(([rows])=>{
       
         return rows[0];
         // console.log(student[0]);
         // console.log(student);

    }).then(rows=>{

        console.log(rows);


        studentModel.fetchAll().then(([result])=>{
            res.render('assesment/assesment-add', {
                pageTitle: 'assesment List',
                path: '/assesment-list',
                assessment:rows,
                student:result,
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

    const assesment = new assesmentModel(assment_id,student_id,score);

    assesment.save().then((result)=>{


        res.redirect('/assessment');


    }).catch((err)=>{
        console.log(err);
        //res.redirect('/assessment');
    });
  

  }

 


  exports.getAsessmentDelete=(req,res,next)=>{

    const assessmentId = req.body.assessmentId;
    console.log(assessmentId);

    assesmentModel.deleteById(assessmentId)
    .then((result)=>{
        res.redirect('/assessment');
    }).catch((err)=>{
        res.redirect('/assessment'); 
    })
      
}

