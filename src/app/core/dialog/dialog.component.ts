import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category, Freshness } from 'src/app/models/product';
import { ProductListService } from 'src/app/services/product-list.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  dialogTitle: string = 'Add Product';
  actionBtn: string = 'Save';
  productCategories: Category[] = ['Fruits', 'Vegetables', 'Electronics'];
  freshnessList: Freshness[] = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;;

  constructor(private formBuilder: FormBuilder, private productlist: ProductListService, private dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    });
    if (this.editData) {
      this.actionBtn = 'Update';
      this.dialogTitle = 'Edit Product';
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      if (!this.editData) {
        this.productlist.productList.push({ ...this.productForm.value, id: this.productlist.index });
        this.productlist.index++;
        localStorage.setItem('productList', JSON.stringify(this.productlist.productList));
        this.productlist.somethingChanged.emit();
        this.productForm.reset();
        this.dialogRef.close('save');
      } else {
        this.updateProduct();
      }
    } else {
      alert('Error: Fill All Inputs!');
    }
  }

  updateProduct(): void {
    this.productlist.productList[this.editData.id] = { ...this.productForm.value, id: this.editData.id };
    localStorage.setItem('productList', JSON.stringify(this.productlist.productList));
    this.productlist.somethingChanged.emit();
    this.productForm.reset();
    this.dialogRef.close('update');
  }

}
