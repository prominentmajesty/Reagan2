import { connectToDb } from "@/lib/utils";
import { Results } from "@/lib/results";

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

                                   let firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   const getFirstTest = parseInt(firstAssessment);
                                   const getSecondTest = parseInt(test.Value);
                                   //obj.exam = exam[index].Value;
                                   obj.exam = '';
                                   obj.totalScore = getFirstTest + getSecondTest;
                                   const setAverage = Math.floor(obj.totalScore/2);
                                   obj.average = setAverage; 
                                   obj.grade = '';
                                   const setRemark = '';
                                   obj.remark = ''
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Firstterm.overall = reformate_secondTest();
                            await result.save();

                            //var remark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 46 ? 'Below Average' : obj.average > 45 && obj.average < 50 ? 'Fair' : obj.average > 49 && obj.average < 56 ? 'Average' : obj.average > 55 && obj.average < 61 ? 'Above Average' : obj.average > 61 && obj.average < 71 ? 'Good' : obj.average > 70 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                            //var grade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 46 ? 'E' : obj.average > 45 && obj.average < 50 ? 'D' : obj.average > 49 && obj.average < 56 ? 'C' : obj.average > 55 && obj.average < 61 ? 'C+' : obj.average > 60 && obj.average < 71 ? 'C++' : obj.average > 70 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                            
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
                                   obj.firstTest = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   obj.secondTest = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   obj.exam = test.Value;
                                  
                                   var firstAssessment = firstTest.length === 0 ? 0 : firstTest[index].Value;
                                   var secondAssessment = secondTest.length === 0 ? 0 : secondTest[index].Value;
                                   var getFirstTest = parseInt(firstAssessment);
                                   var getSecondTest = parseInt(secondAssessment);
                                   const getExam = parseInt(test.value);
                                   
            
                                   obj.totalScore = getFirstTest + getSecondTest + getExam;
                                   var setAverage = Math.floor(obj.totalScore/3);
                                   obj.average = setAverage; 
                                   var setGrade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 46 ? 'E' : obj.average > 45 && obj.average < 50 ? 'D' : obj.average > 49 && obj.average < 56 ? 'C' : obj.average > 55 && obj.average < 61 ? 'C+' : obj.average > 60 && obj.average < 71 ? 'C++' : obj.average > 70 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                                   obj.grade = setGrade;
                                   var setRemark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 46 ? 'Below Average' : obj.average > 45 && obj.average < 50 ? 'Fair' : obj.average > 49 && obj.average < 56 ? 'Average' : obj.average > 55 && obj.average < 61 ? 'Above Average' : obj.average > 61 && obj.average < 71 ? 'Good' : obj.average > 70 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                                   obj.remark = setRemark;
                                   return obj;
                                });
                            }
                            result.primary.studentClass.activity1.Firstterm.overall = reformate_exam();
                            await result.save();

                            //var remark = obj.average < 40 ? ' Failed ' : obj.average > 39 && obj.average < 46 ? 'Below Average' : obj.average > 45 && obj.average < 50 ? 'Fair' : obj.average > 49 && obj.average < 56 ? 'Average' : obj.average > 55 && obj.average < 61 ? 'Above Average' : obj.average > 61 && obj.average < 71 ? 'Good' : obj.average > 70 && obj.average < 81 ? 'Good Enough' : obj.average > 80 && obj.average < 91 ? 'Very Good' : obj.average > 90 && obj.average < 96 ? 'Excelent' : obj.average > 95 && obj.average < 101 ? 'Distinction' : 'Score more than hundred is not supported';
                            //var grade = obj.average < 40 ? 'F' : obj.average > 39 && obj.average < 46 ? 'E' : obj.average > 45 && obj.average < 50 ? 'D' : obj.average > 49 && obj.average < 56 ? 'C' : obj.average > 55 && obj.average < 61 ? 'C+' : obj.average > 60 && obj.average < 71 ? 'C++' : obj.average > 70 && obj.average < 81 ? 'B' : obj.average > 80 && obj.average < 91 ? 'B+' : obj.average > 90 && obj.average < 96 ? 'A': obj.average > 95 && obj.average < 101 ? 'A+' : 'Score more than hundred is not supported';
                            
                             return new Response('Success..', { status: 200 })

                        }else {
                            console.log('No assesment');
                        }
                    }else if(term === 'Secondterm'){
                        if(assesment === 'firstTest'){

                        }else if(assesment === 'secondTest'){

                        }else if(assesment === 'exam'){

                        }else {
                            console.log('No assesment');
                        }

                    }else if(term === 'Thirdterm'){
                        if(assesment === 'firstTest'){

                        }else if(assesment === 'secondTest'){

                        }else if(assesment === 'exam'){

                        }else {
                            console.log('No assesment');
                        }
                    }else {
                        console.log('No term..');
                    }
                }else if(elementry === 'activity2'){

                }else if(elementry === 'activity3'){

                }else if(elementry === 'nursery1'){
                    
                }else if(elementry === 'nursery2'){
                    
                }else if(elementry === 'nursery3'){
                    
                }else if(elementry === 'basic1'){
                    
                }else if(elementry === 'basic2'){
                    
                }else if(elementry === 'basic3'){
                    
                }else if(elementry === 'basic4'){
                    
                }else if(elementry === 'basic5'){
                    
                }
            }else if(section === 'secondary'){
                
                
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