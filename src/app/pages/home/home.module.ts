import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ViewSchemesComponent } from 'src/app/components/view-schemes/view-schemes.component';
import { CreateSchemeComponent } from 'src/app/components/create-scheme/create-scheme.component';
import { MasterDataComponent } from 'src/app/components/master-data/master-data.component';
import { DialogMsgComponent } from 'src/app/components/dialog-msg/dialog-msg.component';
import { CreateWebsiteComponent } from 'src/app/components/create-website/create-website.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FinanceDetailsComponent } from 'src/app/components/finance-details/finance-details.component';
import { MatIconModule } from '@angular/material/icon';
import { ApplicationListComponent } from 'src/app/components/application-list/application-list.component';
import { ApplicationComponent } from 'src/app/components/application/application.component';
import { ApplicationFormComponent } from 'src/app/components/application-form/application-form.component';
import { CreateUnitComponent } from 'src/app/components/create-unit/create-unit.component';
import { PendingApplicationComponent } from 'src/app/components/pending-application/pending-application.component';
import { DocumentComponent } from 'src/app/components/document/document.component';
import { ViewEditSchemeComponent } from 'src/app/components/view-edit-scheme/view-edit-scheme.component';
import { ViewEditUnitComponent } from 'src/app/components/view-edit-unit/view-edit-unit.component';

@NgModule({
    declarations: [
        ViewSchemesComponent,
        CreateSchemeComponent,
        HomeComponent,
        MasterDataComponent,
        DialogMsgComponent,
        FinanceDetailsComponent,
        CreateWebsiteComponent,
        ApplicationListComponent,
        ApplicationComponent,
        ApplicationFormComponent,
        CreateUnitComponent,
        PendingApplicationComponent,
        DocumentComponent,
        ViewEditSchemeComponent,
        ViewEditUnitComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatChipsModule,
        MatIconModule,
    ]
})
export class HomeModule { }
