import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogMsgComponent } from '../dialog-msg/dialog-msg.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})

export class ApplicationFormComponent {

  unitDetailsForm!: FormGroup;
  applicantForm!: FormGroup;
  bankDetailsForm!: FormGroup;
  paymentForm!: FormGroup;
  documentForm!: FormGroup;
  showPopup = false;
  id:any;
  ApplData:any
  documentList!: { name: string; path: string; status: any; }[];

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private dialog: MatDialog,
    private router: Router,
    private route : ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.unitDetailsForm = this.formBuilder.group({
      unitAccountNo: [''],
      unitType: [''],
      modeOfAllotment: [''],
      cityRural: [''],
      circle: [''],
      scheme: [''],
      type: [''],
      blockNo: [''],
      floorNo: [''],

      unitNo: [''],
      plotUdsArea: [''],
      plinthArea: [''],
      reservationCategory: [''],
      priorityBasis: [''],
      costOfUnit: ['']
    });

    this.applicantForm = this.formBuilder.group({
      applicantName: ['', Validators.required],
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
      totalMonthlyIncome: ['']
    });

    this.bankDetailsForm = this.formBuilder.group({
      bankName: [''],
      accountNumber: [''],
      ifscCode: [''],
      accountHolderName: ['']
    });

    this.paymentForm = this.formBuilder.group({
      applicationFee: [''],
      registrationFee: [''],
      amountPaid: [''],

    });

    this.documentForm = this.formBuilder.group({
      nativecertificate: [''],
      birthcertificate: [''],
      aadhar: [''],
      pan: [''],
      incomecertificate: [''],
      maincategorycertificate:[''],
      subcategorycertificate: [''],
      signature: [''],
      joinapplsignature:[''],
      photo:[''],
      nativecertificatestatus: [''],
      birthcertificatestatus: [''],
      aadharstatus: [''],
      panstatus: [''],
      incomecertificatestatus: [''],
      maincategorycertificatestatus:[''],
      subcategorycertificatestatus: [''],
      signaturestatus: [''],
      joinapplsignaturestatus:[''],
      photostatus:['']

    });

    this.id= this.route.snapshot.paramMap.get('id')!;

    this.httpService.getApplform(this.id).subscribe((response: any) => {
    if (response && response.status === 1 && response.data) {
      console.log(response.data)
      this.ApplData = response.data
      const data = response.data;

      this.unitDetailsForm.patchValue({
      unitAccountNo: data.unitAccountNo,
      unitType: data.unitType,
      modeOfAllotment: data.modeOfAllotment,
      cityRural: data.cityRural,
      circle: data.circle,
      scheme: data.scheme,
      type: data.type,
      blockNo: data.blockNo,
      floorNo: data.floorNo,

      unitNo: data.unitNo,
      plotUdsArea: data.plotUdsArea,
      plinthArea: data.plinthArea,
      reservationCategory: data.reservationCategory,
      priorityBasis: data.priorityBasis,
      costOfUnit: data.costOfUnit
    });


    this.applicantForm.patchValue({
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
      totalMonthlyIncome: data.totalMonthlyIncome
    });


    this.bankDetailsForm.patchValue({
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      ifscCode: data.ifscCode,
      accountHolderName: data.accountHolderName
    });

    this.paymentForm.patchValue({
      applicationFee: data.applicationFee,
      registrationFee: data.registrationFee,
      amountPaid: data.amountPaid,
    });

    this.documentForm.patchValue({
      nativecertificate: data.nativeOfTamilnadu_filepath,
      birthcertificate: data.birthCertificate_filepath,
      aadhar: data.aadhaarProof_filepath,
      pan: data.panProof_filepath,
      incomecertificate: data.incomeCertificate_filepath,
      maincategorycertificate: data.reservationCategoryProof_filepath,
      subcategorycertificate: data.reservationSubCategoryProof_filepath,
      signature: data.signature_filepath,
      joinapplsignature : data.jointApplSignFilePath,
      photo:data.photo_filepath,

      nativecertificatestatus: data.nativeOfTamilnadu_status,
      birthcertificatestatus: data.birthCertificate_status,
      aadharstatus: data.aadhaarProof_status,
      panstatus: data.panProof_status,
      incomecertificatestatus: data.incomeCertificate_status,
      maincategorycertificatestatus: data.reservationCategoryProof_status,
      subcategorycertificatestatus: data.reservationSubCategoryProof_status,
      signaturestatus: data.signature_status,
      joinapplsignaturestatus : data.jointApplSign_status,
      photostatus:data.photo_status
    });

    this.documentList = [
      { name: 'Native Certificate',
      path: this.documentForm.value.nativecertificate, status: this.documentForm.value.nativecertificatestatus },
      { name: 'Birth Certificate',
      path: this.documentForm.value.birthcertificate, status: this.documentForm.value.birthcertificatestatus },
      { name: 'Aadhar',
      path:this.documentForm.value.aadhar , status: this.documentForm.value.aadharstatus },
      { name: 'Pan Proof',
      path: this.documentForm.value.pan, status: this.documentForm.value.panstatus },
      { name: 'Income Certificate',
      path:this.documentForm.value.incomecertificate, status: this.documentForm.value.incomecertificatestatus },
      { name: 'Proof of Reservation Main Category',
      path:this.documentForm.value.maincategorycertificate, status: this.documentForm.value.maincategorycertificatestatus },
      { name: 'Proof of Reservation Sub Category',
      path: this.documentForm.value.subcategorycertificate, status: this.documentForm.value.subcategorycertificatestatus },
      { name: 'Signature',
      path: this.documentForm.value.signaturestatus, status: this.documentForm.value.signaturestatus },
      { name: 'Joint Applicant Signature',
      path: this.documentForm.value.joinapplsignature, status: this.documentForm.value.joinapplsignaturestatus },
      { name: 'Photo',
       path:this.documentForm.value.photo , status: this.documentForm.value.photostatus },

    ];

  }
  });



}


