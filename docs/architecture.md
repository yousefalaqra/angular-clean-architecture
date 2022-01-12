# Architecture Design

Back then, earliest in the 90's we were introduced to the era of web development, first web page went live on 1991, Microsoft and Netscape were fighting, Javascript vs JScript, Netscape Navigator vs Internet explorer, more browsers joined the war later on, until we had a standards that made our live easier web developers in order to create cross-browser web applications.

The point here, lately browsers features were limited, and we had to rely on the server side in order to create features that satisfy our customers,
by time with the vast technology development, and end-users devices capacity increased, companies were able to improve the browsers by adding more api's and features which allowed us developers to create more complex features in the client-side. For instance Single Page Applications(SPAs) are providing users with extensive features and the backend(server side) being used as a data persistence layer.

To Create simplicity out of complexity, then scalability is a core principle that we should considered in early stage of the development. As we know the `only constant in life is change`, Market changes in a continues manner, if our are product is not capable to accept new features and modifications easily that will cost us so much, and sometimes that means being out of the game. Robert C. Martin once said: `the true cost of software is its maintenance.` Having well-grounded architecture helps to reduce the costs of the system’s maintenance.

One of the things that i love about Angular framework is the that it was designed and structured in such a way to forces developers to do things in the proper way, even so, there're so many places where you can mess up. So the goal is to apply best practices in order to keep our application simple, and being scalable (adaptive to changes) at the same time. The question is how?

# The whole picture of the design of the system 
![Decomposing diagram-a](/docs/assets/arc.jpg?raw=true)

## Decomposing

The idea here to decompose our application into multiple layers by defining the proper responsibility of each layer and the communication roles between them. As you can see in the diagram below, the app was decomposed into three main layers, **core layer** which manages the state, business logic, and to communicate with the outer world, **presentation layer** to present and to delegate users' actions, and the presentation and core layers are allowed to communicate with each others only through the **abstraction layer** which abstracts the functionalities of the core layer to serve the presentation layer.

![Decomposing diagram-a](/docs/assets/dec.png?raw=true)

### Demonstration use-case `listing products`

#### Presentation Layer

As the main responsibilities of the presentation layer is to **presenting UI**, **delegate user actions**, and it's where our components live, we should be aware that it doesn't know how the users's actions are being handled. That's a key-value, our component's code is very simple and clean, see below:

```
@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Observable<Array<ProductResource>>;
  isLoading: Observable<boolean>;

  constructor(private _productFacade: ProductFacade) {
    this.products = this._productFacade.getProducts();
    this.isLoading = this._productFacade.getIsLoading();
  }

  ngOnInit(): void {
    this._productFacade.loadProducts();
  }
}
```

As you see above, our `product-list` component sticking with it's assigned role through communicating with `ProductFacade` from the abstraction layer in order to delegate actions `loadProducts` and to present data that came from the core layer through the `products` `isLoading`. This is what we call an **effective communication**.

#### Abstraction Layer

The Abstraction layer plays a crucial role as the **interface** between the presentation layer and the core layer, this kind of `facade` allows the components in the presentation layer to know exactly what to do and what kind `stream of data` that they can access. Below you can see that the interface was implemented as a facade by using Angular class provider, let's take a look:

```
@Injectable()
export class ProductFacade {
  constructor(
    private _productState: ProductState,
    private _productApi: ProductApi
  ) {}

  getProducts(): Observable<Array<ProductResource>> {
    return this._productState.getProducts();
  }

  getIsLoading(): Observable<boolean>{
      return this._productState.getIsLoading()
  }

  loadProducts(): void {
    this._productState.setIsLoading(true);

    this._productApi
      .loadProducts()
      .subscribe((products: Array<ProductResource>) => {
        this._productState.setProducts(products);
        this._productState.setIsLoading(false);
      });
  }
}
```

