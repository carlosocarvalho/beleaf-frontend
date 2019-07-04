import { Pagination } from './Pagination';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductModel } from './../../components/product/ProductModel';
import { environment } from './../../../environments/environment';
import { toFormData } from 'src/app/helpers';
import { tap } from 'rxjs/operators';


const HttpUploadOptions = {
  headers: new HttpHeaders({
    "Content-Type": 'undefined'
  })
}
@Injectable({
  providedIn: 'root'
})
export class CarteService {

  private readonly api = `${environment.api}products/`

  private updateOnList = new BehaviorSubject(false)

  constructor(private http: HttpClient) { }

  onChangeObservable(): Observable<boolean> {
    return this.updateOnList.asObservable()
  }
  public find(id?: string) {
    return this.http.get(`${environment.api}products${id ? '/' + id : ''}`);
  }
  public pagination(currentPage?: number, setLimit?: number): Observable<Pagination> {
    const page = currentPage || 1
    const limit = setLimit || 5
    return this.http
      .get(`${environment.api}products`, {
        params: { page, limit }
      })//.map(data => new Pagination(data))
  }
  create(data) {
    const f = toFormData(data)
    const headers = new HttpHeaders({});
    const request = this.http.request(`POST`, this.api,
      {
        body: f,
        headers: headers,
        reportProgress: true,
        observe: 'events',
      }).pipe(tap((data) => {
        this.updateOnList.next(true)
      }))
    return request
  }

  destroy(id) {
    return this.http.delete(`${this.api}${id}`)
      .pipe(tap((data) => {
        this.updateOnList.next(true)
      }))
  }

  upload(files: Set<File>) {
    const formData = new FormData()
    files.forEach((file => formData.append('file', file, file.name)))

    const request = new HttpRequest('POST', `${this.api}upload`, formData)
    return this.http.request(request).pipe(tap((data) => {
      this.updateOnList.next(true)
    }))
  }
}
