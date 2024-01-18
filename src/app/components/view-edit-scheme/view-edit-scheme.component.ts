import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';

@Component({
  selector: 'app-view-edit-scheme',
  templateUrl: './view-edit-scheme.component.html',
  styleUrls: ['./view-edit-scheme.component.css']
})
export class ViewEditSchemeComponent {

  isLinear = false;
  divisionCode: any;
  divisionCodeReadOnly: boolean = true;
  schemeFormGroup!: FormGroup;
  unitFormGroup!: FormGroup;
  schemeData: any;
  mode: any;
  id!: any;
  heading: any;
  viewMode!: boolean;
  schemeDataById: any;
  schemeDataForm!: FormGroup;
  unitDataForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.mode = this.route.snapshot.paramMap.get('mode');
    this.id = this.route.snapshot.paramMap.get('id');

    this.heading = this.mode === "edit" ? "Edit Scheme" : "View Scheme";
    this.viewMode = this.mode !== "edit";

    this.schemeDataForm = this.formBuilder.group({
      v_SCHEME_CODE: new FormControl(),
      v_DIVISION: new FormControl(),
      v_CIRCLE: new FormControl(),
      v_CITY_RURAL: new FormControl(),
      v_SCHEME_NAME: new FormControl(),
      v_SCHEME_TYPE: new FormControl(),
      v_UNIT_TYPE: new FormControl(),
      n_TOTAL_UNITS: new FormControl(),
      v_SPLACE: new FormControl(),
      v_DISTRICT: new FormControl(),
      v_RESERVATION_STATUS: new FormControl(),
      v_FROM_DATE: new FormControl(),
      v_TO_DATE: new FormControl(),
      v_PROJECT_STATUS: new FormControl(),
      v_WHETHER_HP: new FormControl(),
      v_CUT_OFF_DATE: new FormControl(),
      n_SELLING_PRICE: new FormControl(),
      n_RATE_OF_SCHEME_INTEREST: new FormControl(),
      v_REPAYMENT_PERIOD: new FormControl(),
      v_SELLING_EXTENT: new FormControl(),
      v_PLINTH_AREA: new FormControl(),
      v_UDS_AREA: new FormControl(),
      v_TENTATIVE_LAND: new FormControl(),
      v_FINAL_LAND: new FormControl(),
      n_TENTATIVE_LAND_COST: new FormControl(),
      n_FINAL_LAND_COST: new FormControl(),
      v_FINAL_CUTOFF_DATE: new FormControl(),
      n_PROFIT_ON_LAND: new FormControl(),
      v_REMARKS: new FormControl(),
    });

    this.unitDataForm = this.formBuilder.group({
      n_TOTAL_ALLOTTED_UNITS: new FormControl(),
      n_TOTAL_UNSOLD_UNITS: new FormControl(),
      n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT: new FormControl(),
      n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE: new FormControl(),
      n_TOTAL_ALLOTTED_UNITS_FOR_SFS: new FormControl(),
      n_TOTAL_ARREARS_EMI: new FormControl(),
      n_TOTAL_CURRENT_EMI: new FormControl(),
      n_TOTAL_BALANCE_EMI: new FormControl(),
      n_TOTAL_LIVE_CASES_FOR_HIRE: new FormControl(),
      n_FULL_COST_PAID: new FormControl(),
      n_TOTAL_NO_OF_SALE_DEED_ISSUED: new FormControl(),
      n_TOTAL_RIPPED_UNIT: new FormControl(),
    });

