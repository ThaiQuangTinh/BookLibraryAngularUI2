import { Injectable } from '@angular/core';
import { Role } from '../../enums/role-enum';

@Injectable({
  providedIn: 'root'
})
export class RoleHeplperServiceService {

  // Define id and role name for id (for UI)
  roles: any[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Librarian' },
    { id: 3, name: 'Reader' },
  ]

  constructor() { }

  // Function to get role name by id
  public getRoleNameById(roleId: number): Role {
    if (roleId == 1) {
      return Role.Admin;
    } else if (roleId == 2) {
      return Role.Librarian;
    } else if (roleId == 3) {
      return Role.Reader;
    } else {
      return Role.All;
    }
  }

  // Function to get role id by name
  public getRoleIdByName(role: Role): number {
    if (role == Role.Admin) {
      return 1;
    } else if (role == Role.Librarian) {
      return 2;
    } else if (role == Role.Reader) {
      return 3;
    } else {
      return 0;
    }
  }

  // Function to get roles
  public getRoles(): any {
    return this.roles;
  }
}
