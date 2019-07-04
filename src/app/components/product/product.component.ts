import { ErrorDialogService } from './../../shared/error-dialog.service';
import { CarteService } from './../../carte/services/carte.service';
import { environment } from './../../../environments/environment';
import { ProductModel } from './ProductModel';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'beleaf-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: ProductModel
  @Input() enableDelete: boolean

  inLoading = false


  constructor(private readonly provider: CarteService,
    private readonly handlerError: ErrorDialogService) { }

  ngOnInit() {

  }
  get image() {
    return `${environment.api}products/images/${this.product.image}`
  }

  getPriceOrWithDiscount() {

    if (Number(this.product.discount) === 0) {

      return this.product.price;
    }

    return this.product.withDiscount
  }


  onDelete(): void {
    if (confirm("Deseja apagar esse item ?")) {
      this.provider.destroy(this.product.id).subscribe((data) => {

        this.handlerError.openDialog({
          message: `A operacao foi concluida com sucesso.`,

           status: 200
        })
      })
    }
  }
}