Amazing right? i mean the `productFacade` knows exactly what to do and which core layer service to contact with based on the dispatched action out of the presentation layer, the presentation layer has enough space to take care of the ui and the end-user.

#### Core Layer

As the name tells us, the **core** layer deals with sensitive operations including `managing the state` of the application and sometimes as a side effect it have to travel long distances in order to get data from web servers (in our usecase through http):

##### State

```
@Injectable()
export class ProductState {
  private products = new BehaviorSubject<Array<ProductResource>>([]);
  private isLoading = new BehaviorSubject<boolean>(false);

  getProducts(): Observable<Array<ProductResource>> {
    return this.products.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setProducts(products: Array<ProductResource>): void {
    this.products.next(products);
  }

  setIsLoading(status: boolean): void {
    this.isLoading.next(status);
  }
}
```

As part of the core layer, the state was manged internally using `BehaviorSubjects` as a simple approach that can be scaled up into more complex state management solutions such as `NgRx`, and that's a **key-value** abstracting the components away form managing the state, gives the core layer the space to decided which options to choose to manage the state and the freedom to change(scale) on-demand!

##### Api

Other responsibility of the core layer, is to communicate over http with external data sources in our case: `web server` in order to fetch the products list:

```
@Injectable()
export class ProductApi {
  private readonly API = `${environment.apiBaseBath}/developer-application-test/cart`;

  constructor(private _http: HttpClient) {}

  loadProducts(): Observable<Array<ProductResource>> {
    return this._http
      .get<{ products: Array<ProductResource> }>(`${this.API}/list`)
      .pipe(map((res: { products: Array<ProductResource> }) => res.products));
  }
}
```

As you can see above by demonstrating the concept of **decomposing** we were able to give the **freedom** for each team member to play its part perfectly, with enough space for each one to scale up at any time. Tightly coupling your resources will cost you so much, no matter what technology you use, even the Angular framework with its amazing structure will act heavy if you don't use it right, and you're ignite will blow out and turn into ashes if you blocked one of its elements. In one word, this is the teamwork!

## Unidirectional Data Flow

As agile has proven itself to be an effective working methodology, because it guarantees the implementation meets the customer's need with minimum cost, that means by time the application will grow and more features will be added, in our case more components in the presentation layer will be added as well. At many cases we want to display the same data in multiple components. The question is what will happen in case of each component is changing the data locally? Hard to debug system, as we don't know the source of the change, more prone to errors as we have less control over the data, and much more problems.

Forcing one-way data flow between our layers and together with our reactive state management solution using rxjs it will give us a huge value **data consistency**, to achieve this, we have to make sure that the data flow **from the top to bottom**, from the core layer (the state) to the presentation layer, let's take the following case to demonstrate how application forces unidirectional data flow:

### Demonstration use-case `filtering products`

As we see below `filter-list` component in the presentation layer delegates/emits a new event every time the input felids value changes by the user:

```
@Component({
 selector: 'filter-products',
 templateUrl: './filter-products.component.html',
 styleUrls: ['./filter-products.component.scss'],
})
export class FilterProductsComponent {
 @Output() onFilterKeyChange = new EventEmitter<string>();

 onFilterInputValueChange(key: string): void {
   this.onFilterKeyChange.emit(key);
 }
}
```

Then, the event flows from the child component `filter-list` into the parent `product-list` using output decorator:

```
@Component({
  selector: 'products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Observable<Array<ProductResource>>;
  isLoading: Observable<boolean>;

  constructor(private _productFacade: ProductFacade) {
    this.products = this._productFacade.getProducts();
    this.isLoading = this._productFacade.getIsLoading();
  }

  ngOnInit(): void {
    this._productFacade.loadProducts();
  }

  onFilterList(key: string | number) {
    this._productFacade.filterProducts(key);
  }
}
```

As the event was delegated from the child and continued to flow over, the `onFilterList` passed it away to the abstract layer `ProductFacade` in order to reach to the core layer `state` where the proper logic will be applied to filter the list based on the user's input:

```
@Injectable()
export class ProductState {
  private products = new BehaviorSubject<Array<ProductResource>>([]);
  private productsCopy: Array<ProductResource> = [];
  private isLoading = new BehaviorSubject<boolean>(false);

  getProducts(): Observable<Array<ProductResource>> {
    return this.products.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setProducts(products: Array<ProductResource>): void {
    this.productsCopy = [...products];
    this.products.next(this.productsCopy);
  }

  setIsLoading(status: boolean): void {
    this.isLoading.next(status);
  }

  filterProducts(key: string | number): void {
    if (!key) {
      this.products.next(this.productsCopy);
      return;
    }
    const currentProducts = this.products.getValue();
    const filteredProducts = currentProducts.filter(
      (x) => x.name == key || x.price == key
    );

    this.products.next(filteredProducts);
  }
}
```

Whenever the products list value changes by the `filterProducts` it will be propagated down to the `list-component` via **Observable streams**, also the products state can be propagated to multiple components and displayed in multiple places, but never modified locally. By the end the component `list-component` will reflect the current state of the system in the ui. Other than having **data consistency** which will allow us to display the same data in multiple places without being afraid that the value might differ, also our state object `product state` **becomes the single source of truth**

Amazing! Right?!

## Modular Design

Imagine you have a big cake, you can't eat all at once! **divide and conquer**. With modular system design our code based could be divided down into multiple sub-modules in order to increase the maintainability, fast development life cycle, great team collaboration, and other more values. In our case, the system was divided into three main modules:

1. **Core module**

   Which can be only imported once in `AppModule`, it used to provided a singleton instances of services and components. As an instance the header component fits in the core module.

2. **Feature module**
   or feature modules are representing the breakdown of the business functionalities, while for now we only have one brininess feature which is products but as a scalability it's common since to consider more features other feature module modules than the `products` can be easily added to the app.

   In most cases, features module share the same horizontal separation of the **core, abstraction, and presentation layer**. Also, these modules could be lazily loaded (and preloaded) into the browser **increasing the initial load time of the application**.

3. **Shared module**
   While the shared modules can be used by any other feature module for common functionalities, theses modules improve the **code reusability** and keep it **DRY**

## Smart and dumb components

I love dividing, it makes the problem much easier to resolve and it improves the scalability of the system. Based on the responsibility of the components, they were divided into main categories:

1. **Smart components**
   or containers (`Product-list`), the reason why they being called smart because they take the responsibility to communicate with the abstraction layer in order to dispatch actions that could change the state, communicating with other services, pass data to dumb components, and react to events from dumb components (as we saw in `filter-list` usecase above).

2. **Dumb components**
   With main responsibilities to present UI and it could be throw data the were passed by smart components and to delegate actions to smart components.

### Demonstration use-case `products list item`

As you can see below we loop over the products list that's coming from the core layer in smart component `product-list`

```
<ng-container *ngFor="let product of products | async">
    <product-item [product]="product" (onProduct)="onProductClick($event)"></product-item>
</ng-container>
```

We pass each product into `product-item` dump component in order for it to handle the presentation of UI of the product card, thats one, also to delegate an event that includes the product id back to the `product-list` which will take it's responsibility to communicate with the proper service in order to navigate the user to the product details view or display according to the user device. Teamwork!!

```
@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product: ProductResource;
  @Output() onProduct = new EventEmitter<string>();

  onProductClick(): void {
    this.onProduct.emit(this.product.product_id);
  }
}
```

---

In the end, what really matters are the people, either the ones who work with us or for the ones we serve, it's necessary to satisfy both needs through clean software architecture.

wondering what's next?
1. [Project setup and installations](/docs/setup.md) 
2. [Requirements speciation](/docs/srs.md)
3. [UI/UX Design](/docs/interface.md)
4. [What can be done better?](/docs/improvements.md)
