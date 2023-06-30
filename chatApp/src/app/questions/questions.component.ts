import { Component } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  constructor(public questionService: QuestionService){}
  currentQuestions:any = [];
  currentId: number = 0
  btnValue: any
  ngOnInit(){
    this.currentQuestions = []
    this.currentQuestions.push(this.questionService.getQuestion(this.currentId));
    this.currentId+=1;
  }
  onClick(each: any){
    this.btnValue = each;
    this.currentQuestions[this.currentId-1].answer = each;
    const res = this.questionService.getQuestion(this.currentId)
    if(res!==null){
      this.currentQuestions.push(res);
    }
    for(let each of this.currentQuestions[this.currentId-1].options){
      each.isDisable = true;
    }
    this.currentId+=1
  }
}
