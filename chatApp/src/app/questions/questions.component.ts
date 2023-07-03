import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit{

  constructor(public questionService: QuestionService, private router: Router){}
  currentQuestions:any = [];
  currentId: number = 0
  btnValue: any
  symptomName: any
  questionsArr!: any
  ngOnInit(){



    this.symptomName = localStorage.getItem("symptom");
    if(this.symptomName===null){
      this.router.navigate([""]);
    }
    this.questionsArr = localStorage.getItem("questionsArr");
    if(this.questionsArr===null){
      this.currentQuestions=[]
      this.currentQuestions.push(this.questionService.getQuestion(this.currentId));
      this.currentId+=1;
    }
    else{
      this.currentQuestions = JSON.parse(this.questionsArr);
      console.log("ques: ",this.currentQuestions)
      this.currentId=this.currentQuestions.length
    } 
  }
  onClick(text: any){
    console.log(this.currentId);
    this.btnValue = text;
    this.currentQuestions[this.currentId-1].answer = text;
    for(let each of this.currentQuestions[this.currentId-1].options){
      each.isDisable = true;
    }
    const stringifiedQues = JSON.stringify(this.currentQuestions);
    localStorage.setItem("questionsArr",stringifiedQues);
    const res = this.questionService.getQuestion(this.currentId)
    if(res!==null){
      this.currentQuestions.push(res);
    }
    this.currentId+=1
  }
  onBack(){
    this.currentQuestions = []
    localStorage.clear();
    this.router.navigate([""]);
  }
}
