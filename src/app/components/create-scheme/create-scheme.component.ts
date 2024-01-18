import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-create-scheme',
  templateUrl: './create-scheme.component.html',
  styleUrls: ['./create-scheme.component.css'],
  providers: [DatePipe]
})
export class CreateSchemeComponent implements OnInit {

  isLinear = false;
  divisionCode: any;
  divisionCodeReadOnly: boolean = true;
  schemeFormGroup!: FormGroup;
  unitFormGroup!: FormGroup;
  schemeData: any;
  id!: number;
  schemeDataById: any;
  private subscription!: Subscription;
  schemeDataForm!: FormGroup;
  unitDataForm!: FormGroup;

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

  districts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Kanniyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivagangai",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thiruvallur",
    "Thiruvarur",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvannamalai",
    "Vellore",
    "Villuppuram",
    "Virudhunagar"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private loader: NgxUiLoaderService,
  ) { }

  ngOnInit() {

    if (sessionStorage.getItem('code') !== "All") {
      this.divisionCode = sessionStorage.getItem('code');
    } else {
      this.divisionCode = "";
      this.divisionCodeReadOnly = false;
    }

    this.schemeFormGroup = this.formBuilder.group({
      v_DIVISION_CODE: [this.divisionCode],
      v_SCHEME_CODE: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(4), Validators.maxLength(4)]],
      v_DIVISION: [''],  // You might need to initialize this if necessary
      v_SCHEME_NAME: ['', [Validators.required]],
      v_SCHEME_TYPE: ['', [Validators.required]],
      v_CIRCLE: ['', [Validators.required]],
      v_CITY_RURAL: ['', [Validators.required]],
      v_UNIT_TYPE: ['', [Validators.required]],
      n_TOTAL_UNITS: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      v_SPLACE: ['', [Validators.required]],
      v_DISTRICT: ['', [Validators.required]],
      v_RESERVATION_STATUS: ['', [Validators.required]],
      v_FROM_DATE: [''],
      v_TO_DATE: [''],
      v_PROJECT_STATUS: ['', [Validators.required]],
      v_WHETHER_HP: [''],
      v_CUT_OFF_DATE: ['', [Validators.required]],
      n_SELLING_PRICE: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      n_RATE_OF_SCHEME_INTEREST: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      v_REPAYMENT_PERIOD: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      v_SELLING_EXTENT: [null, Validators.pattern(/^\d+$/)],
      v_PLINTH_AREA: [null, Validators.pattern(/^\d+$/)],
      v_UDS_AREA: [null, Validators.pattern(/^\d+$/)],
      v_TENTATIVE_LAND: ['', [Validators.required]],
      v_FINAL_LAND: ['', [Validators.required]],
      n_TENTATIVE_LAND_COST: [null, Validators.pattern(/^\d+$/)],
      n_FINAL_LAND_COST: [null, Validators.pattern(/^\d+$/)],
      v_FINAL_CUTOFF_DATE: [''],
      n_PROFIT_ON_LAND: [null, Validators.pattern(/^\d+$/)],
      v_REMARKS: [''],
    });
    this.updateDivisionName();

    this.unitFormGroup = this.formBuilder.group({
      n_TOTAL_ALLOTTED_UNITS: [''],
      n_TOTAL_UNSOLD_UNITS: [''],
      n_TOTAL_ALLOTTED_UNITS_FOR_OUTRIGHT: [''],
      n_TOTAL_ALLOTTED_UNITS_FOR_HIRE_PURCHASE: [''],
      n_TOTAL_ALLOTTED_UNITS_FOR_SFS: [''],
      n_TOTAL_ARREARS_EMI: [''],
      n_TOTAL_CURRENT_EMI: [''],
      n_TOTAL_BALANCE_EMI: [''],
      n_TOTAL_LIVE_CASES_FOR_HIRE: [''],
      n_FULL_COST_PAID: [''],
      n_TOTAL_NO_OF_SALE_DEED_ISSUED: [''],
      n_TOTAL_RIPPED_UNIT: [''],
    });

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

  }

  updateToDate(event: any) {
    const fromDate: Date = event.target.valueAsDate;
    if (fromDate) {
      let toDate = new Date(fromDate);
      toDate.setDate(toDate.getDate() + 90);
      this.schemeFormGroup.get('v_TO_DATE')?.setValue(toDate.toISOString().split('T')[0]);
    }
  }

  updateDivisionName() {
    const schemeCode = this.schemeFormGroup.get('v_DIVISION_CODE')?.value;
    if (schemeCode && schemeCode.length >= 2) {
      const firstTwoDigits = schemeCode.substring(0, 2);
      const matchingDivision = this.divisionsList.find(division => division.code === firstTwoDigits);

      if (matchingDivision) {
        this.schemeFormGroup.patchValue({
          v_DIVISION: matchingDivision.name,
          v_CIRCLE: matchingDivision.circle,
          v_CITY_RURAL: matchingDivision.city_n_rural,
        });
      } else {
        this.schemeFormGroup.patchValue({
          v_DIVISION: '',
          v_CIRCLE: '',
          v_CITY_RURAL: '',
        });
      }
    } else {
      this.schemeFormGroup.patchValue({
        v_DIVISION: '',
        v_CIRCLE: '',
        v_CITY_RURAL: '',
      });
    }
  }

  onSubmit() {
    if (this.schemeFormGroup.valid && this.unitFormGroup.valid) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '500px',
        data: {
          message: 'Are you sure you want to create this scheme?',
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
            ...this.schemeFormGroup.value,
            ...this.unitFormGroup.value,
            v_SCHEME_CODE: `${this.schemeFormGroup.get('v_DIVISION_CODE')?.value}${this.schemeFormGroup.get('v_SCHEME_CODE')?.value}`,
          };
          console.log(schemeData);
          this.http.createSchemeData([schemeData]).subscribe(
            (response) => {
              console.log('Successfully created scheme data:', response);
              this.dialog.open(DialogMsgComponent, {
                data: {
                  isSuccess: true,
                  message: 'Scheme data created successfully!',
                  routerLink: '/property/home/all-schemes'
                }
              });
            },
            (error) => {
              console.error('Error creating scheme data:', error);
              this.openDialog(false, error.error);
            }
          );
        }
      });
    } else {
      alert("Please fill all the fields");
    }

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

  getSchemeData(id: any) {
    this.http.getSchemeDataById(id).subscribe(
      (response: any) => {
        this.schemeData = response.data;
        console.log('Response:', response);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  fetchDataById() {
    this.subscription = this.http.getSchemeDataById(this.id).subscribe(
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

  ngOnDestroy() {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
