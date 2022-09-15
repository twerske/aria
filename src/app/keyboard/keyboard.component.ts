import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PianoKeyComponent } from './piano-key.component';
import { Note, OCTAVE, playNote } from '../musical';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [
    CommonModule,
    PianoKeyComponent
  ],
  template: `
    <app-piano-key *ngFor="let note of notes" [note]="note" (playKey)="playKey($event)"></app-piano-key>
  `,
  styles: [`
    :host {
      display: block;
      text-align: center;
    }
  `]
})
export class KeyboardComponent {
  notes = OCTAVE;
  audioContext: AudioContext;
  
  constructor() {
    this.audioContext = new (window.AudioContext)();
  }

  playKey(note: Note) {
    playNote(note, this.audioContext);
  }
}
