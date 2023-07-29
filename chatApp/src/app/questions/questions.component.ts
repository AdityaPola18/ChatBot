import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

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
  // currentSelectedAnswers: string[] =[]
  // multiAnswers : string[] = [];
  isLastQuestion: any
  
  constructor(public questionService: QuestionService, private router: Router,){}

  async fetchQuestion(){
      await this.questionService.postSymptom().then((res: any)=>{
        console.log("ts: ",res)
        this.currentQuestions.push(res);
        console.log("ques arr: ",this.currentQuestions)
        this.currentId+=1
      })
  }

  async ngOnInit(){

    this.symptomName = this.questionService.sendSymptom();

    if(this.symptomName!==undefined){
      // fetching the 1st question
      this.fetchQuestion();
    }
    else{
      this.router.navigate([""]);
    }
  }
  onClick(text: any){
    //saving the answer, posting it to database and retreiving next Question
    this.btnValue = text;
    this.currentQuestions[this.currentId-1].answer = text;
    console.log("next ques id: ",this.currentId);
    for(let each of this.currentQuestions[this.currentId-1].optionsArr){
      each.isDisable = true;
    }
    const nextQues = this.questionService.postAnswer(this.currentQuestions[this.currentId-1],this.currentId-1)
    
    // displaying get report buttton if all questions are done.
    if(nextQues===null){
      this.isLastQuestion = true
    }
    else{
      this.isLastQuestion = false
      console.log("next2: ",nextQues);
      this.currentQuestions.push(nextQues)
      this.currentId+=1
    }
  }

  onBack(){
    // navigating to home
    this.currentQuestions = []
    this.router.navigate([""]);
  }

  async getReport(){
    this.router.navigate(['/report'])
  }




  // Below code is used in case of multi select options
  // onSelect(each: any){
  //   each.isSelected = !each.isSelected
  //   const text = each.text
  //   if(!this.currentSelectedAnswers.includes(text)){
  //     this.currentSelectedAnswers.push(text);
  //   }
  //   else{
  //     let i=0
  //     for (i=0; i < this.currentSelectedAnswers.length; ++i) {
  //       if (this.currentSelectedAnswers[i] === text) {
  //         this.currentSelectedAnswers.splice(i, 1);
  //       }
  //     }
  //   }
  // }
  // onSubmitAns(){
  //   this.multiAnswers = this.currentSelectedAnswers
  //   this.currentQuestions[this.currentId-1].answer = this.multiAnswers;

  //   for(let each of this.currentQuestions[this.currentId-1].options){
  //     each.isDisable = true;
  //   }
  //   const stringifiedQues = JSON.stringify(this.currentQuestions);
  //   localStorage.setItem("questionsArr",stringifiedQues);
  //   // const res = this.questionService.getQuestion(this.currentId)
  //   // if(res!==null){
  //   //   this.currentQuestions.push(res);
  //   //   const stringifiedQues = JSON.stringify(this.currentQuestions);
  //   //   localStorage.setItem("questionsArr",stringifiedQues);
  //   // }
  //   this.currentId+=1
  //   this.currentSelectedAnswers=[]
  // }
}