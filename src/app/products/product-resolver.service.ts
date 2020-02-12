import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';

import { ProductResolved } from './product';
import { ProductService } from './product.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of({product: null, error: message});
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({product: product})),
        catchError(err => {
          const message = `Retrieval error: ${err}`;
          console.error(message);
          return of({product: null, error: message});
        })
      );
  }
}
