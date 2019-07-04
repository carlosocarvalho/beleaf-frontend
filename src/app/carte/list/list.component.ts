import { AuthService, AuthServiceToken } from './../../user/services/auth.service';
import { CarteService } from './../services/carte.service';
import { ProductModel } from './../../components/product/ProductModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from '../services/Pagination';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  data: Pagination = new Pagination
  limit = 5
  page = 1
  pageCount = 0
  totalItems = 0
  loading = false
  isAuthenticated = false
  loaded = false
  constructor(
    private provider: CarteService,
    private router: ActivatedRoute,
    private readonly authService: AuthService) { }

  ngOnInit() {
    this.authService.credentials().subscribe(change => {

      this.credentialsProfileInitialize()
    })
    this.credentialsProfileInitialize()
    this.getProducts()
    this.provider.onChangeObservable().subscribe(b => {

      if (b === true) {
        this.page = 1
        this.getProducts()
      }
    })

  }

  getProducts() {
    this.loading = true
    this.loaded = false
    this.provider.pagination(this.page || 1, this.limit)
      .pipe(
        tap((data: Pagination) => {
          this.totalItems = data.totalItems
        }),
        finalize(() => {
          this.loading = false
          this.loaded = true
        })

      )
      .subscribe((data: Pagination) => this.data = data)

  }

  prevPage() {
    this.page -= 1
    this.getProducts()
  }

  nextPage() {
    this.page += 1
    this.getProducts()
  }

  goToPage(n: number) {
    this.page = n
    this.getProducts()
  }

  credentialsProfileInitialize() {
    this.authService.attempt().subscribe((data: AuthServiceToken) => {

      if (data && data.token !== '') {
        return this.isAuthenticated = true
      }
      this.isAuthenticated = false
    })
  }
}


