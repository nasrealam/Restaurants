import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../Service/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-resturant-dash',
  templateUrl: './resturant-dash.component.html',
  styleUrls: ['./resturant-dash.component.scss']
})
export class ResturantDashComponent implements OnInit {
  restaurants: [] | any;

  displayedColumns: string[] = ['restaurants_ID', 'name', 'email', 'phone', 'address', 'Action'];
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  restaurantFilter: string = '';

  constructor(private dailog: MatDialog,
    private user: UserService) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dailog.open(DialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    })


  }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct() {
    this.user.getUserDetails().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }, error: (err) => {
        alert('Error while fetching the data');
      }
    });

  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    };
  };

}
