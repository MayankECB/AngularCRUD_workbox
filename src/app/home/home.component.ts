import { Component, OnInit } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  products = [];
  id: number;
  private headers = new HttpHeaders({ "content-Type": "application/json" });

  fetchData = function() {
    this.http
      .get("http://localhost:5555/products")
      .subscribe((res: Response) => {
        this.products = res;
        console.log(this.products);
      });
    // .catch((err: HttpErrorResponse) => {
    //   // simple logging, but you can do a lot more, see below
    //   console.error("----An error occurred while fetching Data :", err.error);
    // })
  };

  deleteProduct = function(id) {
    if (confirm("Are you sure?")) {
      const url = `${"http://localhost:5555/products"}/${id}`;
      return this.http
        .delete(url, { headers: this.headers })
        .toPromise()
        .then(() => {
          this.fetchData();
        })
        .catch((err: HttpErrorResponse) => {
          // simple logging, but you can do a lot more, see below
          console.error("----An error occurred while deleting:", err.error);
        });
    }
  };

  ngOnInit() {
    this.fetchData();
  }
}
