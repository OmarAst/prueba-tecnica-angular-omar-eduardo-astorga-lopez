import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'multiple-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multiple-select.component.html',
})
export class MultipleSelectComponent implements AfterViewInit {

  @Input() options: string[] = [];
  @Input() tipo?: string;
  @Input() selectId: string = 'multiSelect'; // ID del select, por defecto 'multiSelect'
  @Output() selectedOptions: string[] = [];
  @Output() selectedOptionsChange = new EventEmitter<string[]>();

  ngAfterViewInit() {
    // Llamado después de la vista inicial para aplicar estilos si es necesario
    this.applyCustomStyles();
  }

  getSelectedItems() {
    return this.selectedOptions;
  }

  onOptionClick(event: MouseEvent) {
    const target = event.target as HTMLOptionElement;
    if (target && target.tagName === 'OPTION') {
      const value = target.value;
      // Actualizar selectedOptions: eliminar si ya existe, agregar si no existe
      if (this.selectedOptions.includes(value)) {
        this.selectedOptions = this.selectedOptions.filter(item => item !== value);
      } else {
        this.selectedOptions = [...this.selectedOptions, value];
      }

      this.applyCustomStyles();
      this.selectedOptionsChange.emit(this.selectedOptions);
      this.removeFocus();
    }
  }

  removeFocus() {
    const selectElement = document.getElementById(this.selectId) as HTMLSelectElement;
    if (selectElement) {
      selectElement.blur(); // Remove focus from the select element
    }
  }

  isSelected(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  private applyCustomStyles() {
    if (typeof document === 'undefined') {
      return;
    }

    const selectElement = document?.getElementById(this.selectId) as HTMLSelectElement;
    if (selectElement) {
      Array.from(selectElement.options).forEach(option => {
        if (this.selectedOptions.includes(option.value)) {
          option.classList.add('bg-primary');
          option.classList.remove('bg-white');
        } else {
          option.classList.add('bg-white');
          option.classList.remove('bg-primary');
        }
      });
    }
  }
}
