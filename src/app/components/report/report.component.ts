import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  allUnitData: any;
  uniqueSchemeCodes: any;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getAllUnitData();
  }

  getAllUnitData() {
    this.httpService.getAllUnitData().subscribe(
      (response: any) => {
        console.log("Get all unit data response : ", response.data);
        this.allUnitData = response.data;
        this.uniqueSchemeCodes = this.getUniqueSchemeCodes(this.allUnitData);
      },
      (error: any) => {
        console.error("Error in getting all unit data", error);
      }
    );
  }

  getUniqueSchemeCodes(data: any[]): string[] {
    // Use a Set to store unique scheme codes
    const uniqueSchemeCodesSet = new Set<string>();

    // Iterate through the data and add scheme codes to the Set
    data.forEach((unit) => {
      if (unit.v_SCHEME_CODE) {
        uniqueSchemeCodesSet.add(unit.v_SCHEME_CODE);
      }
    });
    console.log(uniqueSchemeCodesSet);
    // Convert the Set to an array
    return Array.from(uniqueSchemeCodesSet);
  }
}
