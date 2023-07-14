import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  symptomName: any
  userDetails: any
  quesArr: any

  constructor(private http: HttpClient) { this.quesArr=[]}

  optionsArr = {
    q0: [{text:"Yes",isDisable: false},{text:"No",isDisable: false}],
    q1: [{text:"Mild",isDisable: false},{text:"Moderate",isDisable: false},{text:"High",isDisable: false}],
    q2: [{text:"1 day",isDisable: false},{text:"1 week",isDisable: false},{text:"1 month",isDisable: false}]
  }

  // questionsArray = [
  //   {question: "From how long are you suffering?",
  //    options: [{text:"1 day",isSelected: false,isDisable: false},{text:"1 week",isSelected: false,isDisable: false},{text:"1 month",isSelected: false,isDisable: false}],
  //    isSingleselect: true,
  //    answer: ""
  //   },
  //   {question: "How severe is it?",
  //    options: [{text:"Mild",isSelected:false,isDisable: false},{text:"Moderate",isSelected:false,isDisable: false},{text:"High",isSelected:false,isDisable: false}],
  //    isSingleselect: false,
  //    answer: ""
  //   },
  //   {question: "Do you have any other symptom?",
  //    options: [{text:"Mild",isSelected:false,isDisable: false},{text:"Moderate",isSelected:false,isDisable: false},{text:"High",isSelected:false,isDisable: false}],
  //    isSingleselect: false,
  //    answer: ""
  //   },
  //   {question: "From how long are you suffering?",
  //    options: [{text:"1 day",isSelected: false,isDisable: false},{text:"1 week",isSelected: false,isDisable: false},{text:"1 month",isSelected: false,isDisable: false}],
  //    isSingleselect: true,
  //    answer: ""
  //   },
  //   {question: "From how long are you suffering?",
  //    options: [{text:"1 day",isSelected: false,isDisable: false},{text:"1 week",isSelected: false,isDisable: false},{text:"1 month",isSelected: false,isDisable: false}],
  //    isSingleselect: true,
  //    answer: ""
  //   },
  // ];
  // getQuestion(currentId: number){
  //   if(currentId === this.questionsArray.length){
  //     return null
  //   }
  //   else{
  //     this.questionsArray[currentId].answer="";
  //     for(let each of this.questionsArray[currentId].options){
  //       each.isDisable=false      
  //     }
  //     if(this.questionsArray[currentId].isSingleselect===false){
  //       for(let each of this.questionsArray[currentId].options){
  //         each.isSelected =false;
  //       }
  //     }
  //     return this.questionsArray[currentId];

  //   }
  // }
  setSymptom(symptom:any){
    this.symptomName=symptom
    this.userDetails = {...this.userDetails,symptom: this.symptomName};
    console.log(this.userDetails)
  }
  createQuestion(res:any){

    // if(res.response.question==="Diagnosis Complete"){
    //   return null
    // }
    const optionsType = res.response.option
    console.log("type: ",optionsType)
    let options = []
    if(optionsType=="q0"){
      options = this.optionsArr.q0
    }
    else if(optionsType=="q1"){
      options = this.optionsArr.q1
    }
    else{
      options = this.optionsArr.q2
    }
    let ques = ""
    const quesKey = "question"+String(this.quesArr.length+1)
    console.log("ques key: ",quesKey)
    for(let each of res.response[quesKey]){
      if(each === "_"){
        ques+=" "
      }
      else{
        ques+=each
      }
    }
    // for(let each of res.response.question){
    //   if(each === "_"){
    //     ques+=" "
    //   }
    //   else{
    //     ques+=each
    //   }
    // }
    
    // const onlyQues = {[res.response[2]]: ques, answer: ""}
    const onlyQues:any = {}
    onlyQues[quesKey] = ques
    onlyQues.answer = ""
    onlyQues.data_id = res.response.data_id
    console.log("onlyQues: ",onlyQues)
    this.quesArr.push(onlyQues)
    const qObj = {question: ques, optionsArr: options, answer: "",data_id: res.response.data_id}
    // this.quesArr.push(qObj)
    // const qObj = {question: "example ques?", optionsArr: ["Yes","No"], answer: ""}
    return qObj

  }
  async postSymptom(): Promise<any> {
    const symptomObj = {symptom: this.symptomName};
    try {
      const res = await this.http.post("http://192.168.97.194:5000/analyze",symptomObj).toPromise();
      console.log("symp ser res: ",res);
      const ques = (this.createQuestion(res))
      console.log((ques))
      return (ques);
    } catch (error: any) {
      throw new Error('Error fetching data: ' + error.message);
    }
  }
  async postAnswer(answer:any,id:any): Promise<any> {
    try {
      console.log("ans: ", answer);
      console.log("test1: ",id)
      this.quesArr[id].answer = answer.answer
      // const key = Object.keys(this.quesArr)[id]
      const key = "question"+String(id+1)
      const QandA = this.quesArr[id][key]+":"+answer.answer
      console.log("test2: ",QandA)
      // let key =""
      // if(id==0){
      //   key = "question"
      // }
      // else{
      //   key = "question"+String(id+1)
      //   console.log("posting key: ",key)
      // }
      console.log("posting key: ",key)
      const questions:any = {}
      // const questions:any = {data_id: this.quesArr[id].data_id, question: QandA, user_input:answer.answer}
      questions[key] = QandA
      questions.data_id = this.quesArr[id].data_id
      console.log("posted ans: ",questions)
      const res = await this.http.post("http://192.168.97.194:5000/api",questions).toPromise();
      // const res = await this.http.get("http://192.168.97.194:5000/api").toPromise();
      console.log("ser res: ",res);
      const ques = (this.createQuestion(res))
      console.log("next: ",ques)
      return (ques);
    } catch (error: any) {
      throw new Error('Error fetching data: ' + error.message);
    }
  }
  async postDetails(){
    const userData = {...this.userDetails,symptom:this.symptomName}
    console.log("details",userData);
    // http://192.168.97.194:5000/analyze
    this.http.post("http://192.168.97.194:5000/analyze", userData).subscribe((res: any) => {
      console.log(res)
      return ("res");
    }, (err: any) => {
      return (err);
    });
  }
  
  // async getFirstQuestion(){
  //   return this.http.get("http://192.168.97.194:5000/api").subscribe((res: any) => {
  //     console.log(res);
  //   }, (err: any) => {
  //     console.log(err);
  //   });
  // }

  // async postQuestion(obj: any){
  //   try{
  //     const response = await this.http.post("http://192.168.99.83:5000/",obj).toPromise()
  //     const nextQues = this.createQuestion(response);
  //     return nextQues
  //   }
  //   catch(error: any){
  //     throw new Error("Error message: "+error.message)
  //   }
  // }
  async fetchReport(): Promise<any> {
    const data = {data_id: this.quesArr[0].data_id};
    try {
      const url = await this.http.post("http://192.168.97.194:5000/analyze",data).toPromise();
      console.log("report url: ",url);
      return (url);
    } catch (error: any) {
      throw new Error('Error fetching data: ' + error.message);
    }
  }

  setDetails(details:any){
    this.userDetails = details;
    console.log("Details: ",details);
  }

  sendSymptom(){
    return this.symptomName;
  }
}
