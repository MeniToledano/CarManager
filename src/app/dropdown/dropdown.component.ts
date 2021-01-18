import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit, OnChanges {
  itemName: any;
  @Input() itemId: number;
  @Output() chosenItem: EventEmitter<number> = new EventEmitter<number>();
  @Input() items: any[];
  @Output() touch: EventEmitter<boolean> = new EventEmitter<boolean>();
  item: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setDefaultVal();
  }

  ngOnInit(): void {
  }

  onClickItem(item: any): void {
    this.item = item.getId();
    console.log(this.item);
    console.log(item.getId());
    console.log(item);
    this.chosenItem.emit(item.getId());
    //this.itemName = this.chosenItem;
  }

  private setDefaultVal(): void {
    this.items.forEach(item => {
      if (item.getId() === this.itemId) {
        this.itemName = item.toString();
      }
    });
    if (!this.itemName) {
      this.itemName = 'None';
    }
  }

  onClick(): void {
    this.touch.emit(true);
  }
}
