import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { QuestionService } from '../question.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {

  userdetails:any=FormGroup
  constructor(private fb:FormBuilder, public questionService: QuestionService){

  }

  ngOnInit(){
    this.userdetails=this.fb.group({
      name:[null,[Validators.required,Validators.minLength(2)]],
      age:['',Validators.required],
      gender:['',Validators.required],
      smoking:['',Validators.required],
      drinking:['',Validators.required],
    })
  }

 



  genderChange(gen:any){
    // this.userdetails.gender=value 
    this.userdetails.get('gender')?.setValue(gen);
  }

  smoke(smokevalue:any){
    this.userdetails.get('smoking')?.setValue(smokevalue);
  }

  drink(drinkvalue:any){
    this.userdetails.get('drinking')?.setValue(drinkvalue);
  }

  detalis(){
    this.questionService.setDetails(this.userdetails.value);
    // this.questionService.postDetails();
    // console.log(this.userdetails.value)
  }
}
