import { Component } from '@angular/core';
import { row1, row2, row3, row4, row5, buttonInterface } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  row1: Array<buttonInterface> = row1;
  row2: Array<buttonInterface> = row2;
  row3: Array<buttonInterface> = row3;
  row4: Array<buttonInterface> = row4;
  row5: Array<buttonInterface> = row5;

  title = 'Calculator';
  display: string = '';

  calculate({ text }: { text: string }) {
    if (text == 'clear') this.clear();
    else if (text == 'DEL') this.del();
    else if (text == '=') this.doCalculation();
    else this.display = this.display + text;
  }

  clear(): void {
    this.display = '';
  }

  del(): void {
    this.display = this.display.slice(0, -1);
  }

  doCalculation(): void {
    var flag = Number(this.display);

    if (!isNaN(flag)) {
      this.display = 'Select an operation';
      setTimeout(() => {
        this.display = '';
      }, 1000);
    } else if (this.display.indexOf('%') != -1) {
      const temp = this.display.split('%');
      let mod: string | number = Number(temp[0]) % Number(temp[1]);
      mod = mod.toString();
      this.display = mod;
    } else {
      let sum: number | string = 0;
      const arr1: Array<String | Number> = this.display.split(/[\+\*\/-]+/);
      const arr2: Array<String | Number> = this.display.split(/[\d"\. ]*/);
      arr2.pop();
      arr2.shift();

      while (arr2.length > 0) {
        let div = arr2.indexOf('/');
        let mul = arr2.indexOf('*');
        let add = arr2.indexOf('+');
        let sub = arr2.indexOf('-');
        if (div != -1) {
          sum = Number(arr1[div]) / Number(arr1[div + 1]);
          arr1[div] = sum;
          arr1.splice(div + 1, 1);
          arr2.splice(div, 1);
          div = arr2.indexOf('/');
          mul = arr2.indexOf('*');
          add = arr2.indexOf('+');
          sub = arr2.indexOf('-');
        }
        if (mul != -1) {
          sum = Number(arr1[mul]) * Number(arr1[mul + 1]);
          arr1[mul] = sum;
          arr1.splice(mul + 1, 1);
          arr2.splice(mul, 1);
          div = arr2.indexOf('/');
          mul = arr2.indexOf('*');
          add = arr2.indexOf('+');
          sub = arr2.indexOf('-');
        }

        if (add != -1) {
          sum = Number(arr1[add]) + Number(arr1[add + 1]);
          arr1[add] = sum;
          arr1.splice(add + 1, 1);
          arr2.splice(add, 1);
          div = arr2.indexOf('/');
          mul = arr2.indexOf('*');
          add = arr2.indexOf('+');
          sub = arr2.indexOf('-');
        }

        if (sub != -1) {
          sum = Number(arr1[sub]) - Number(arr1[sub + 1]);
          arr1[sub] = sum;
          arr1.splice(sub + 1, 1);
          arr2.splice(sub, 1);
        }
      }
      sum = sum.toString();
      this.display = sum;
    }
  }
}
