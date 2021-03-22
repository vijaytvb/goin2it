import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './component/detail.component';
import { ListComponent } from './component/list.component';

const routes: Routes = [
  { path:'',component : ListComponent },
  { path:'list',component : ListComponent },
  { path:'detail/:constituencyId/:candidateid',component : DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
