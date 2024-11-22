import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-translations',
  standalone: true,
  templateUrl: './manage-translations.component.html',
  styleUrls: ['./manage-translations.component.css'],
})
export class ManageTranslationsComponent {
  translations = [
    {
      sourceLanguage: 'en',
      targetLanguage: 'pl',
      sourceText: 'Hello',
      translatedText: 'Cześć',
    },
    {
      sourceLanguage: 'pl',
      targetLanguage: 'de',
      sourceText: 'Cześć',
      translatedText: 'Hallo',
    },
  ];

  addTranslation() {
    console.log('Dodaj tłumaczenie');
  }

  editTranslation(translation: any) {
    console.log('Edytuj tłumaczenie', translation);
  }

  deleteTranslation(translation: any) {
    console.log('Usuń tłumaczenie', translation);
    this.translations = this.translations.filter((t) => t !== translation);
  }
}
