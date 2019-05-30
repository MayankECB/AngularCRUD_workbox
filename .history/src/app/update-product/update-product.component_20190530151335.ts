import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.css"]
})
export class UpdateProductComponent implements OnInit {
  id: number;
  data: object = {};
  products;
  productObj: object = {};
  exist: boolean = false;

  private headers = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  updateProduct(product) {
    debugger;
    this.productObj = {
      name: product.name,
      color: product.color
    };
    const url = `http://arihantvashisht.nagarro.local:9080/ProductStoreApp-war/ProductStoreController/Productstore/product/31`;
    console.log(url);
    this.http
      .put(url, JSON.stringify(this.productObj), {
        headers: this.headers
      })
      .toPromise()
      .then(() => {
        console.log(this.router.url);
        this.router.navigate(["/"]);
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params["id"];
    });
    this.http
      .get("http://localhost:5555/products")
      .subscribe((res: Response) => {
        this.products = res;
        for (var i = 0; i < this.products.length; i++) {
          if (parseInt(this.products[i].id) === this.id) {
            this.exist = true;
            this.data = this.products[i];
            break;
          } else {
            this.exist = false;
          }
        }
      });
  }
}
