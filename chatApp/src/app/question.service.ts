import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }
  questionsArray = [
    {question: "From how long are you suffering?",
     options: [{text:"1 day",isDisable: false},{text:"1 week",isDisable: false},{text:"1 month",isDisable: false}],
     optionstype: "singleSelect",
     answer: ""
    },
    {question: "How severe is it?",
     options: [{text:"Mild",isDisable: false},{text:"Moderate",isDisable: false},{text:"High",isDisable: false}],
     optionstype: "singleSelect",
     answer: ""
    },
    {question: "Do you have any other symptom?",
     options: [{text:"Yes",isDisable: false},{text:"No",isDisable: false}],
     optionstype: "singleSelect",
     answer: ""
    }
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
      return this.questionsArray[currentId];

    }
  }
  
}
