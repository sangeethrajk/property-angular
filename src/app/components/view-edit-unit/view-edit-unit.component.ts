import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';

@Component({
  selector: 'app-view-edit-unit',
  templateUrl: './view-edit-unit.component.html',
  styleUrls: ['./view-edit-unit.component.css']
})
export class ViewEditUnitComponent {

  UnitFormGroup!: FormGroup;
  sfsFormGroup!: FormGroup;
  PropertyFormGroup!: FormGroup;
  AllotteeFormGroup!: FormGroup;
  UnitDataFormGroup!: FormGroup;
  sfsDataFormGroup!: FormGroup;
  PropertyDataFormGroup!: FormGroup;
  AllotteeDataFormGroup!: FormGroup;

  schemeId: any
  id!: any;
  totalunits: any;
  allunits: any;
  selectedTab: string = 'Unit';
  layoutBase64!: string;
  fieldMeasurementBookBase64!: string;

  FMBFilePath: any;
  LayoutFilePath: any;
  mode!: string | null;
  heading!: string;
  viewMode!: boolean;

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.schemeId = this.route.snapshot.paramMap.get('schemeId');
    this.mode = this.route.snapshot.paramMap.get('mode');
    this.id = this.route.snapshot.paramMap.get('id');

    this.heading = this.mode === "edit" ? "Edit Unit" : "View Unit";
    this.viewMode = this.mode !== "edit";

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
    this.fetchDataById();

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

