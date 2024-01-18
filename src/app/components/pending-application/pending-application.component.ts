import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pending-application',
  templateUrl: './pending-application.component.html',
  styleUrls: ['./pending-application.component.css']
})
export class PendingApplicationComponent {

    pendingApplicationsDataSource!: MatTableDataSource<any>;

    schemesTableColumns: string[] = ['n_ID', 'applicationNo', 'applicantName', 'date', 'reservationOrNonReservation', 'amountPaid', 'ACTION','allotmentOrder'];


    constructor(private apiService: HttpService,private route : ActivatedRoute) {}

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
      this.fetchDataFromAPI();
    }

    fetchDataFromAPI() {

      this.apiService.getPendingAppl().subscribe((response: any) => {
        if (response && response.status === 1 && response.data) {
          console.log(response.data)
          this.pendingApplicationsDataSource = new MatTableDataSource(response.data);
          this.pendingApplicationsDataSource.paginator = this.paginator;
          this.pendingApplicationsDataSource.sort = this.sort;
        }
      });
    }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.pendingApplicationsDataSource.filter = filterValue.trim().toLowerCase();
      if (this.pendingApplicationsDataSource.paginator) {
        this.pendingApplicationsDataSource.paginator.firstPage();
      }
    }



  }
