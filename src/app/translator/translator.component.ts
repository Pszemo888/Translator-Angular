import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [],
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {
  translatedText: string = ''; 
  translateText(event: Event) {
    event.preventDefault(); 

    const form = event.target as HTMLFormElement;
    const sourceTextInput = form.querySelector('#sourceText') as HTMLTextAreaElement;

    const sourceText = sourceTextInput.value.trim();
    if (sourceText) {
      this.translatedText = `Przetłumaczony tekst: ${sourceText}`;
    } else {
      alert('Proszę wpisać tekst do tłumaczenia.');
    }
  }
}
