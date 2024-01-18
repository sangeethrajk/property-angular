import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {

  filepath:any;

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
    private router: Router,
    private route : ActivatedRoute,
    private sanitizer: DomSanitizer) { }

    ngOnInit() {

    this.filepath= this.route.snapshot.paramMap.get('path')!;
    }

  openFile(filePath: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(filePath);
  }

  Verify(){

  }

}
