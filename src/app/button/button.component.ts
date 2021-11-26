import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() className!: string;
  @Input() value!: string;
  @Output() calculate = new EventEmitter();
  text: string = '';

  constructor() {}

  ngOnInit(): void {}

  handleClick(event: any) {
    this.text = event.target.textContent;
    this.calculate.emit({ text: this.text });
  }
}
