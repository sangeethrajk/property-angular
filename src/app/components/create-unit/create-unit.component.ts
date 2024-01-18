import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.css']
})
export class CreateUnitComponent {

  UnitFormGroup!: FormGroup;
  sfsFormGroup!: FormGroup;
  PropertyFormGroup!: FormGroup;
  AllotteeFormGroup!: FormGroup;
  UnitDataFormGroup!: FormGroup;
  sfsDataFormGroup!: FormGroup;
  PropertyDataFormGroup!: FormGroup;
  AllotteeDataFormGroup!: FormGroup;
  schemeId: any
  id!: number;
  totalunits: any;
  allunits: any;
  selectedTab: string = 'Unit';
  layoutBase64!: string;
  fieldMeasurementBookBase64!: string;

  FMBFilePath: any;
  LayoutFilePath: any;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.schemeId = this.route.snapshot.paramMap.get('id');

    this.UnitFormGroup = this.formBuilder.group({
      n_ID: [''],
      v_UNIT_AC_NO: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(12), Validators.maxLength(12)]],
      v_DIVISION: [''],
      v_SCHEME_NAME: [''],
      v_TYPE_NAME: [''],
      v_ASSET_TYPE: [''],
      v_UNIT_NO: [''],
      v_BLOCK_NO: [''],
      v_FLOOR_NO: [''],
      v_FLAT_NO: [''],
      v_PLINTH_AREA: [''],
      v_UDS_AREA: [''],
      gdq: [''],
      v_RESERVATION_CATEGORY: [''],
      v_PRIORITY: [''],
      v_UNIT_ALLOTTED_STATUS: [''],
      v_MODE_OF_ALLOTMENT: [''],
      v_CATEGORY: [''],
      v_DATE_OF_ALLOTMENT: [''],
      v_UNIT_COST: [''],
      v_FREEZED_DATE: [''],
      v_INITIAL_DEPOSIT: [''],
      v_EMI: [''],
      v_EMI_START_DATE: [''],
      v_UNIT_READY_DATE: [''],
      v_PAYMENT_DUE_DATE: [''],
      v_SF_LOAN_SG: [''],
      v_AB_ISSUED_DATE: [''],
      v_LOAN_SANC_DATE: [''],
      v_UNIT_HANDING_OVER: [''],
      v_PLOT_HANDING_OVER: [''],
      v_ACTUAL_EXTENT: [''],
      v_ROAD_FACING: [''],
      v_CORNER_PLOT_STATUS: [''],
      v_DOOR_FACING: [''],
      v_LIVE_STATUS: [''],
      v_RIPED_STATUS: [''],
      v_FC_PAID_STATUS: [''],
      v_DRAFT_DEED_ISSUED_ON: [''],
      v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED: [''],
      v_MC_DEMAND: [''],
      maintenance_DATE: [''],
      v_CAR_DEMAND: [''],
      v_CAR_SLOT_1: [''],
      v_CAR_SLOT_2: [''],
      v_RIPED_BUT_COST_NOT_FULLY_PAID: [''],
      v_SALE_DEED_STATUS: [''],
      v_SALE_DEED_DATE: [''],
    });

    this.sfsFormGroup = this.formBuilder.group({
      v_UNIT_AC_NO: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
      v_1ST_AMOUNT_DUE: [''],
      v_1ST_AMOUNT_DUE_DATE: [''],
      v_2ST_AMOUNT_DUE: [''],
      v_2ND_AMOUNT_DUE_DATE: [''],
      v_3RD_AMOUNT_DUE: [''],
      v_3RD_AMOUNT_DUE_DATE: [''],
      v_4TH_AMOUNT_DUE: [''],
      v_4TH_AMOUNT_DUE_DATE: [''],
      v_5TH_AMOUNT_DUE: [''],
      v_5TH_AMOUNT_DUE_DATE: [''],
      v_6TH_AMOUNT_DUE: [''],
      v_6TH_AMOUNT_DUE_DATE: [''],
      v_7TH_AMOUNT_DUE: [''],
      v_7TH_AMOUNT_DUE_DATE: [''],
      v_8TH_AMOUNT_DUE: [''],
      v_8TH_AMOUNT_DUE_DATE: [''],
      v_9TH_AMOUNT_DUE: [''],
      v_9TH_AMOUNT_DUE_DATE: [''],
      v_10TH_AMOUNT_DUE: [''],
      v_10TH_AMOUNT_DUE_DATE: [''],
      v_11TH_AMOUNT_DUE: [''],
      v_11TH_AMOUNT_DUE_DATE: [''],
      v_12TH_AMOUNT_DUE: [''],
      v_12TH_AMOUNT_DUE_DATE: [''],
      v_13TH_AMOUNT_DUE: [''],
      v_13TH_AMOUNT_DUE_DATE: ['']
    });

    this.PropertyFormGroup = this.formBuilder.group({
      v_UNIT_AC_NO: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
      v_ALLOTMENT_REF: [''],
      v_CURRENT_FILE_REF: [''],
      v_TYPE_DESC: [''],
      v_SCHEME_PLACE: [''],
      total_COST: [''],
      total_COST_WORDS: [''],
      land_COST: [''],
      land_COST_WORDS: [''],
      building_COST: [''],
      building_COST_WORDS: [''],
      emd_RECEIPT_NO: [''],
      emd_PAID_DATE: [''],
      emd_PAID_AMOUNT: [''],
      date_OF_HANDLING: [''],
      board_RESOLU_NO: [''],
      board_RESOLU_DATE: [''],
      go_NO: [''],
      go_DATE: [''],
      survey_NO: [''],
      north_BOUNDARY: [''],
      east_BOUNDARY: [''],
      west_BOUNDARY: [''],
      south_BOUNDARY: [''],
      north_SCALING: [''],
      east_SCALING: [''],
      west_SCALING: [''],
      south_SCALING: [''],
      splay: [''],
      village: [''],
      taluk: [''],
      district: [''],
      sub_REG_DESIG: [''],
      sub_REG_PLACE: [''],
      lc_AGREE_DATE: [''],
      purpose_OF_DOC: [''],
    });

    this.AllotteeFormGroup = this.formBuilder.group({
      v_UNIT_AC_NO: [''],
      division: [''],
      scheme_name: [''],
      Type: [''],
      unit_type: [''],
      applicantName: [''],
      dateOfBirth: [''],
      age: [''],
      applicantSpouseName: [''],
      applicantFathersName: [''],
      jointApplicantName: [''],
      jointApplicantDOB: [''],
      jointApplicantAge: [''],
      jointApplicantSpouseName: [''],
      jointApplicantFathername: [''],
      mobileNumber: [''],
      emailId: [''],
      aadhaarNumber: [''],
      panNumber: [''],
      correspondenceAddress: [''],
      permanentAddress: [''],
      applicantMonthlyIncome: [''],
      spouseMonthlyIncome: [''],
      totalMonthlyIncome: [''],
      bankName: [''],
      accountNumber: [''],
      ifscCode: [''],
      accountHolderName: [''],
      nativeOfTamilnadu_filepath: [''],
      birthCertificate_filepath: [''],
      aadhaarProof_filepath: [''],
      panProof_filepath: [''],
      incomeCertificate_filepath: [''],
      reservationCategoryProof_filepath: [''],
      reservationSubCategoryProof_filepath: [''],
      signature_filepath: [''],
      jointApplSignFilePath: [''],
      photo_filepath: ['']
    });


    this.UnitDataFormGroup = this.formBuilder.group({
      v_UNIT_ACCOUNT_NUMBER: ['', [Validators.required, Validators.pattern(/^\d*$/), Validators.minLength(6), Validators.maxLength(6)]],
      v_UNIT_AC_NO: ['', [Validators.required]],
      v_SCHEME_CODE: [''],
      v_DIVISION: [''],
      v_SCHEME_NAME: [''],
      v_TYPE_NAME: [''],
      v_ASSET_TYPE: [''],
      v_UNIT_NO: [''],
      v_BLOCK_NO: [''],
      v_FLOOR_NO: [''],
      v_FLAT_NO: [''],
      v_PLINTH_AREA: [''],
      v_UDS_AREA: [''],
      gdq: ['No'],
      v_RESERVATION_CATEGORY: [''],
      v_RESERVATION_CATEGORY_CODE: [''],
      v_PRIORITY: [''],
      v_PRIORITY_CODE: [''],
      v_UNIT_ALLOTTED_STATUS: ['No'],
      v_MODE_OF_ALLOTMENT: [''],
      v_CATEGORY: [''],
      v_DATE_OF_ALLOTMENT: [''],
      v_UNIT_COST: [''],
      v_FREEZED_DATE: ['No'],
      v_INITIAL_DEPOSIT: [''],
      v_EMI: [''],
      v_EMI_START_DATE: [''],
      v_UNIT_READY_DATE: [''],
      v_PAYMENT_DUE_DATE: [''],
      v_SF_LOAN_SG: ['No'],
      v_AB_ISSUED_DATE: [''],
      v_LOAN_SANC_DATE: [''],
      v_UNIT_HANDING_OVER: [''],
      v_PLOT_HANDING_OVER: [''],
      v_ACTUAL_EXTENT: [''],
      v_ROAD_FACING: [''],
      v_CORNER_PLOT_STATUS: ['No'],
      v_DOOR_FACING: [''],
      v_LIVE_STATUS: ['No'],
      v_RIPED_STATUS: ['No'],
      v_FC_PAID_STATUS: ['No'],
      v_DRAFT_DEED_ISSUED_ON: [''],
      v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED: [''],
      v_MC_DEMAND: [''],
      maintenance_DATE: [''],
      v_CAR_DEMAND: [''],
      v_CAR_SLOT_1: [''],
      v_CAR_SLOT_2: [''],
      v_RIPED_BUT_COST_NOT_FULLY_PAID: [''],
      v_SALE_DEED_STATUS: ['No'],
      v_SALE_DEED_DATE: [''],
    });

    this.sfsDataFormGroup = this.formBuilder.group({
      v_1ST_AMOUNT_DUE: [''],
      v_1ST_AMOUNT_DUE_DATE: [''],
      v_2ST_AMOUNT_DUE: [''],
      v_2ND_AMOUNT_DUE_DATE: [''],
      v_3RD_AMOUNT_DUE: [''],
      v_3RD_AMOUNT_DUE_DATE: [''],
      v_4TH_AMOUNT_DUE: [''],
      v_4TH_AMOUNT_DUE_DATE: [''],
      v_5TH_AMOUNT_DUE: [''],
      v_5TH_AMOUNT_DUE_DATE: [''],
      v_6TH_AMOUNT_DUE: [''],
      v_6TH_AMOUNT_DUE_DATE: [''],
      v_7TH_AMOUNT_DUE: [''],
      v_7TH_AMOUNT_DUE_DATE: [''],
      v_8TH_AMOUNT_DUE: [''],
      v_8TH_AMOUNT_DUE_DATE: [''],
      v_9TH_AMOUNT_DUE: [''],
      v_9TH_AMOUNT_DUE_DATE: [''],
      v_10TH_AMOUNT_DUE: [''],
      v_10TH_AMOUNT_DUE_DATE: [''],
      v_11TH_AMOUNT_DUE: [''],
      v_11TH_AMOUNT_DUE_DATE: [''],
      v_12TH_AMOUNT_DUE: [''],
      v_12TH_AMOUNT_DUE_DATE: [''],
      v_13TH_AMOUNT_DUE: [''],
      v_13TH_AMOUNT_DUE_DATE: ['']
    });

    this.PropertyDataFormGroup = this.formBuilder.group({
      v_ALLOTMENT_REF: [''],
      v_CURRENT_FILE_REF: [''],
      v_TYPE_DESC: [''],
      v_SCHEME_PLACE: [''],
      total_COST: [''],
      total_COST_WORDS: [''],
      land_COST: [''],
      land_COST_WORDS: [''],
      building_COST: [''],
      building_COST_WORDS: [''],
      emd_RECEIPT_NO: [''],
      emd_PAID_DATE: [''],
      emd_PAID_AMOUNT: [''],
      date_OF_HANDLING: [''],
      board_RESOLU_NO: [''],
      board_RESOLU_DATE: [''],
      go_NO: [''],
      go_DATE: [''],
      survey_NO: [''],
      north_BOUNDARY: [''],
      east_BOUNDARY: [''],
      west_BOUNDARY: [''],
      south_BOUNDARY: [''],
      north_SCALING: [''],
      east_SCALING: [''],
      west_SCALING: [''],
      south_SCALING: [''],
      splay: [''],
      village: [''],
      taluk: [''],
      district: [''],
      sub_REG_DESIG: [''],
      sub_REG_PLACE: [''],
      lc_AGREE_DATE: [''],
      purpose_OF_DOC: [''],
    });

    this.fetchSchemeData();
    this.getAllSchemesData(this.schemeId);
  }

  fetchSchemeData() {
    this.http.getSchemeDataById(this.schemeId)
      .subscribe((response) => {
        const data = response.data;
        console.log(data);
        this.totalunits = response.data.n_TOTAL_UNITS;
        this.UnitDataFormGroup.patchValue({
          v_SCHEME_CODE: data.v_SCHEME_CODE,
          v_DIVISION: data.v_DIVISION,
          v_SCHEME_NAME: data.v_SCHEME_NAME,
          v_TYPE_NAME: data.v_SCHEME_TYPE,
          v_ASSET_TYPE: data.v_UNIT_TYPE,
        });
      });
  }

  getAllSchemesData(id: any) {

    this.http.getUnitOfScheme(id).subscribe(
      (response) => {

        if (response && Array.isArray(response.data)) {
          this.allunits = response.data
        } else {
          console.error('Invalid response format or missing data array.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onSubmit() {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to create this Unit?',
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
        const unitData = {
          ...this.sfsDataFormGroup.value,
          ...this.PropertyDataFormGroup.value,
          ...this.UnitDataFormGroup.value,
          n_SCHEME_ID: this.schemeId,
          v_UNIT_AC_NO: `${this.UnitDataFormGroup.get('v_SCHEME_CODE')?.value}${this.UnitDataFormGroup.get('v_UNIT_ACCOUNT_NUMBER')?.value}`,
          v_LAYOUT_FILE: this.layoutBase64,
          v_FMB_FILE: this.fieldMeasurementBookBase64,
        };
        console.log(unitData)
        this.http.createUnitData(unitData).subscribe(
          (response) => {
            console.log('Successfully created unit data:', response);
            this.dialog.open(DialogMsgComponent, {
              data: {
                isSuccess: true,
                message: 'Unit data created successfully!',
                routerLink: `/property/home/master-data/${this.schemeId}`
              }
            });
          },
          (error) => {
            console.error('Error creating unit data:', error);
            this.openDialog(false, error.message);
          }
        );
      }
    });

  }

  openFileInNewTab(filePath: string): string {
    return 'file://' + filePath;
  }

  openDialog(isSuccess: boolean, message: string) {
    const dialogRef = this.dialog.open(DialogMsgComponent, {
      width: '400px',
      data: { isSuccess, message }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onFileSelected(event: any, fileType: string): void {
    const file = event.target.files[0];

    // Check file size
    if (file.size > 50000000) {
      window.alert('File size exceeds the limit of 50MB.');
      return;
    }

    this.convertFileToBase64(file, (base64String) => {
      // Store the base64 string in the corresponding property
      if (fileType === 'layout') {
        this.layoutBase64 = base64String;
      } else if (fileType === 'fieldMeasurementBook') {
        this.fieldMeasurementBookBase64 = base64String;
      }

      // Additional handling if needed
      console.log(`${fileType} Base64 String:`, base64String);
    });
  }

  convertFileToBase64(file: File, callback: (base64String: string) => void): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1];
        callback(base64String);
      }
    };

    reader.readAsDataURL(file);
  }

  private showSnackBar(message: string, panelClass: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,  // Adjust duration as needed
      panelClass: [panelClass],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  // Edit mode flags
  editFMBMode: boolean = false;
  editLayoutMode: boolean = false;

  // Toggle edit mode for Field Measurement Book
  editFMB() {
    this.editFMBMode = !this.editFMBMode;
  }

  // Save changes for Field Measurement Book
  saveFMB() {
    // Implement logic to save the changes
    // You can handle file upload and update the FMBFilePath
    // For example: this.FMBFilePath = 'new/path/to/fmb/file';
    this.editFMBMode = false; // Exit edit mode
  }

  // Toggle edit mode for Layout
  editLayout() {
    this.editLayoutMode = !this.editLayoutMode;
  }

  // Save changes for Layout
  saveLayout() {
    // Implement logic to save the changes
    // You can handle file upload and update the LayoutFilePath
    // For example: this.LayoutFilePath = 'new/path/to/layout/file';
    this.editLayoutMode = false; // Exit edit mode
  }

}