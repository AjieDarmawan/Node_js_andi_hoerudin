exports.getIndex=(req,res,next)=>{
    res.render('students/student-list',{
        pageTitle:'students',

    })
}