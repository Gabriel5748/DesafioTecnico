import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar usuários. Por favor, tente novamente.';
        console.error('Erro ao carregar usuários:', err);
        this.isLoading = false;
      }
    });
  }

  handleAddUser(newUser: User): void {
    this.isLoading = true;
    this.errorMessage = '';    
    
    console.log('Novo usuário a ser enviado:', newUser);
    
    this.userService.addUser(newUser).subscribe({
      next: (addedUser) => {
        console.log('Usuário adicionado com sucesso:', addedUser);
        this.users.push(addedUser);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao adicionar usuário:', err);
        this.errorMessage = 'Erro ao adicionar usuário. Por favor, tente novamente.';
        this.isLoading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao excluir usuário. Por favor, tente novamente.';
          console.error('Erro ao excluir usuário:', err);
        }
      });
    }
  }
}