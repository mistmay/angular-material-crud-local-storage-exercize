import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductListService } from 'src/app/services/product-list.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/dialog/dialog.component';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})
export class MainTableComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private productlist: ProductListService, private dialog: MatDialog) {
    this.productlist.somethingChanged.subscribe(() => {
      this.updateTable();
    });
  }

  ngOnInit(): void {
    this.productlist.productList = JSON.parse(localStorage.getItem('productList') || "");
    this.productlist.index = this.productlist.productList.length;
    this.updateTable();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateTable(): void {
    this.dataSource = new MatTableDataSource(this.productlist.productList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getArrayLength(): boolean {
    if (this.productlist.index === 0) {
      return true;
    } else {
      return false;
    }
  }

  editProduct(row: any): void {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    });
  }

  deleteProduct(index: number): void {
    this.productlist.productList.splice(index, 1);
    for (let i: number = index; i < this.productlist.productList.length; i++) {
      this.productlist.productList[i].id--;
    }
    this.productlist.index--;
    localStorage.setItem('productList', JSON.stringify(this.productlist.productList));
    this.updateTable();
  }

}
