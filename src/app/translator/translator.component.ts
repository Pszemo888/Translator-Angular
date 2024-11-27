
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {
  sourceText: string = '';
  translatedText: string = '';
  sourceLanguage: string = '';
  targetLanguage: string = '';

  private readonly apiUrl = 'http://localhost:3000';
  private readonly authToken = ''; // Zmień na dynamiczne pobieranie tokena, jeśli to konieczne

  constructor() {}

  public fetchTranslation(): void {
    if (!this.sourceText || !this.sourceLanguage || !this.targetLanguage) {
      console.error('Brak wymaganych danych do tłumaczenia!');
      return;
    }

    fetch(`${this.apiUrl}/api/translations/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`, // Dodaj autoryzację, jeśli wymagana
      },
      body: JSON.stringify({
        sourceText: this.sourceText,
        sourceLanguage: this.sourceLanguage,
        targetLanguage: this.targetLanguage,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.translatedText = data.translatedText;
        console.log('Tłumaczenie zapisane:', data);
      })
      .catch((error) => {
        console.error('Error while fetching translation:', error);
      });
  }
}