    this.fetchDataById();
  }

  onUpdate(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to update this scheme?',
        confirmBackgroundColor: 'green',
        cancelBackgroundColor: 'red',
        confirmTextColor: 'white',
        cancelTextColor: 'white',
        confirmText: 'Yes',
        cancelText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const schemeData = {
          n_ID: id,
          ...this.schemeDataForm.value,
          ...this.unitDataForm.value,
        };
        this.http.editSchemeData(schemeData).subscribe(
          (response: any) => {
            console.log('Successfully updated scheme data:', response);
            this.dialog.open(DialogMsgComponent, {
              data: {
                isSuccess: true,
                message: 'Scheme data updated successfully!',
                routerLink: '/property/home/all-schemes'
              }
            });
          },
          (error: any) => {
            console.error('Error in updating scheme data:', error);
            this.openDialog(false, 'Error in updating scheme data. Please try again later.');
          }
        );
      }
    });
  }

  onDelete(id: number) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to delete this scheme data?',
        confirmBackgroundColor: 'red',
        cancelBackgroundColor: 'white',
        confirmTextColor: 'white',
        cancelTextColor: 'black',
        confirmText: 'Yes',
        cancelText: 'No'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteScheme(id);
      }
    });
  }

  deleteScheme(id: number) {
    this.http.deleteSchemeDataById(id).subscribe(
      (response: any) => {
        this.dialog.open(DialogMsgComponent, {
          data: {
            isSuccess: true,
            message: 'Scheme data deleted successfully!',
            routerLink: '/property/home/all-schemes'
          }
        });
      },
      (error: any) => {
        this.openDialog(false, 'Error in deleting scheme data. Please try again later.');
      }
    );
  }

  openDialog(isSuccess: boolean, message: string) {
    const dialogRef = this.dialog.open(DialogMsgComponent, {
      width: '400px', // Set the desired width of the dialog
      data: { isSuccess, message } // Pass the isSuccess flag and the message to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      // Do something when the dialog is closed (optional)
    });
  }

  fetchDataById() {
    this.http.getSchemeDataById(this.id).subscribe(
      (response: any) => {
        console.log(response)
        const data = response.data;
        console.log(data.v_SCHEME_CODE)
        this.schemeDataForm.patchValue({
          v_SCHEME_CODE: data.v_SCHEME_CODE,
          v_DIVISION: data.v_DIVISION,
          v_SCHEME_NAME: data.v_SCHEME_NAME,
          v_SCHEME_TYPE: data.v_SCHEME_TYPE,
          v_UNIT_TYPE: data.v_UNIT_TYPE,
          n_TOTAL_UNITS: data.n_TOTAL_UNITS,
          v_SPLACE: data.v_SPLACE,
          v_DISTRICT: data.v_DISTRICT,
          v_RESERVATION_STATUS: data.v_RESERVATION_STATUS,
          v_FROM_DATE: data.v_FROM_DATE,
          v_TO_DATE: data.v_TO_DATE,
          v_PROJECT_STATUS: data.v_PROJECT_STATUS,
          v_WHETHER_HP: data.v_WHETHER_HP,
          v_CUT_OFF_DATE: data.v_CUT_OFF_DATE,
          n_SELLING_PRICE: data.n_SELLING_PRICE,
          n_RATE_OF_SCHEME_INTEREST: data.n_RATE_OF_SCHEME_INTEREST,
          v_REPAYMENT_PERIOD: data.v_REPAYMENT_PERIOD,
          v_SELLING_EXTENT: data.v_SELLING_EXTENT,
          v_PLINTH_AREA: data.v_PLINTH_AREA,
          v_UDS_AREA: data.v_UDS_AREA,
          v_TENTATIVE_LAND: data.v_TENTATIVE_LAND,
          v_FINAL_LAND: data.v_FINAL_LAND,
          n_TENTATIVE_LAND_COST: data.n_TENTATIVE_LAND_COST,
          n_FINAL_LAND_COST: data.n_FINAL_LAND_COST,
          v_FINAL_CUTOFF_DATE: data.v_FINAL_CUTOFF_DATE,
          n_PROFIT_ON_LAND: data.n_PROFIT_ON_LAND,
          v_START_FROM: data.v_START_FROM,
          v_REMARKS: data.v_REMARKS,
        });

        this.unitDataForm.patchValue({
          n_TOTAL_ALLOTTED_UNITS: data.n_TOTAL_ALLOTTED_UNITS,
          n_TOTAL_UNSOLD_UNITS: data.n_TOTAL_UNSOLD_UNITS,
          n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT: data.n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT,
          n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE: data.n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE,
          n_TOTAL_ALLOTTED_UNITS_FOR_SFS: data.n_TOTAL_ALLOTTED_UNITS_FOR_SFS,
          n_TOTAL_ARREARS_EMI: data.n_TOTAL_ARREARS_EMI,
          n_TOTAL_CURRENT_EMI: data.n_TOTAL_CURRENT_EMI,
          n_TOTAL_BALANCE_EMI: data.n_TOTAL_BALANCE_EMI,
          n_TOTAL_LIVE_CASES_FOR_HIRE: data.n_TOTAL_LIVE_CASES_FOR_HIRE,
          n_FULL_COST_PAID: data.n_FULL_COST_PAID,
          n_TOTAL_NO_OF_SALE_DEED_ISSUED: data.n_TOTAL_NO_OF_SALE_DEED_ISSUED,
          n_TOTAL_RIPPED_UNIT: data.n_TOTAL_RIPPED_UNIT
        });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
