import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';


export interface UnitData {
  typename: string;
  sno: number;
  unitid: number;
  allotmenttype: string;
  category: string;
}


@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.css']
})
export class MasterDataComponent {



  pageSize = 10;
  schemeId: any
  private subscription!: Subscription;
  schemeDataFormGroup!: FormGroup
  allUnitDataSource = new MatTableDataSource<any>([]);
  unitData!: UnitData[];
  unitTableColumns: string[] = ['n_ID', 'v_UNIT_AC_NO', 'v_UNIT_ALLOTTED_STATUS', 'v_UNIT_NO', 'v_DATE_OF_ALLOTMENT', 'v_UNIT_COST',
    'v_SALE_DEED_STATUS', 'ACTION'];
  id!: any;
  totalunits: any;
  allotedunits: any;
  unsoldunits: any

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private loader: NgxUiLoaderService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }



  ngOnInit() {

    this.schemeDataFormGroup = this.formBuilder.group({
      v_SCHEME_CODE: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
    })

    this.route.paramMap.subscribe(params => {
      this.schemeId = +params.get('id')!;
      this.fetchSchemeData();
      this.getAllSchemesData(this.schemeId);
    });
  }

  ngAfterViewInit() {
    this.allUnitDataSource.paginator = this.paginator;
    this.allUnitDataSource.sort = this.sort;
  }



  fetchSchemeData() {
    this.subscription = this.http.getSchemeDataById(this.schemeId)
      .subscribe((response) => {
        const data = response.data;
        this.totalunits = response.data.n_TOTAL_UNITS;
        this.allotedunits = response.data.n_TOTAL_ALLOTTED_UNITS;
        this.unsoldunits = response.data.n_TOTAL_UNSOLD_UNITS;
        this.schemeDataFormGroup.patchValue({
          v_SCHEME_CODE: data.v_SCHEME_CODE,
          division: data.v_DIVISION,
          scheme_name: data.v_SCHEME_NAME,
          Type: data.v_SCHEME_TYPE,
          unit_type: data.v_UNIT_TYPE,

        });
      })

  }

  getAllSchemesData(id: any) {

    this.http.getUnitOfScheme(id).subscribe(
      (response) => {
        console.log('Response:', response);
        if (response && Array.isArray(response.data)) {
          this.allUnitDataSource.data = response.data.map((element: any, index: number) => ({
            ...element,
            serialNumber: index + 1,
          }));
        } else {
          console.error('Invalid response format or missing data array.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allUnitDataSource.filter = filterValue.trim().toLowerCase();
  }

  showCreateUnit() {
    this.router.navigate(['/property/home/create-unit', this.schemeId]);
  }

  showEditUnit(n_ID: number) {
    this.router.navigate(['/property/home/', this.schemeId, 'unit', 'edit', n_ID]);
  }

  showViewUnit(n_ID: number) {
    this.router.navigate(['/property/home/', this.schemeId, 'unit', 'view', n_ID]);
  }

}