// openFileInNewTab(filePath: string): string {
//   return 'file://' + filePath;
// }

openFileInNewTab(filePath: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl('file://' + filePath);
}



togglePopup(): void {
  this.showPopup = !this.showPopup;
}

closePopup(): void {
  this.showPopup = false;
}


accept(): void {
this.showPopup = false;
this.ApplData.status = "Approved";
this.httpService.saveApplform(this.ApplData).subscribe((response: any) => {
if (response && response.status === 1 && response.data) {
    console.log(response.data)
    this.httpService.saveAllottee(this.ApplData).subscribe((response: any) => {
      if (response && response.status === 1 && response.data) {
        console.log("Allottee Added")
      }},
      (error) => {
        console.log(error)
      })
    const requestBody = {
      schemeId: this.ApplData.schemeNId,
      unitId: this.ApplData.unitNId,
      category: this.ApplData.reservationCategory,
      subcategory: this.ApplData.priorityBasis,
      status: "accept",
      reservation: "Reservation"
    };
  this.httpService.listreduce(requestBody).subscribe(
      (response: any) => {
        if (response && response.status === 1 && response.data) {
          console.log(response.data);
        }
      },
      (error) => {
        console.log(error)
      }
    );
    this.openDialog(true, 'Application Accepted Successfully!','/property/home/application');
  }});

}

reject(): void {
  this.showPopup = false;
  this.ApplData.status = "Rejected";
  this.httpService.saveApplform(this.ApplData).subscribe((response: any) => {
    if (response && response.status === 1 && response.data) {
    console.log(response.data)
    const requestBody = {
      schemeId: this.ApplData.schemeNId,
      unitId: this.ApplData.unitNId,
      category: this.ApplData.reservationCategory,
      subcategory: this.ApplData.priorityBasis,
      status: "reject",
      reservation: "Reservation"
    };
  this.httpService.listreduce(requestBody).subscribe(
      (response: any) => {
        if (response && response.status === 1 && response.data) {
          console.log(response.data);
        }
      },
      (error) => {
        console.log(error)
      }
    );
    this.openDialog(true, 'Application Rejected Successfully!' ,'/property/home/application' );
  }});

}


openDialog(isSuccess: boolean, message: string ,routerLink:string ) {
  const dialogRef = this.dialog.open(DialogMsgComponent, {
    width: '400px',
    data: { isSuccess, message ,routerLink}
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}

getStatusStyle(status: string): { [key: string]: string } {
  switch (status) {
    case null:
      return { 'background-color': 'rgba(212, 192, 8, 1)' , 'color':'white'  };
    case 'Verified':
      return { 'background-color': 'rgba(78, 180, 31, 1)' , 'color':'white' };

    default:
      return {};
  }
}

}


