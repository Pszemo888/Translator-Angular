import { Routes } from '@angular/router';
import { TranslatorComponent } from './translator/translator.component';
import { HistoryComponent } from './history/history.component';
import { ManageTranslationsComponent } from './admin/manage-translations/manage-translations.component';


export const routes: Routes = [
    { path: '', component: TranslatorComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'admin/manage', component: ManageTranslationsComponent },
    { path: '**', redirectTo: '' },
];
