import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
constructor( public  authService: AuthService, private router:  Router, public authentication: AuthService) {
}
ngOnInit(){
  this.getEmployees();

}
  handleLogout(){
  this.authService.logout();
  this.router.navigateByUrl("/login")
  }


    public employees : Employee[] = [];
    public editEmployee!: Employee | null;
    public deleteEmployee!: Employee | null;


    public getEmployees(): void {
        this.employeeService.getEmployees().subscribe(
            (response: Employee[]) => {
                this.employees = response;
                console.log(this.employees);
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }
    public onUpdateEmloyee(employee: Employee): void {
        this.employeeService.updateEmployee(employee).subscribe(
            (response: Employee) => {
                console.log(response);
                this.getEmployees();
                this.router.navigateByUrl('employee');
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }



    public searchEmployees(key: string): void {
        console.log(key);
        const results: Employee[] = [];
        for (const employee of this.employees) {
            if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(employee);
            }
        }
        this.employees = results;
        if (results.length === 0 || !key) {
            this.getEmployees();
        }
    }

    public onOpenModal(employee: Employee | null, mode: string): void {
        const container = document.getElementById('main-container');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-toggle', 'modal');
        if (mode === 'add') {
            button.setAttribute('data-target', '#addEmployeeModal');
        }
        if (mode === 'edit') {
            this.editEmployee = employee;
            button.setAttribute('data-target', '#updateEmployeeModal');
        }
        if (mode === 'delete') {
            this.deleteEmployee = employee;
            button.setAttribute('data-target', '#deleteEmployeeModal');
        }

        if (container) {
            container.appendChild(button);
        }
        button.click();
    }

    saveModal(): void {
        const modalRef = this.ngbModal.open(AddEmployeeComponent, {size: 'lg', backdrop: 'static', animation: true});
        modalRef.closed.subscribe((res) => {
            if('success-tache' === res) {
                this.load();
            }
        })
    }

    updateModal(employ: Employee): void {
        const modalRef = this.ngbModal.open(AddEmployeeComponent, {size: 'lg',  backdrop: 'static', animation: true});
        modalRef.componentInstance.employ = employ;
        modalRef.closed.subscribe((res) => {
            if('success-tache' === res) {
                // this.updateResult.emit('success-tache');
                console.log("Success");
            }
        });
    }

    deleteModal(deleteEmployee: Employee): void {
        const modalRef = this.ngbModal.open(DeleteEmployeeComponent, {size: 'lg',  backdrop: 'static', animation: true});
        modalRef.componentInstance.deleteEmployee = deleteEmployee;
        modalRef.closed.subscribe((res) => {
            if('success-tache' === res) {
                // this.updateResult.emit('success-tache');
                console.log("Success");
            }
        });
    }

    load() {}
}


