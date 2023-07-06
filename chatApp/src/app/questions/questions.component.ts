import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit{
  currentQuestions:any = [];
  currentId: number = 0
  btnValue: any
  symptomName: any
  questionsArr!: any
  currentSelectedAnswers: string[] =[]
  multiAnswers : string[] = [];
  
  constructor(public questionService: QuestionService, private router: Router){}

  ngOnInit(){

    const ques = this.questionService.postSymptom();
    console.log(ques);
    this.symptomName = localStorage.getItem("symptom");
    if(this.symptomName===null){
      this.router.navigate(["/symptoms"]);
    }
    this.questionsArr = localStorage.getItem("questionsArr");
    if(this.questionsArr===null){
      this.currentQuestions=[]
      this.currentQuestions.push(this.questionService.getQuestion(this.currentId));
      this.currentId+=1;
    }
    else{
      this.currentQuestions = JSON.parse(this.questionsArr);
      this.currentId=this.currentQuestions.length
      const nextQuestion = this.questionService.getQuestion(this.currentId)
      const prevQues = this.currentQuestions[this.currentId-1]
      // console.log("prev: ",prevQues);
      if(nextQuestion!==null && prevQues.options[0].isDisable===true){
        this.currentQuestions.push(nextQuestion);
        this.currentId+=1
      }
    } 
  }
  onClick(text: any){
    this.btnValue = text;
    this.currentQuestions[this.currentId-1].answer = text;
    // const ques = this.currentQuestions[this.currentId-1]
    // const postObj = {question: ques,answer:text};
    // this.questionService.postQuestion(postObj)
    for(let each of this.currentQuestions[this.currentId-1].options){
      each.isDisable = true;
    }
    const stringifiedQues = JSON.stringify(this.currentQuestions);
    localStorage.setItem("questionsArr",stringifiedQues);
    const res = this.questionService.getQuestion(this.currentId)
    if(res!==null){
      this.currentQuestions.push(res);
      const stringifiedQues = JSON.stringify(this.currentQuestions);
      localStorage.setItem("questionsArr",stringifiedQues);
    }
    this.currentId+=1
  }
  onBack(){
    this.currentQuestions = []
    this.currentSelectedAnswers = []
    this.multiAnswers = []
    localStorage.clear();
    this.router.navigate(["/symptoms"]);
  }
  onSelect(each: any){
    each.isSelected = !each.isSelected
    const text = each.text
    if(!this.currentSelectedAnswers.includes(text)){
      this.currentSelectedAnswers.push(text);
    }
    else{
      let i=0
      for (i=0; i < this.currentSelectedAnswers.length; ++i) {
        if (this.currentSelectedAnswers[i] === text) {
          this.currentSelectedAnswers.splice(i, 1);
        }
      }
    }
  }
  onSubmitAns(){
    this.multiAnswers = this.currentSelectedAnswers
    this.currentQuestions[this.currentId-1].answer = this.multiAnswers;

    for(let each of this.currentQuestions[this.currentId-1].options){
      each.isDisable = true;
    }
    const stringifiedQues = JSON.stringify(this.currentQuestions);
    localStorage.setItem("questionsArr",stringifiedQues);
    const res = this.questionService.getQuestion(this.currentId)
    if(res!==null){
      this.currentQuestions.push(res);
      const stringifiedQues = JSON.stringify(this.currentQuestions);
      localStorage.setItem("questionsArr",stringifiedQues);
    }
    this.currentId+=1
    this.currentSelectedAnswers=[]
  }
}