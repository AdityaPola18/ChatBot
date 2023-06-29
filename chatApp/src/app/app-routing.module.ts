import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {path: "", component: ChatbotComponent},
  {path: "chatPage", component: QuestionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
