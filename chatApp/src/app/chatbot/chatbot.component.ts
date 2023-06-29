import { Component } from '@angular/core';
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
  constructor(private route: Router) {
    this.symptoms = ["fever", "cough", "cold", "sore throat", "headache", "body pains",];
    this.searchResults= []
  }
  onSearch() {
    if(this.inputValue===""){
      this.searchResults=[]
    }
    else{
      this.searchResults=[]
      for (let each of this.symptoms){
        if(each.includes(this.inputValue) && !(this.searchResults.includes(each))){
          this.searchResults.push(each)
        }
      }
    }
    console.log(this.searchResults)
  }
  onSelect(each: any){
    this.inputValue=each;
    this.searchResults=[];
  }
  onSubmit() {
    if(this.inputValue.length !== 0){
      this.route.navigate(["/chatPage"]);
    }
  }
}
