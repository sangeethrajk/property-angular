import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSchemeComponent } from 'src/app/components/create-scheme/create-scheme.component';
import { HomeComponent } from './home.component';
import { ViewSchemesComponent } from 'src/app/components/view-schemes/view-schemes.component';
import { MasterDataComponent } from 'src/app/components/master-data/master-data.component';
import { FinanceDetailsComponent } from 'src/app/components/finance-details/finance-details.component';
import { CreateWebsiteComponent } from 'src/app/components/create-website/create-website.component';
import { ApplicationComponent } from 'src/app/components/application/application.component';
import { ApplicationListComponent } from 'src/app/components/application-list/application-list.component';
import { ApplicationFormComponent } from 'src/app/components/application-form/application-form.component';
import { CreateUnitComponent } from 'src/app/components/create-unit/create-unit.component';
import { PendingApplicationComponent } from 'src/app/components/pending-application/pending-application.component';
import { DocumentComponent } from 'src/app/components/document/document.component';
import { authGuard } from 'src/app/services/auth.guard';
import { ReportComponent } from 'src/app/components/report/report.component';
import { ViewEditSchemeComponent } from 'src/app/components/view-edit-scheme/view-edit-scheme.component';
import { ViewEditUnitComponent } from 'src/app/components/view-edit-unit/view-edit-unit.component';

const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'all-schemes', pathMatch: 'full' },
            { path: 'all-schemes', component: ViewSchemesComponent, canActivate: [authGuard] },
            { path: 'create-scheme', component: CreateSchemeComponent, canActivate: [authGuard] },
            { path: 'scheme/:mode/:id', component: ViewEditSchemeComponent, canActivate: [authGuard] },
            { path: 'create-unit/:id', component: CreateUnitComponent, canActivate: [authGuard] },
            { path: 'master-data/:id', component: MasterDataComponent, canActivate: [authGuard] },
            { path: ':schemeId/unit/:mode/:id', component: ViewEditUnitComponent, canActivate: [authGuard] },

            { path: 'website/:id', component: CreateWebsiteComponent, canActivate: [authGuard] },
            { path: 'finance/:id', component: FinanceDetailsComponent, canActivate: [authGuard] },
            { path: 'application', component: ApplicationComponent, canActivate: [authGuard] },
            { path: 'pending', component: PendingApplicationComponent, canActivate: [authGuard] },
            { path: 'application-list/:scheme', component: ApplicationListComponent, canActivate: [authGuard] },
            { path: 'applicationform/:id', component: ApplicationFormComponent, canActivate: [authGuard] },
            { path: 'document/:path', component: DocumentComponent, canActivate: [authGuard] },
            { path: 'report', component: ReportComponent, canActivate: [authGuard] },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
