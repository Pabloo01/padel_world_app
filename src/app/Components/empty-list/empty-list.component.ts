import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss'],
})
export class EmptyListComponent {

  @Input() length: any;
  @Input() img: string;
  @Input() msg: string;
}
