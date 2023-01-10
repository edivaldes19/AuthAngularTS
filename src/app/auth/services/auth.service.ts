import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _baseUrl: string = environment.baseUrl
  private _usuario!: Usuario
  public get usuario(): Usuario {
    return { ...this._usuario }
  }
  constructor(private http: HttpClient) { }
  login(email: string, password: string): Observable<any> {
    const url: string = `${this._baseUrl}/auth/login`
    const body = { email, password }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => { if (resp.ok) this.saveInBrowser(resp) }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
  create(name: string, email: string, password: string): Observable<any> {
    const url: string = `${this._baseUrl}/auth/register`
    const body = { name, email, password }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => { if (resp.ok) this.saveInBrowser(resp) }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
  validarToken(): Observable<boolean> {
    const url: string = `${this._baseUrl}/auth/renew`
    const headers = new HttpHeaders()
      .set('token', localStorage.getItem('token') ?? '')
    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map(resp => {
          this.saveInBrowser(resp)
          return resp.ok
        }),
        catchError(err => of(false))
      )
  }
  saveInBrowser(resp: AuthResponse) {
    console.log(resp)
    localStorage.setItem('token', resp.token!)
    this._usuario = {
      uid: resp.uid!,
      email: resp.email!,
      name: resp.name!
    }
  }
  logout() {
    localStorage.clear()
  }
}