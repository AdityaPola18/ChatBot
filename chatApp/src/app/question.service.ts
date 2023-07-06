import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  symptomName: any

  constructor(private http: HttpClient) { }
  questionsArray = [
    {question: "From how long are you suffering?",
     options: [{text:"1 day",isSelected: false,isDisable: false},{text:"1 week",isSelected: false,isDisable: false},{text:"1 month",isSelected: false,isDisable: false}],
     isSingleselect: true,
     answer: ""
    },
    {question: "How severe is it?",
     options: [{text:"Mild",isSelected:false,isDisable: false},{text:"Moderate",isSelected:false,isDisable: false},{text:"High",isSelected:false,isDisable: false}],
     isSingleselect: false,
     answer: ""
    },
    {question: "Do you have any other symptom?",
     options: [{text:"Mild",isSelected:false,isDisable: false},{text:"Moderate",isSelected:false,isDisable: false},{text:"High",isSelected:false,isDisable: false}],
     isSingleselect: false,
     answer: ""
    },
    {question: "From how long are you suffering?",
     options: [{text:"1 day",isSelected: false,isDisable: false},{text:"1 week",isSelected: false,isDisable: false},{text:"1 month",isSelected: false,isDisable: false}],
     isSingleselect: true,
     answer: ""
    },
    {question: "From how long are you suffering?",
     options: [{text:"1 day",isSelected: false,isDisable: false},{text:"1 week",isSelected: false,isDisable: false},{text:"1 month",isSelected: false,isDisable: false}],
     isSingleselect: true,
     answer: ""
    },
  ];
  getQuestion(currentId: number){
    if(currentId === this.questionsArray.length){
      return null
    }
    else{
      this.questionsArray[currentId].answer="";
      for(let each of this.questionsArray[currentId].options){
        each.isDisable=false      
      }
      if(this.questionsArray[currentId].isSingleselect===false){
        for(let each of this.questionsArray[currentId].options){
          each.isSelected =false;
        }
      }
      return this.questionsArray[currentId];

    }
  }
  setSymptom(symptom:any){
    this.symptomName=symptom
  }

  postSymptom(){
    const symptomObj = {symptoms: this.symptomName}
    
    this.http.post("http://192.168.99.83:5000/medical-diagnosis",symptomObj).subscribe((res: any)=>{
      console.log("post successfull")
      return(res)
    },(err:any)=>{
      return(err)
    });
  }
  
  postQuestion(obj: any){
    this.http.post("http://192.168.99.83:5000/",obj).subscribe((res: any)=>{
      return(res)
    },(err:any)=>{
      return(err)
    });
  }

  postDetails(details:any){
    this.http.post("http://192.168.99.83:5000/analyze",details).subscribe((res: any)=>{
      console.log(res)
    },(err:any)=>{
      console.log(err)
    });
  }
}
