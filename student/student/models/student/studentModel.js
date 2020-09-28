const path = require('path');
const fs   = require('fs');
 const db   = require('../../utils/db');

// const p =path.join(path.dirname(process.mainModule.filename),
//         'data',
//         'student.json'
// )

// const getStudentFromFile = cb =>{
//         fs.readFile(p,(err,fileContent)=>{
//         if(err){
//             cb([]);
//         }else{
//             cb(JSON.parse(fileContent));
//         }
//     })
// }


module.exports=class Student{
      constructor(id,name,classs,nik,Image,gender,Address) {
          this.id=id
          this.name=name
          this.classs=classs
          this.nik=nik
          this.Image=Image
          this.gender=gender
          this.Address=Address
      }

      save(){
       if(this.id){
          return  db.execute(`UPDATE student SET name="${this.name}",classs="${this.classs}",nik="${this.nik}",Image="${this.Image}",gender="${this.gender}",Address="${this.Address}" WHERE id="${this.id}"`);
       }else{

           return db.execute('INSERT INTO student (name,classs,nik,Image,gender,Address) VALUES (?,?,?,?,?,?)',[this.name,this.classs,this.nik,this.Image,this.gender,this.Address])
       }
        //   getStudentFromFile(student=>{
        //     if(this.id){
        //         const studentindex = student.findIndex(stud => stud.id === this.id);
        //         const updatedstudent =[...student];
        //         updatedstudent[studentindex]=this;
        //         fs.writeFile(p,JSON.stringify(updatedstudent),(err)=>{
        //             console.log(err);
        //         })
        //     }else{
        //         this.id= Math.random().toString();
        //         student.push(this);
        //         fs.writeFile(p,JSON.stringify(student),(err)=>{
        //             console.log(err);
        //         })
        //     }

        //     })
         }


      static fetchAll(){
        //   getStudentFromFile(cb);
       return  db.execute("SELECT * FROM student");
      }

      static FindById(id){

       return db.execute('SELECT * FROM student WHERE student.id = ?',[id]);
        //   getStudentFromFile(students=>{
        //       const student= students.find(p => p.id === id);
        //       cb(student);
        //   })
      }

      static deleteById(id){

       return db.execute(`DELETE FROM student WHERE id="${id}"`);
        //   getStudentFromFile(students=>{
        //       const studentDelete = students.filter(stud => stud.id !== id);
        //       fs.writeFile(p,JSON.stringify(studentDelete),(err)=>{
        //           console.log(err);
        //       })
        //   })
      }
}