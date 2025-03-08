import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', loadComponent: () =>
      import('./dashboard/dashboard.component').then(c => c.DashboardComponent)},
  { path: 'conversation', loadComponent: () =>
      import('./conversation/conversation.component').then(c => c.ConversationComponent)}
];
