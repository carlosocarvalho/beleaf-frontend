import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = environment.api;
  private readonly keyName = environment.tokenKey;
  private changeProfiler = new Subject<AuthServiceToken>();

  constructor(
    private readonly http: HttpClient,
    private readonly storage: LocalStorage) { }

  credentials(): Observable<AuthServiceToken | null> {
    return this.changeProfiler.asObservable()
  }

  public async create(data): Promise<boolean> {
    return await new Promise((resolve, reject) => {
      this.http.post(`${this.api}users`, data)
        .pipe(
          catchError((e) => {
            reject(false)
            return throwError(e)
          })
        )
        .subscribe((data: AuthServiceToken) => {
          this.logout().subscribe(c => {
            resolve(true)
          })
        })
    })
  }
  login(username: string, password: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

      this.http.post(`${this.api}users/authentication`, {
        username, password
      })
        .pipe(
          catchError((e) => {
            reject(false)
            return throwError(e)
          })
        )
        .subscribe((data: AuthServiceToken) => {
          this.logout().subscribe(c => {
            this.setAttempt(data).subscribe(b => {
              resolve(true)
            });
          })
        })
    })
  }

  setAttempt(data: AuthServiceToken): Observable<boolean> {
    return this.storage.setItem(this.keyName, JSON.stringify(data))
      .pipe(tap(d => {
        this.changeProfiler.next(data)
      }))
  }

  logout() {
    return this.storage.removeItem(this.keyName).pipe(tap(d => {

      this.changeProfiler.next(null)
    }))
  }
  attempt(): Observable<AuthServiceToken | HttpEvent<any> | any> {
    return this.storage.getItem(this.keyName).pipe(
      map((data: any) => {
        if (!data) return data;
        return JSON.parse(data)
      })
    )
  }



}


export interface AuthServiceToken {

  id: string

  token: string;

  username: string;

  email: string;

  fullName?: string;

  birthDay?: string;

}

export class AuthModel implements AuthServiceToken {
  id: string

  token: string;

  username: string;

  email: string;

}