import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Object }           from './tunes';
import { SOURCES }           from './tunes';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TunesService {
  constructor(private http: Http) { }
  public getTunes(): Observable<Object[]> {
      return this.http.get('https://bedtimetunes.restlet.net/v1/tuneses/')
          .map(res => res.json())
  }
}
