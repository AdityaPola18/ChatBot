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
      drinking:['',Validators.required]
    })
  }

 

  // username:any=this.userdetails.get('name')
  // userage:any=this.userdetails.get('age')
  // usergender:any=this.userdetails.get('gender')
  // usersmoking:any=this.userdetails.get('smoking')
  // userdrinking:any=this.userdetails.get('drinking')




  // userdetails={
  //   name: "",
  //   age:"",
  //   gender:"",
  //   smoking:"",
  //   drinking:""

  // }

//    userage:any
//    username:any

//   ageEl(){
//     // console.log(this.userage)
//     this.userdetails.age=this.userage;
//   }
  
//   nameEl(){
//     this.userdetails.name=this.username
//   }

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
    this.questionService.postDetails(this.userdetails.value);
    console.log(this.userdetails.value)
  }
}
