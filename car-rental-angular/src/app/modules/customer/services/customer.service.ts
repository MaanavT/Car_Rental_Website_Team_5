import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { StorageService } from '../../../auth/components/services/storage/storage.service'


const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllCars(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/cars`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/customer/car/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  bookACar(bookACar: any): Observable<any> {
    return this.http.post(`${BASIC_URL}/api/customer/car/book`, bookACar, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getBookingsByUserId(): Observable<any> {
    const userId = Number(StorageService.getUserId()) || 0; 
    if (userId === 0) {
      console.error('User ID not found in storage!');
      throw new Error('User ID not found in storage!');
    }

    return this.http.get(`${BASIC_URL}/api/customer/car/bookings/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();

    if (!token) {
      console.error('Authorization token not found!');
      throw new Error('Authorization token not found!');
    }

    return authHeaders.set('Authorization', `Bearer ${token}`);
  }
}