  onUpdate() {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to update this Unit?',
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
          ...this.UnitFormGroup.value,
          ...this.sfsFormGroup.value,
          ...this.PropertyFormGroup.value,
          n_SCHEME_ID: this.schemeId,
          n_ID: this.id
        };
        console.log(unitData)
        this.http.updateUnitMasterData(unitData).subscribe(
          (response) => {
            console.log('Successfully updated unit data:', response);
            this.dialog.open(DialogMsgComponent, {
              data: {
                isSuccess: true,
                message: 'Unit data updated successfully!',
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

  fetchDataById() {
    this.http.viewUnitData(this.id)
      .subscribe((response) => {
        const data = response.data;
        console.log(data);
        this.UnitFormGroup.patchValue({
          n_ID: data.n_ID,
          v_UNIT_AC_NO: data.v_UNIT_AC_NO,
          v_DIVISION: data.v_DIVISION,
          v_SCHEME_NAME: data.v_SCHEME_NAME,
          v_TYPE_NAME: data.v_TYPE_NAME,
          v_ASSET_TYPE: data.v_ASSET_TYPE,
          v_MODE_OF_ALLOTMENT: data.v_MODE_OF_ALLOTMENT,
          v_UNIT_NO: data.v_UNIT_NO,
          v_BLOCK_NO: data.v_BLOCK_NO,
          v_FLOOR_NO: data.v_FLOOR_NO,
          v_FLAT_NO: data.v_FLAT_NO,
          v_PLINTH_AREA: data.v_PLINTH_AREA,
          v_UDS_AREA: data.v_UDS_AREA,
          gdq: data.gdq,
          v_RESERVATION_CATEGORY: data.v_RESERVATION_CATEGORY,
          v_PRIORITY: data.v_PRIORITY,
          v_UNIT_ALLOTTED_STATUS: data.v_UNIT_ALLOTTED_STATUS,
          v_CATEGORY: data.v_CATEGORY,
          v_DATE_OF_ALLOTMENT: data.v_DATE_OF_ALLOTMENT,
          v_UNIT_COST: data.v_UNIT_COST,
          v_FREEZED_DATE: data.v_FREEZED_DATE,
          v_INITIAL_DEPOSIT: data.v_INITIAL_DEPOSIT,
          v_EMI: data.v_EMI,
          v_EMI_START_DATE: data.v_EMI_START_DATE,
          v_UNIT_READY_DATE: data.v_UNIT_READY_DATE,
          v_PAYMENT_DUE_DATE: data.v_PAYMENT_DUE_DATE,
          v_SF_LOAN_SG: data.v_SF_LOAN_SG,
          v_AB_ISSUED_DATE: data.v_AB_ISSUED_DATE,
          v_LOAN_SANC_DATE: data.v_LOAN_SANC_DATE,
          v_UNIT_HANDING_OVER: data.v_UNIT_HANDING_OVER,
          v_PLOT_HANDING_OVER: data.v_PLOT_HANDING_OVER,
          v_ACTUAL_EXTENT: data.v_ACTUAL_EXTENT,
          v_ROAD_FACING: data.v_ROAD_FACING,
          v_CORNER_PLOT_STATUS: data.v_CORNER_PLOT_STATUS,
          v_DOOR_FACING: data.v_DOOR_FACING,
          v_LIVE_STATUS: data.v_LIVE_STATUS,
          v_RIPED_STATUS: data.v_RIPED_STATUS,
          v_FC_PAID_STATUS: data.v_FC_PAID_STATUS,
          v_DRAFT_DEED_ISSUED_ON: data.v_DRAFT_DEED_ISSUED_ON,
          v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED: data.v_FC_PAID_BUT_SALE_DEED_NOT_ISSUED,
          v_MC_DEMAND: data.v_MC_DEMAND,
          maintenance_DATE: data.maintenance_DATE,
          v_CAR_DEMAND: data.v_CAR_DEMAND,
          v_CAR_SLOT_1: data.v_CAR_SLOT_1,
          v_CAR_SLOT_2: data.v_CAR_SLOT_2,
          v_RIPED_BUT_COST_NOT_FULLY_PAID: data.v_RIPED_BUT_COST_NOT_FULLY_PAID,
          v_SALE_DEED_STATUS: data.v_SALE_DEED_STATUS,
          v_SALE_DEED_DATE: data.v_SALE_DEED_DATE,
        });

        this.FMBFilePath = data.v_FMB_FILE_FILEPATH;
        this.LayoutFilePath = data.v_LAYOUT_FILEPATH;

        this.sfsFormGroup.patchValue({
          v_UNIT_AC_NO: data.v_UNIT_AC_NO,
          v_1ST_AMOUNT_DUE: data.v_1ST_AMOUNT_DUE,
          v_1ST_AMOUNT_DUE_DATE: data.v_1ST_AMOUNT_DUE_DATE,
          v_2ST_AMOUNT_DUE: data.v_2ST_AMOUNT_DUE,
          v_2ND_AMOUNT_DUE_DATE: data.v_2ND_AMOUNT_DUE_DATE,
          v_3RD_AMOUNT_DUE: data.v_3RD_AMOUNT_DUE,
          v_3RD_AMOUNT_DUE_DATE: data.v_3RD_AMOUNT_DUE_DATE,
          v_4TH_AMOUNT_DUE: data.v_4TH_AMOUNT_DUE,
          v_4TH_AMOUNT_DUE_DATE: data.v_4TH_AMOUNT_DUE_DATE,
          v_5TH_AMOUNT_DUE: data.v_5TH_AMOUNT_DUE,
          v_5TH_AMOUNT_DUE_DATE: data.v_5TH_AMOUNT_DUE_DATE,
          v_6TH_AMOUNT_DUE: data.v_6TH_AMOUNT_DUE,
          v_6TH_AMOUNT_DUE_DATE: data.v_6TH_AMOUNT_DUE_DATE,
          v_7TH_AMOUNT_DUE: data.v_7TH_AMOUNT_DUE,
          v_7TH_AMOUNT_DUE_DATE: data.v_7TH_AMOUNT_DUE_DATE,
          v_8TH_AMOUNT_DUE: data.v_8TH_AMOUNT_DUE,
          v_8TH_AMOUNT_DUE_DATE: data.v_8TH_AMOUNT_DUE_DATE,
          v_9TH_AMOUNT_DUE: data.v_9TH_AMOUNT_DUE,
          v_9TH_AMOUNT_DUE_DATE: data.v_9TH_AMOUNT_DUE_DATE,
          v_10TH_AMOUNT_DUE: data.v_10TH_AMOUNT_DUE,
          v_10TH_AMOUNT_DUE_DATE: data.v_10TH_AMOUNT_DUE_DATE,
          v_11TH_AMOUNT_DUE: data.v_11TH_AMOUNT_DUE,
          v_11TH_AMOUNT_DUE_DATE: data.v_11TH_AMOUNT_DUE_DATE,
          v_12TH_AMOUNT_DUE: data.v_12TH_AMOUNT_DUE,
          v_12TH_AMOUNT_DUE_DATE: data.v_12TH_AMOUNT_DUE_DATE,
          v_13TH_AMOUNT_DUE: data.v_13TH_AMOUNT_DUE,
          v_13TH_AMOUNT_DUE_DATE: data.v_13TH_AMOUNT_DUE_DATE
        });
        this.PropertyFormGroup.patchValue({
          v_UNIT_AC_NO: data.v_UNIT_AC_NO,
          v_ALLOTMENT_REF: data.v_ALLOTMENT_REF,
          v_CURRENT_FILE_REF: data.v_CURRENT_FILE_REF,
          v_TYPE_DESC: data.v_TYPE_DESC,
          v_SCHEME_PLACE: data.v_SCHEME_PLACE,
          total_COST: data.total_COST,
          total_COST_WORDS: data.total_COST_WORDS,
          land_COST: data.land_COST,
          land_COST_WORDS: data.land_COST_WORDS,
          building_COST: data.building_COST,
          building_COST_WORDS: data.building_COST_WORDS,
          emd_RECEIPT_NO: data.emd_RECEIPT_NO,
          emd_PAID_DATE: data.emd_PAID_DATE,
          emd_PAID_AMOUNT: data.emd_PAID_AMOUNT,
          date_OF_HANDLING: data.date_OF_HANDLING,
          board_RESOLU_NO: data.board_RESOLU_NO,
          board_RESOLU_DATE: data.board_RESOLU_DATE,
          go_NO: data.go_NO,
          go_DATE: data.go_DATE,
          survey_NO: data.survey_NO,
          north_BOUNDARY: data.north_BOUNDARY,
          east_BOUNDARY: data.east_BOUNDARY,
          west_BOUNDARY: data.west_BOUNDARY,
          south_BOUNDARY: data.south_BOUNDARY,
          north_SCALING: data.north_SCALING,
          east_SCALING: data.east_SCALING,
          west_SCALING: data.west_SCALING,
          south_SCALING: data.south_SCALING,
          splay: data.splay,
          village: data.village,
          taluk: data.taluk,
          district: data.district,
          sub_REG_DESIG: data.sub_REG_DESIG,
          sub_REG_PLACE: data.sub_REG_PLACE,
          lc_AGREE_DATE: data.lc_AGREE_DATE,
          purpose_OF_DOC: data.purpose_OF_DOC,
        });

        this.AllotteeFormGroup.patchValue({
          v_UNIT_AC_NO: data.v_UNIT_AC_NO,
        });
        if (data.v_UNIT_ALLOTTED_STATUS === "Yes") {
          this.http.viewAllotteeData(this.id)
            .subscribe((response) => {
              const data = response.data;

              this.AllotteeFormGroup.patchValue({
                applicantName: data.applicantName,
                dateOfBirth: data.dateOfBirth,
                age: data.age,
                applicantSpouseName: data.applicantSpouseName,
                applicantFathersName: data.applicantFathersName,
                jointApplicantName: data.jointApplicantName,
                jointApplicantDOB: data.jointApplicantDOB,
                jointApplicantAge: data.jointApplicantAge,
                jointApplicantSpouseName: data.jointApplicantSpouseName,
                jointApplicantFathername: data.jointApplicantFathername,
                mobileNumber: data.mobileNumber,
                emailId: data.emailId,
                aadhaarNumber: data.aadhaarNumber,
                panNumber: data.panNumber,
                correspondenceAddress: data.correspondenceAddress,
                permanentAddress: data.permanentAddress,
                applicantMonthlyIncome: data.applicantMonthlyIncome,
                spouseMonthlyIncome: data.spouseMonthlyIncome,
                totalMonthlyIncome: data.totalMonthlyIncome,
                bankName: data.bankName,
                accountNumber: data.accountNumber,
                ifscCode: data.ifscCode,
                accountHolderName: data.accountHolderName,
                nativeOfTamilnadu_filepath: data.nativeOfTamilnadu_filepath,
                birthCertificate_filepath: data.birthCertificate_filepath,
                aadhaarProof_filepath: data.aadhaarProof_filepath,
                panProof_filepath: data.panProof_filepath,
                incomeCertificate_filepath: data.incomeCertificate_filepath,
                reservationCategoryProof_filepath: data.reservationCategoryProof_filepath,
                reservationSubCategoryProof_filepath: data.reservationSubCategoryProof_filepath,
                signature_filepath: data.signature_filepath,
                jointApplSignFilePath: data.jointApplSignFilePath,
                photo_filepath: data.photo_filepath
              });

              this.UnitFormGroup.patchValue({
                v_RESERVATION_CATEGORY: data.reservationCategory,
                v_PRIORITY: data.priorityBasis
              });

            });
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

  DeleteUnit() {
    const id = this.UnitFormGroup.get('n_ID')?.value;

    this.http.DeleteUnitMasterData(id).subscribe(
      (response: any) => {
        this.showSnackBar('Unit deleted successfully', 'green-snackbar');
        this.router.navigate(['/property/home/master-data', this.schemeId]);
      },
      (error: any) => {
        this.showSnackBar('Error deleting unit. Please try again later.', 'red-snackbar');
      }
    );
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