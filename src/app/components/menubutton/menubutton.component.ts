import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-menu-button',
  template: `
    <button class="menu-toggle-btn" (click)="toggleMenu.emit()">
      <span class="menu-icon">☰</span>
    </button>
  `,
  styles: [`
    .menu-toggle-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      padding: 8px;
      margin: 0;
      color: inherit;
    }

    .menu-toggle-btn:focus {
      outline: none;
    }

    .menu-icon {
      display: block;
      line-height: 1;
    }
  `],
  standalone: false
})
export class MenuButtonComponent {
  @Output() toggleMenu = new EventEmitter<void>();
}
