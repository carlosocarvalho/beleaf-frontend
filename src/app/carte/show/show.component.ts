import { ErrorDialogComponent, ErrorDialogService } from './../../shared/error-dialog.service';
import { environment } from './../../../environments/environment';
import { CarteService } from './../services/carte.service';
import { ProductModel } from './../../components/product/ProductModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  product: ProductModel

  constructor(
    private provider: CarteService,
    private router: ActivatedRoute,
    private route: Router,
    private handlerError: ErrorDialogService) { }

  ngOnInit() {
    this.router.params.subscribe(param => {
      const { id } = param
      if (!id) return this.route.navigate(['/'])
      this.provider.find(id).subscribe((data: ProductModel) => this.product = data)
    })

  }

  get image() {
    return `${environment.api}products/images/${this.product.image}`
  }

  buy() {
    this.handlerError.openDialog({
      message: 'Desculpe, esse recurso ainda foi criado, mas quem sabe em breve.',
      status: 403
    })
  }
}
