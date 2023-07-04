import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }
  questionsArray = [
    {question: "From how long are you suffering?",
     options: [{text:"1 day",isDisable: false},{text:"1 week",isDisable: false},{text:"1 month",isDisable: false}],
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
     options: [{text:"1 day",isDisable: false},{text:"1 week",isDisable: false},{text:"1 month",isDisable: false}],
     isSingleselect: true,
     answer: ""
    },
    {question: "From how long are you suffering?",
     options: [{text:"1 day",isDisable: false},{text:"1 week",isDisable: false},{text:"1 month",isDisable: false}],
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
      return this.questionsArray[currentId];

    }
  }
  
}
