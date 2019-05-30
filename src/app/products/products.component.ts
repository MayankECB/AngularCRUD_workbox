import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  productObj: object = {};
  confirmationString: string = "New PRoduct Added";
  isAdded: boolean = false;

  addNewProduct = function(product) {
    this.productObj = {
      name: product.name,
      color: product.color
    };
    this.http
      .post("http://localhost:5555/products/", this.productObj)
      .subscribe((res: Response) => {
        this.isAdded = true;
        this.router.navigate(["/"]);
      });
    // .catch((err: HttpErrorResponse) => {
    //   // simple logging, but you can do a lot more, see below
    //   console.error(
    //     "----An error occurred while adding new product :",
    //     err.error
    //   );
    // })
  };

  ngOnInit() {}
}
