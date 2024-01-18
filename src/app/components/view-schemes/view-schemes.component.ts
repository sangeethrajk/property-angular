import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

export interface SchemesData {
  n_ID: number;
  v_DIVISION: string;
  v_SCHEME_CODE: Date;
  v_SCHEME_NAME: string;
  n_TOTAL_DEVELOPED_UNITS: string;
  ACTION: any;
  MASTER_DATA: any;
}

@Component({
  selector: 'app-view-schemes',
  templateUrl: './view-schemes.component.html',
  styleUrls: ['./view-schemes.component.css']
})
export class ViewSchemesComponent implements OnInit {

  allSchemesDataSource = new MatTableDataSource<any>([]);
  schemesData!: SchemesData[];
  schemesTableColumns: string[] = ['n_ID', 'v_DIVISION', 'v_SCHEME_CODE', 'v_SCHEME_NAME', 'v_SCHEME_TYPE', 'v_UNIT_TYPE', 'n_TOTAL_DEVELOPED_UNITS', 'n_TOTAL_ALLOTTED_UNITS', 'n_TOTAL_UNSOLD_UNITS', 'v_PROJECT_STATUS', 'ACTION', 'WEBSITE_DATA', 'MASTER_DATA'];
  id: any;
  divisionCode: any;

  divisionsList = [
    { code: '11', circle: 'Chennai Circle I', city_n_rural: 'City', name: 'Anna Nagar' },
    { code: '12', circle: 'Chennai Circle I', city_n_rural: 'City', name: 'JJ Nagar' },
    { code: '13', circle: 'Chennai Circle I', city_n_rural: 'City', name: 'KK Nagar' },
    { code: '15', circle: 'Chennai Circle II', city_n_rural: 'City', name: 'Besant Nagar' },
    { code: '16', circle: 'Chennai Circle II', city_n_rural: 'City', name: 'Nandanam' },
    { code: '17', circle: 'Chennai Circle II', city_n_rural: 'City', name: 'Maintenance' },
    { code: '19', circle: 'Project Circle (City)', city_n_rural: 'City', name: 'SPD I' },
    { code: '20', circle: 'Project Circle (City)', city_n_rural: 'City', name: 'SPD II' },
    { code: '21', circle: 'Project Circle (City)', city_n_rural: 'City', name: 'CIT Nagar' },
    { code: '22', circle: 'Project Circle (City)', city_n_rural: 'City', name: 'Foreshore Estate' },
    { code: '23', circle: 'Project Circle (City)', city_n_rural: 'City', name: 'SAF Games Village' },
    { code: '25', circle: 'Project Circle (Rural)', city_n_rural: 'Rural', name: 'Thirumazhisai Satellite Town' },
    { code: '26', circle: 'Project Circle (Rural)', city_n_rural: 'Rural', name: 'SPD III' },
    { code: '27', circle: 'Project Circle (Rural)', city_n_rural: 'Rural', name: 'Uchapatti Thoppur Satellite Town' },
    { code: '29', circle: 'Salem', city_n_rural: 'Rural', name: 'Coimbatore Housing Unit' },
    { code: '30', circle: 'Salem', city_n_rural: 'Rural', name: 'Erode Housing Unit ' },
    { code: '31', circle: 'Salem', city_n_rural: 'Rural', name: 'Salem Housing Unit ' },
    { code: '32', circle: 'Salem', city_n_rural: 'Rural', name: 'Hosur Housing Unit ' },
    { code: '33', circle: 'Salem', city_n_rural: 'Rural', name: 'Vellore Housing Unit ' },
    { code: '35', circle: 'Madurai', city_n_rural: 'Rural', name: 'Madurai Housing Unit ' },
    { code: '36', circle: 'Madurai', city_n_rural: 'Rural', name: 'Tirunelveli Housing Unit' },
    { code: '37', circle: 'Madurai', city_n_rural: 'Rural', name: 'Ramanathapuram Housing Unit' },
    { code: '38', circle: 'Madurai', city_n_rural: 'Rural', name: 'Trichy Housing Unit' },
    { code: '39', circle: 'Madurai', city_n_rural: 'Rural', name: 'Thanjavur Housing Unit' },
    { code: '40', circle: 'Madurai', city_n_rural: 'Rural', name: 'Villupuram Housing Unit' },
  ];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.divisionCode = sessionStorage.getItem('code');
    this.getAllSchemesData(this.id);
  }

  ngAfterViewInit() {
    this.allSchemesDataSource.paginator = this.paginator;
    this.allSchemesDataSource.sort = this.sort;
  }

  getAllSchemesData(id: any) {
    this.httpService.getAllSchemesData(1).subscribe(
      (response: any) => {
        console.log('Response:', response);
        if (this.divisionCode.toLowerCase() === 'all') {
          // Show all data without filtering
          this.allSchemesDataSource.data = response.data
            .map((scheme: any, index: number) => ({
              ...scheme,
              serialNumber: index + 1,
            }));
        } else {
          // Filter data based on divisionCode
          this.allSchemesDataSource.data = response.data
            .filter((scheme: any) => scheme.v_DIVISION === this.getDivisionName(this.divisionCode))
            .map((scheme: any, index: number) => ({
              ...scheme,
              serialNumber: index + 1,
            }));
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getDivisionName(code: string): string {
    const division = this.divisionsList.find(div => div.code === code);
    console.log(division);
    return division ? division.name : '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allSchemesDataSource.filter = filterValue.trim().toLowerCase();

    if (this.allSchemesDataSource.paginator) {
      this.allSchemesDataSource.paginator.firstPage();
    }
  }

}