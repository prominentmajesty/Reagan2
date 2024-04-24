import { connectToDb } from "@/lib/utils";
import { Results } from "@/lib/results";
import { Elsie } from "next/font/google";

export const POST = async(request, {params}) => {
    const req = await request.json();
    const section = req.obj.details.section;
    const elementry = req.obj.details.elementry;
    const term = req.obj.details.term;
    const assesment = req.obj.details.assesment;
    const arr = req.obj.scores; //req.obj.details.firstname;
    // console.log(req);

    arr.sort((a, b) => {
        const nameA = a.Label.toLowerCase();
        const nameB = b.Label.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });
    // console.log(JSON.stringify(arr, null, 2));

    try{

        connectToDb();

        const res = await Results.findOne({regNo : req.obj.details.regNo});

        if (res){

            if(section === 'primary'){
                
                res.primary.section = section;
                if(elementry === 'activity1'){
                    
                    res.primary.studentClass.activity1.class = elementry;
                    if(term === 'Firstterm'){

                        res.primary.studentClass.activity1.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity1.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity1.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity1.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.activity1.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity1.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.activity1.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.activity1.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity1.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.activity1.Firstterm.secondTest;
                            const exam = result.primary.studentClass.activity1.Firstterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    }else if(term === 'Secondterm'){
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity1.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity1.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity1.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.activity1.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity1.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.activity1.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.activity1.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity1.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.activity1.Secondterm.secondTest;
                            const exam = result.primary.studentClass.activity1.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else if(term === 'Thirdterm'){
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity1.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity1.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity1.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.activity1.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity1.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.activity1.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.activity1.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity1.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.activity1.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.activity1.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }
                    }else {
                        console.log('No term..');
                    }
                
                //Activiity 2
                }else if(elementry === 'activity2'){

                    res.primary.studentClass.activity2.class = elementry;
                    if(term === 'Firstterm'){

                        res.primary.studentClass.activity2.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity2.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity2.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity2.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.activity2.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity2.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.activity2.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity2.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.activity2.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity2.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.activity2.Firstterm.secondTest;
                            const exam = result.primary.studentClass.activity2.Firstterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity2.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }

                    //Second Term Activity2
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity2.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity2.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity2.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.activity2.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity2.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.activity2.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity2.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.activity2.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity2.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.activity2.Secondterm.secondTest;
                            const exam = result.primary.studentClass.activity2.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity2.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third term Activity 2
                    }else if(term === 'Thirdterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity2.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity2.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity2.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.activity2.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity2.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.activity2.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity2.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.activity2.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity2.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.activity2.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.activity2.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity2.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                //Activity 3
                }else if(elementry === 'activity3'){
                    res.primary.studentClass.activity3.class = elementry;
                    
                    //First Term Activity 3
                    if(term === 'Firstterm'){

                        res.primary.studentClass.activity3.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity3.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity3.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity3.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.activity3.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity3.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.activity3.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity3.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.activity3.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.activity3.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.activity3.Firstterm.secondTest;
                                const exam = result.primary.studentClass.activity3.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity3.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Activity 3
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity3.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity3.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity3.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.activity3.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity3.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.activity3.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity3.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.activity3.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity3.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.activity3.Secondterm.secondTest;
                            const exam = result.primary.studentClass.activity3.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity3.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }


                    //Third Term Activity 3
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.activity3.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.activity3.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.activity3.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.activity3.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity3.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.activity3.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity3.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.activity3.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.activity3.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.activity3.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.activity3.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity3.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }

                //Nursery 1
                }else if(elementry === 'nursery1'){

                    res.primary.studentClass.nursery1.class = elementry;
                    
                    //First Term Nursery 1
                    if(term === 'Firstterm'){

                        res.primary.studentClass.nursery1.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery1.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery1.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery1.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.nursery1.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery1.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery1.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery1.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.nursery1.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.nursery1.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.nursery1.Firstterm.secondTest;
                                const exam = result.primary.studentClass.nursery1.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery1.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Nursery 1
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery1.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery1.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery1.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.nursery1.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery1.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery1.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery1.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.nursery1.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery1.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery1.Secondterm.secondTest;
                            const exam = result.primary.studentClass.nursery1.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery1.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }


                    //Third Term Nursery 1
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery1.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery1.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery1.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.nursery1.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery1.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery1.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery1.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.nursery1.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery1.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery1.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.nursery1.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery1.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                    
                }else if(elementry === 'nursery2'){

                    res.primary.studentClass.nursery1.class = elementry;
                    
                    //First Term Nursery 2
                    if(term === 'Firstterm'){

                        res.primary.studentClass.nursery2.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery2.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery2.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery2.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.nursery2.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery2.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery2.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery2.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.nursery2.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.nursery2.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.nursery2.Firstterm.secondTest;
                                const exam = result.primary.studentClass.nursery2.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery2.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Nursery 1
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery2.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery2.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery2.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.nursery2.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery2.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery2.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery2.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.nursery2.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery2.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery2.Secondterm.secondTest;
                            const exam = result.primary.studentClass.nursery2.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery2.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }


                    //Third Term Nursery 1
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery2.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery2.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery2.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.nursery2.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery2.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery2.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery2.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.nursery2.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery2.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery2.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.nursery2.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery2.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                  
                // Nersery 3
                }else if(elementry === 'nursery3'){

                    res.primary.studentClass.nursery3.class = elementry;
                    
                    //First Term Nursery 3
                    if(term === 'Firstterm'){

                        res.primary.studentClass.nursery3.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery3.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery3.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery3.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.nursery3.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery3.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery3.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery3.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.nursery3.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.nursery3.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.nursery3.Firstterm.secondTest;
                                const exam = result.primary.studentClass.nursery3.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery3.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Nursery 3
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery3.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery3.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery3.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.nursery3.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery3.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery3.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery3.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.nursery3.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery3.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery3.Secondterm.secondTest;
                            const exam = result.primary.studentClass.nursery3.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery3.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }


                    //Third Term Nursery 1
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.nursery3.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.nursery3.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.nursery3.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.nursery3.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery3.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery3.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery3.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.nursery3.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.nursery3.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.nursery3.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.nursery3.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.nursery3.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }

                //Basic 1    
                }else if(elementry === 'basic1'){

                    res.primary.studentClass.basic1.class = elementry;
                    
                    //First Term Basic 1
                    if(term === 'Firstterm'){

                        res.primary.studentClass.basic1.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic1.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic1.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic1.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.basic1.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic1.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.basic1.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic1.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.basic1.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.basic1.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.basic1.Firstterm.secondTest;
                                const exam = result.primary.studentClass.basic1.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic1.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Basic 1
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic1.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic1.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic1.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.basic1.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic1.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic1.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic1.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.basic1.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic1.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic1.Secondterm.secondTest;
                            const exam = result.primary.studentClass.basic1.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic1.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term Basic 1
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic1.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic1.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic1.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.basic1.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic1.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic1.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic1.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.basic1.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic1.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic1.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.basic1.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic1.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }

                //Basic 2  
                }else if(elementry === 'basic2'){
                    
                    res.primary.studentClass.basic1.class = elementry;
                    
                    //First Term Basic 2
                    if(term === 'Firstterm'){

                        res.primary.studentClass.basic2.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic2.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic2.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic2.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.basic2.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic2.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.basic2.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic2.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.basic2.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.basic2.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.basic2.Firstterm.secondTest;
                                const exam = result.primary.studentClass.basic2.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic2.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Basic 2
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic2.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic2.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic2.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.basic2.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic2.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic2.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic2.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.basic2.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic2.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic2.Secondterm.secondTest;
                            const exam = result.primary.studentClass.basic2.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic2.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term Basic 2
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic2.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic2.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic2.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.basic2.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic2.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic2.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic2.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.basic2.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic2.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic2.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.basic2.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic2.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                    
                //Basic 3
                }else if(elementry === 'basic3'){
                 
                    res.primary.studentClass.basic3.class = elementry;
                    
                    //First Term Basic 3
                    if(term === 'Firstterm'){

                        res.primary.studentClass.basic3.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic3.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic3.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic3.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.basic3.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic3.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.basic3.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic3.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.basic3.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.basic3.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.basic3.Firstterm.secondTest;
                                const exam = result.primary.studentClass.basic3.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic3.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Basic 3
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic3.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic3.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic3.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.basic3.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic3.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic3.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic3.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.basic3.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic3.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic3.Secondterm.secondTest;
                            const exam = result.primary.studentClass.basic3.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic3.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term Basic 3
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic3.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic3.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic3.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.basic3.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic3.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic3.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic3.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.basic3.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic3.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic3.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.basic3.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic3.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }

                //Basic 4
                }else if(elementry === 'basic4'){

                    res.primary.studentClass.basic4.class = elementry;
                    
                    //First Term Basic 4
                    if(term === 'Firstterm'){

                        res.primary.studentClass.basic4.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic4.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic4.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic4.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.basic4.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic4.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.basic4.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic4.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.basic4.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.basic4.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.basic4.Firstterm.secondTest;
                                const exam = result.primary.studentClass.basic4.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic4.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Basic 4
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic4.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic4.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic4.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.basic4.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic4.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic4.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic4.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.basic4.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic4.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic4.Secondterm.secondTest;
                            const exam = result.primary.studentClass.basic4.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic4.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term Basic 4
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic4.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic4.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic4.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.basic4.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic4.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic4.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic4.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.basic4.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic4.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic4.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.basic4.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic4.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                 
                //Basic 5
                }else if(elementry === 'basic5'){

                    res.primary.studentClass.basic5.class = elementry;
                    
                    //First Term Basic 5
                    if(term === 'Firstterm'){

                        res.primary.studentClass.basic5.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic5.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic5.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic5.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.primary.studentClass.basic5.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic5.Firstterm.firstTest;
                            const secondTest = result.primary.studentClass.basic5.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic5.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.primary.studentClass.basic5.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.primary.studentClass.basic5.Firstterm.firstTest;
                                const secondTest = result.primary.studentClass.basic5.Firstterm.secondTest;
                                const exam = result.primary.studentClass.basic5.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic5.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term Basic 5
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic5.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic5.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic5.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.primary.studentClass.basic5.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic5.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic5.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic5.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.primary.studentClass.basic5.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic5.Secondterm.firstTest;
                            const secondTest = result.primary.studentClass.basic5.Secondterm.secondTest;
                            const exam = result.primary.studentClass.basic5.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic5.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term Basic 5
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.primary.studentClass.basic5.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.primary.studentClass.basic5.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.primary.studentClass.basic5.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.primary.studentClass.basic5.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic5.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic5.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic5.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.primary.studentClass.basic5.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.primary.studentClass.basic5.Thirdterm.firstTest;
                            const secondTest = result.primary.studentClass.basic5.Thirdterm.secondTest;
                            const exam = result.primary.studentClass.basic5.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.basic5.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                    
                }

            //Secondary Section..
            }else if(section === 'secondary'){
                res.secondary.section = section;
                //JSS1
                if(elementry === 'JSS1'){

                    res.secondary.studentClass.JSS1.class = elementry;
                    
                    //First Term JSS1
                    if(term === 'Firstterm'){

                        res.secondary.studentClass.JSS1.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS1.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS1.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS1.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.secondary.studentClass.JSS1.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS1.Firstterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS1.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS1.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.secondary.studentClass.JSS1.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.secondary.studentClass.JSS1.Firstterm.firstTest;
                                const secondTest = result.secondary.studentClass.JSS1.Firstterm.secondTest;
                                const exam = result.secondary.studentClass.JSS1.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS1.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term JSS1
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS1.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS1.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS1.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.secondary.studentClass.JSS1.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS1.Secondterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS1.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS1.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.secondary.studentClass.JSS1.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS1.Secondterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS1.Secondterm.secondTest;
                            const exam = result.secondary.studentClass.JSS1.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS1.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term JSS1
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS1.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS1.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS1.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.secondary.studentClass.JSS1.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS1.Thirdterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS1.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS1.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.secondary.studentClass.JSS1.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS1.Thirdterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS1.Thirdterm.secondTest;
                            const exam = result.secondary.studentClass.JSS1.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS1.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                
                // JSS2
                }else if(elementry === 'JSS2'){

                    res.secondary.studentClass.JSS2.class = elementry;
                    
                    //First Term JSS2
                    if(term === 'Firstterm'){

                        res.secondary.studentClass.JSS2.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS2.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS2.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS2.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.secondary.studentClass.JSS2.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS2.Firstterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS2.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS2.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.secondary.studentClass.JSS2.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.secondary.studentClass.JSS2.Firstterm.firstTest;
                                const secondTest = result.secondary.studentClass.JSS2.Firstterm.secondTest;
                                const exam = result.secondary.studentClass.JSS2.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS2.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term JSS2
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS2.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS2.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS2.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.secondary.studentClass.JSS2.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS2.Secondterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS2.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS2.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.secondary.studentClass.JSS2.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS2.Secondterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS2.Secondterm.secondTest;
                            const exam = result.secondary.studentClass.JSS2.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS2.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term JSS2
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS2.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS2.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS2.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.secondary.studentClass.JSS2.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS2.Thirdterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS2.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS2.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.secondary.studentClass.JSS2.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS2.Thirdterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS2.Thirdterm.secondTest;
                            const exam = result.secondary.studentClass.JSS2.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS2.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }
                // JSS3
                }else if(elementry === 'JSS3'){

                    res.secondary.studentClass.JSS3.class = elementry;
                    
                    //First Term JSS3
                    if(term === 'Firstterm'){

                        res.secondary.studentClass.JSS3.Firstterm.term = term;
                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS3.Firstterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS3.Firstterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS3.Firstterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })
                        
                        }else if(assesment === 'secondTest'){
                           
                            res.secondary.studentClass.JSS3.Firstterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS3.Firstterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS3.Firstterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS3.Firstterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })
                       
                            }else if(assesment === 'exam'){

                                res.secondary.studentClass.JSS3.Firstterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                                const firstTest = result.secondary.studentClass.JSS3.Firstterm.firstTest;
                                const secondTest = result.secondary.studentClass.JSS3.Firstterm.secondTest;
                                const exam = result.secondary.studentClass.JSS3.Firstterm.exam;
                                var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);                                
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS3.Firstterm.overall = reformate_exam();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    //Second Term JSS3
                    }else if(term === 'Secondterm'){

                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS3.Secondterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS3.Secondterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS3.Secondterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })

                        }else if(assesment === 'secondTest'){

                             res.secondary.studentClass.JSS3.Secondterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS3.Secondterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS3.Secondterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS3.Secondterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){

                            res.secondary.studentClass.JSS3.Secondterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS3.Secondterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS3.Secondterm.secondTest;
                            const exam = result.secondary.studentClass.JSS3.Secondterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS3.Secondterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    //Third Term JSS3
                    }else if(term === 'Thirdterm'){
                        
                        if(assesment === 'firstTest'){

                            res.secondary.studentClass.JSS3.Thirdterm.firstTest = arr;
                            await res.save();
                            
                           var result = await Results.findOne({regNo : req.obj.details.regNo});
                            
                            const firstTest = result.secondary.studentClass.JSS3.Thirdterm.firstTest;
                        
                            var reformate_firstTest = function(){
                                return firstTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = test.Value;
                                   obj.secondTest = '';
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = '';
                                   obj.grade = '';
                                   obj.remark = '';
                                   return obj;
                                }); 
                            } 
                            
                            result.secondary.studentClass.JSS3.Thirdterm.overall = reformate_firstTest();
                            await result.save();
                            //   console.log(JSON.stringify(firstTest, null, 2));
                            return new Response('Success..', { status: 200 })


                        }else if(assesment === 'secondTest'){

                            res.secondary.studentClass.JSS3.Thirdterm.secondTest = arr;
                            await res.save();

                           var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS3.Thirdterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS3.Thirdterm.secondTest;
                            
                            var reformate_secondTest = function(){
                                return secondTest.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = test.Value;
                                   obj.exam = '';
                                   obj.totalScore = '';
                                   obj.average = ''; 
                                   obj.grade = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS3.Thirdterm.overall = reformate_secondTest();
                            await result.save();

                             return new Response('Success..', { status: 200 })

                        }else if(assesment === 'exam'){
                            res.secondary.studentClass.JSS3.Thirdterm.exam = arr;
                                await res.save();
                                
                                var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.JSS3.Thirdterm.firstTest;
                            const secondTest = result.secondary.studentClass.JSS3.Thirdterm.secondTest;
                            const exam = result.secondary.studentClass.JSS3.Thirdterm.exam;
                            var reformate_exam = function(){
                                return exam.map(function(test, index) {
                                   const obj = {};
                                   obj.subject = test.Label;
                                   obj.highestCore = 100
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   var getExam = parseInt(test.Value);
                                    
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/1);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.secondary.studentClass.JSS3.Thirdterm.overall = reformate_exam();
                            await result.save();
                            
                            return new Response('Success..', { status: 200 });

                        }else {
                            console.log('No assesment');
                        }

                    }else {
                        console.log('No term..');
                    }

                //SS1
                }else if(elementry === 'SS1'){
                res.secondary.studentClass.SS1.class = elementry;
                    
                //First Term SS1
                if(term === 'Firstterm'){

                    res.secondary.studentClass.SS1.Firstterm.term = term;
                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS1.Firstterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS1.Firstterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS1.Firstterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })
                    
                    }else if(assesment === 'secondTest'){
                       
                        res.secondary.studentClass.SS1.Firstterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS1.Firstterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS1.Firstterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS1.Firstterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })
                   
                        }else if(assesment === 'exam'){

                            res.secondary.studentClass.SS1.Firstterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.SS1.Firstterm.firstTest;
                            const secondTest = result.secondary.studentClass.SS1.Firstterm.secondTest;
                            const exam = result.secondary.studentClass.SS1.Firstterm.exam;
                            var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);                                
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS1.Firstterm.overall = reformate_exam();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else {
                        console.log('No assesment');
                    }
                //Second Term SS1
                }else if(term === 'Secondterm'){

                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS1.Secondterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS1.Secondterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS1.Secondterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })

                    }else if(assesment === 'secondTest'){

                         res.secondary.studentClass.SS1.Secondterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS1.Secondterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS1.Secondterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS1.Secondterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else if(assesment === 'exam'){

                        res.secondary.studentClass.SS1.Secondterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS1.Secondterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS1.Secondterm.secondTest;
                        const exam = result.secondary.studentClass.SS1.Secondterm.exam;
                        var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS1.Secondterm.overall = reformate_exam();
                        await result.save();
                        
                        return new Response('Success..', { status: 200 });

                    }else {
                        console.log('No assesment');
                    }

                //Third Term SS1
                }else if(term === 'Thirdterm'){
                    
                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS1.Thirdterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS1.Thirdterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS1.Thirdterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })


                    }else if(assesment === 'secondTest'){

                        res.secondary.studentClass.SS1.Thirdterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS1.Thirdterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS1.Thirdterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS1.Thirdterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else if(assesment === 'exam'){
                        res.secondary.studentClass.SS1.Thirdterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS1.Thirdterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS1.Thirdterm.secondTest;
                        const exam = result.secondary.studentClass.SS1.Thirdterm.exam;
                        var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS1.Thirdterm.overall = reformate_exam();
                        await result.save();
                        
                        return new Response('Success..', { status: 200 });

                    }else {
                        console.log('No assesment');
                    }

                }else {
                    console.log('No term..');
                }

                //SS2
                }else if(elementry === 'SS2'){
                
                    res.secondary.studentClass.SS2.class = elementry;
                    
                //First Term SS2
                if(term === 'Firstterm'){

                    res.secondary.studentClass.SS2.Firstterm.term = term;
                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS2.Firstterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS2.Firstterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS2.Firstterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })
                    
                    }else if(assesment === 'secondTest'){
                       
                        res.secondary.studentClass.SS2.Firstterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS2.Firstterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS2.Firstterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS2.Firstterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })
                   
                        }else if(assesment === 'exam'){

                            res.secondary.studentClass.SS2.Firstterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.SS2.Firstterm.firstTest;
                            const secondTest = result.secondary.studentClass.SS2.Firstterm.secondTest;
                            const exam = result.secondary.studentClass.SS2.Firstterm.exam;
                            var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);                                
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS2.Firstterm.overall = reformate_exam();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else {
                        console.log('No assesment');
                    }
                //Second Term SS1
                }else if(term === 'Secondterm'){

                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS2.Secondterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS2.Secondterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS2.Secondterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })

                    }else if(assesment === 'secondTest'){

                         res.secondary.studentClass.SS2.Secondterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS2.Secondterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS2.Secondterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS2.Secondterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else if(assesment === 'exam'){

                        res.secondary.studentClass.SS2.Secondterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS2.Secondterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS2.Secondterm.secondTest;
                        const exam = result.secondary.studentClass.SS2.Secondterm.exam;
                        var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS2.Secondterm.overall = reformate_exam();
                        await result.save();
                        
                        return new Response('Success..', { status: 200 });

                    }else {
                        console.log('No assesment');
                    }

                //Third Term SS1
                }else if(term === 'Thirdterm'){
                    
                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS2.Thirdterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS2.Thirdterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS2.Thirdterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })


                    }else if(assesment === 'secondTest'){

                        res.secondary.studentClass.SS2.Thirdterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS2.Thirdterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS2.Thirdterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS2.Thirdterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else if(assesment === 'exam'){
                        res.secondary.studentClass.SS2.Thirdterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS2.Thirdterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS2.Thirdterm.secondTest;
                        const exam = result.secondary.studentClass.SS2.Thirdterm.exam;
                        var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS2.Thirdterm.overall = reformate_exam();
                        await result.save();
                        
                        return new Response('Success..', { status: 200 });

                    }else {
                        console.log('No assesment');
                    }

                }else {
                    console.log('No term..');
                }

                    //SS3
                }else if(elementry === 'SS3'){

                    res.secondary.studentClass.SS3.class = elementry;
                    
                //First Term SS3
                if(term === 'Firstterm'){

                    res.secondary.studentClass.SS1.Firstterm.term = term;
                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS3.Firstterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS3.Firstterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS3.Firstterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })
                    
                    }else if(assesment === 'secondTest'){
                       
                        res.secondary.studentClass.SS3.Firstterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS3.Firstterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS3.Firstterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS3.Firstterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })
                   
                        }else if(assesment === 'exam'){

                            res.secondary.studentClass.SS3.Firstterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                            const firstTest = result.secondary.studentClass.SS3.Firstterm.firstTest;
                            const secondTest = result.secondary.studentClass.SS3.Firstterm.secondTest;
                            const exam = result.secondary.studentClass.SS3.Firstterm.exam;
                            var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);                                
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS3.Firstterm.overall = reformate_exam();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else {
                        console.log('No assesment');
                    }
                //Second Term SS3
                }else if(term === 'Secondterm'){

                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS3.Secondterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS3.Secondterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS3.Secondterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })

                    }else if(assesment === 'secondTest'){

                         res.secondary.studentClass.SS3.Secondterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS3.Secondterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS3.Secondterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS3.Secondterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else if(assesment === 'exam'){

                        res.secondary.studentClass.SS3.Secondterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS3.Secondterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS3.Secondterm.secondTest;
                        const exam = result.secondary.studentClass.SS3.Secondterm.exam;
                        var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS3.Secondterm.overall = reformate_exam();
                        await result.save();
                        
                        return new Response('Success..', { status: 200 });

                    }else {
                        console.log('No assesment');
                    }

                //Third Term SS3
                }else if(term === 'Thirdterm'){
                    
                    if(assesment === 'firstTest'){

                        res.secondary.studentClass.SS3.Thirdterm.firstTest = arr;
                        await res.save();
                        
                       var result = await Results.findOne({regNo : req.obj.details.regNo});
                        
                        const firstTest = result.secondary.studentClass.SS3.Thirdterm.firstTest;
                    
                        var reformate_firstTest = function(){
                            return firstTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = test.Value;
                               obj.secondTest = '';
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = '';
                               obj.grade = '';
                               obj.remark = '';
                               return obj;
                            }); 
                        } 
                        
                        result.secondary.studentClass.SS3.Thirdterm.overall = reformate_firstTest();
                        await result.save();
                        //   console.log(JSON.stringify(firstTest, null, 2));
                        return new Response('Success..', { status: 200 })


                    }else if(assesment === 'secondTest'){

                        res.secondary.studentClass.SS3.Thirdterm.secondTest = arr;
                        await res.save();

                       var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS3.Thirdterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS3.Thirdterm.secondTest;
                        
                        var reformate_secondTest = function(){
                            return secondTest.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = test.Value;
                               obj.exam = '';
                               obj.totalScore = '';
                               obj.average = ''; 
                               obj.grade = '';
                               obj.remark = ''
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS3.Thirdterm.overall = reformate_secondTest();
                        await result.save();

                         return new Response('Success..', { status: 200 })

                    }else if(assesment === 'exam'){
                        res.secondary.studentClass.SS3.Thirdterm.exam = arr;
                            await res.save();
                            
                            var result = await Results.findOne({regNo : req.obj.details.regNo});

                        const firstTest = result.secondary.studentClass.SS3.Thirdterm.firstTest;
                        const secondTest = result.secondary.studentClass.SS3.Thirdterm.secondTest;
                        const exam = result.secondary.studentClass.SS3.Thirdterm.exam;
                        var reformate_exam = function(){
                            return exam.map(function(test, index) {
                               const obj = {};
                               obj.subject = test.Label;
                               obj.highestCore = 100
                               obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               obj.exam = test.Value;
                              
                               var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                               var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                               var getFirstTest = parseInt(firstAssessment);
                               var getSecondTest = parseInt(secondAssessment);
                               var getExam = parseInt(test.Value);
                                
                               obj.totalScore = getFirstTest + getSecondTest + getExam;
                               var setAverage = Math.floor(obj.totalScore/1);
                               obj.average = setAverage; 
                               var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 50 ? 'E' : obj.average > 49 && obj.average < 56 ? 'D' : obj.average > 55 && obj.average < 61 ? 'C' : obj.average > 60 && obj.average < 66 ? 'C+' : obj.average > 65 && obj.average < 76 ? 'C++' : obj.average > 75 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                               obj.grade = setGrade;
                               var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 50 ? 'Below Average' : obj.average > 49 && obj.average < 56 ? 'Fair' : obj.average > 55 && obj.average < 60 ? 'Average' : obj.average > 59 && obj.average < 70 ? 'Above Average' : obj.average > 69 && obj.average < 76 ? 'Good' : obj.average > 75 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                               obj.remark = setRemark;
                               return obj;
                            });
                        }
                        result.secondary.studentClass.SS3.Thirdterm.overall = reformate_exam();
                        await result.save();
                        
                        return new Response('Success..', { status: 200 });

                    }else {
                        console.log('No assesment');
                    }

                }else {
                    console.log('No term..');
                }

                }else {
                    console.log('No Elementry..');
                }
                
            }else{
                console.log('No match..');
            }

        }

        return new Response('Failed, Could not find a matching Registration Number..', { status: 500 })
        
    }catch(err){
        console.log(err);
        return new Response("Failed to Upload Result", { status: 500 });
    }
}

//https://stackoverflow.com/questions/73913797/how-to-update-a-document-with-dynamic-variable-and-nested-objects-in-mongodb