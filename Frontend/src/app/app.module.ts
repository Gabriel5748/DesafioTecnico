import { Component } from '@angular/core';
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserFormComponent } from './components/user-form/user-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent, UserListComponent],
  template: `
    <app-user-list></app-user-list>
    <app-user-form></app-user-form>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'desafio_tecnico';
}