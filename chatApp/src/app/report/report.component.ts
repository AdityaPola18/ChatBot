import { Component } from '@angular/core';
import { QuestionService } from '../question.service';

interface PatientDetails {
  name: string;
  age: string;
  gender: string;
  smoking: string;
  drinking: string;
}

interface PossibleDiagnosis {
  name: string;
  consultations: string[];
}

interface Section {
  title: string;
  content: string;
}

interface TableRow {
  symptom: string;
  severity: string;
  duration: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {

  patientDetails: PatientDetails = {
    name: '',
    age: '',
    gender: '',
    smoking: '',
    drinking: '',
  };
  tableData !: any
  possibleDiagnosis !: any

  constructor(private questionServcice: QuestionService){}

  async ngOnInit(){
    const details = await this.questionServcice.fetchReport()
    this.patientDetails.name = details.name
    this.patientDetails.age = details.age
    this.patientDetails.gender = details.gender
    this.patientDetails.smoking = details.smoking
    this.patientDetails.drinking = details.drinking
    this.tableData = details.prognosis
    this.possibleDiagnosis = details.doctors
  }

  // sections: Section[] = [
  //   {
  //     title: 'Patient Deatails:',
  //     content:"",
      
  //   },
  //   {
  //     title: 'Section 2',
  //     content: 'This is the content of section 2.',
  //   },
  //   {
  //     title: 'Section 3',
  //     content: 'This is the content of section 3.',
  //   },
  // ];

  // tableData: TableRow[] = [
  //   {
  //     symptom: "cough",
  //     severity: "Mild",
  //     duration: "Less Than 1 week"
  //   },
  //   {
  //     symptom: "high fever",
  //     severity: "Mild",
  //     duration: "Less Than 1 week"
  //   },
  //   {
  //     symptom: "malaise",
  //     severity: "Irritating",
  //     duration: "More Than 1 week"
  //   },
  //   {
  //     symptom: "breathelessness",
  //     severity: "Mild",
  //     duration: "Less Than 1 week"
  //   },
  // ];

  // possibleDiagnoses: PossibleDiagnosis[] = [
  //   {
  //     name: 'Bronchial Asthma',
  //     consultations: ['Pulmonologist'],
  //   },
  //   {
  //     name: 'AIDS',
  //     consultations: ['Infectious Disease Specialist', 'Internist'],
  //   },
  //   {
  //     name: 'Hepatitis D',
  //     consultations: ['Hepatologist', 'Gastroenterologist'],
  //   },
  // ];
}


// let symptoms = [
//   {
//     symptom: "cough",
//     severity: "Mild",
//     duration: "Less Than 1 week"
//   },
//   {
//     symptom: "high fever",
//     severity: "Mild",
//     duration: "Less Than 1 week"
//   },
//   {
//     symptom: "malaise",
//     severity: "Irritating",
//     duration: "More Than 1 week"
//   },
//   {
//     symptom: "breathelessness",
//     severity: "Mild",
//     duration: "Less Than 1 week"
//   },
//   ]

