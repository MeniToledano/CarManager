// import { Injectable } from '@angular/core';
// import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
// import {DialogResponseComponent} from '../car/dialog-response/dialog-response.component';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class DialogService {
//
//
//   constructor(public dialog: MatDialog) {
//   }
//
//   openModal(title: string, message: string, yes: () => void): any {
//     const dialogConfig = new MatDialogConfig();
//
//     dialogConfig.autoFocus = true;
//     dialogConfig.data = {
//       title,
//       message
//     };
//     dialogConfig.minWidth = 400;
//     dialogConfig.maxWidth = 400;
//
//
//     const dialogRef = this.dialog.open(DialogResponseComponent, dialogConfig);
//
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         if (yes) {
//           yes();
//         }
//       }
//     });
//   }
// }
