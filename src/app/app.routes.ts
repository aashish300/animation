import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent,
  children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', loadComponent: () =>
        import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
      data: { animation: 'dashboardPage'}
    },
    { path: 'conversation', loadComponent: () =>
        import('./conversation/conversation.component').then(c => c.ConversationComponent),
      data: { animation: 'chatPage'}
    }
  ]},

];
