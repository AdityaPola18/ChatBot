import { Component } from '@angular/core';

import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  symptoms: any
  inputValue: any
  searchResults: any
  searchInput: any
  constructor(private route: Router) {
    this.symptoms = ["abdominal pain","abnormal menstruation","acidity","acute liver failure","altered sensorium","anxiety","back pain","belly pain","blackheads","bladder discomfort","blister","blood in sputum","bloody stool","blurred and distorted vision","breathlessness","brittle nails","bruising","burning micturition"];
    this.searchResults= []
  }
  ngOnInit() {


    this.inputValue="";
    localStorage.clear();
  }
  onSearch() {
    if(this.inputValue===""){
      this.searchResults=[]
    }
    else{
      this.searchInput = this.inputValue.toLowerCase()
      this.searchResults=[]
      for (let each of this.symptoms){
        if(each.includes(this.searchInput) && !(this.searchResults.includes(each))){
          this.searchResults.push(each)
        }
      }
    }
    console.log(this.searchResults)
  }
  onSelect(each: any){
    this.inputValue=each;
    this.searchInput="";
    this.searchResults=[];
  }
  onSubmit() {
    if(this.inputValue.length !== 0){
      localStorage.setItem("symptom",this.inputValue);
      console.log(this.inputValue)
      this.route.navigate(['/chatPage']);
    }
  }
}
