import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { QuestionsComponent } from './questions/questions.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  {path: "", component: UserDetailsComponent},
  {path: "symptoms", component: ChatbotComponent},
  {path: "chatPage", component: QuestionsComponent},
  {path: "report", component: ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
