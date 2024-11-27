import { Routes } from '@angular/router';
import { TranslatorComponent } from './translator/translator.component';
import { HistoryComponent } from './history/history.component';
import { ManageTranslationsComponent } from './admin/manage-translations/manage-translations.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    { path: 'translator', component: TranslatorComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'admin/manage', component: ManageTranslationsComponent },
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: RegisterComponent},
    { path: '**', redirectTo: '' },
];
