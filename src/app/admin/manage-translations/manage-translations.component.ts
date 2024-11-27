import { Component, OnInit   } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; 


@Component({
  selector: 'app-manage-translations',
  standalone: true,
  templateUrl: './manage-translations.component.html',
  styleUrls: ['./manage-translations.component.css'],
  imports: [FormsModule, CommonModule],
})
export class ManageTranslationsComponent implements OnInit{
  private readonly apiUrl = 'http://localhost:3000/api/translations';

  sourceText: string = '';
  translatedText: string = '';
  sourceLanguage: string = '';
  targetLanguage: string = '';

  translations: any[] = [];
  editingTranslation: any = null;

  constructor(private authService: AuthService) {this.getTranslations();}
  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      console.log('Brak dostępu: użytkownik nie jest administratorem.');
      // caly czas wyswietla dla uzytkownika guard route najlepiej zrobic
    }
  }

  getTranslations(): void {
    fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Translations fetched successfully:', data);
        this.translations = data; // Przypisz dane do listy tłumaczeń
      })
      .catch((error) => {
        console.error('Error while fetching translations:', error);
      });
  }
  addTranslation(): void {
    const translation = {
      sourceText: this.sourceText,
      translatedText: this.translatedText,
      sourceLanguage: this.sourceLanguage,
      targetLanguage: this.targetLanguage,
    };

    fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(translation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Translation added successfully:', data);
        // Resetowanie formularza po dodaniu
        this.sourceText = '';
        this.translatedText = '';
        this.sourceLanguage = '';
        this.targetLanguage = '';
      })
      .catch((error) => {
        console.error('Error while adding translation:', error);
      });
  }
  editTranslation(translation: any): void {
    this.editingTranslation = { ...translation }; // Kopia edytowanego tłumaczenia
    this.sourceText = translation.sourceText;
    this.translatedText = translation.translatedText;
    this.sourceLanguage = translation.sourceLanguage;
    this.targetLanguage = translation.targetLanguage;
  }

  // Aktualizacja istniejącego tłumaczenia
  updateTranslation(): void {
    if (!this.editingTranslation) return;

    const updatedTranslation = {
      sourceText: this.sourceText,
      translatedText: this.translatedText,
      sourceLanguage: this.sourceLanguage,
      targetLanguage: this.targetLanguage,
    };

    fetch(`${this.apiUrl}/${this.editingTranslation._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTranslation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Translation updated successfully:', data);
        const index = this.translations.findIndex(
          (t) => t._id === this.editingTranslation._id
        );
        if (index !== -1) {
          this.translations[index] = data;
        }
        this.resetForm();
      })
      .catch((error) => {
        console.error('Error while updating translation:', error);
      });
  }

  // Resetowanie formularza
  resetForm(): void {
    this.sourceText = '';
    this.translatedText = '';
    this.sourceLanguage = '';
    this.targetLanguage = '';
    this.editingTranslation = null;
  }
  deleteTranslation(id: string): void {
    fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        console.log('Translation deleted successfully');
        // Usuń tłumaczenie z lokalnej listy
        this.translations = this.translations.filter((translation) => translation._id !== id);
      })
      .catch((error) => {
        console.error('Error while deleting translation:', error);
      });
  }
}
