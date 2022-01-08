# Requirements Speciation

According to the provided denials and instructions at [Picnic Recruitment Task](/docs/picnic.md)
We have the following user stories:


## User Stories

### Product listing
As an end-user, i should be able to see a list of products with the following information for each product in the list:

1. Name  | data type: string
2. Price | data type: number
3. Image | data type: string

#### Acceptance criteria
1. The url of the product list view should be `/list`
2. For mobile users the list should display 2 items per row
3. For tablet users the list should display 3 items per row
4. For desktop users the list should display 6 items per row
5. Show loading indicator while fetching the data from the server
6. Show meaningful message for the user in case of network error that happens during fetching the products from the server
7. Show meaningful message for the user in case of the number of products is equal to zero

#### Tasks
1. Define the system architecture 
2. Setup the project
2. Create ul/ux sketch
3. Create final ui/ux 
4. Implementation of the view layer
5. Implementation of the required logic to handle listing of the product including:
    1. state layer
    2. routing
    3. abstraction layer
    4. fetching data from the server
6. Implement the required unit test cases
7. Code review

#### ETA
~8h
-----------

### filtering products
As an end-user, i should be able to filter the products list by inserting a search keyword using an input felid

#### Acceptance criteria
1. The products filtering should be handled in the client side
2. The products should be filtered based on the price or the name
3. Show meaningful message for the user in case of the number of products is equal to zero

#### Tasks
1. Implementation of the view layer
2. Implementation of the required logic to the client side filtering of the products:
    1. state layer
    3. abstraction layer
3. Implement the required unit test cases
4. Code review

#### ETA
~3h
-----------


### Product details
As an end-user, i should be able to see the details of a specific product either by clicking on a product in the products list or by inserting the url path directly. Also, i should be to see the following information about the product:

1. Name  | data type: string
2. Price | data type: number
3. Image | data type: string


#### Acceptance criteria
1. The url of the product details view should be `/list/productID`
2. Mobile and tablet users should be navigated to product details view on clicking/tapping a product item in the list
3. For desktop users a popup display view should be triggered on clicking/tapping a product item in the list
4. The design should be responsive and user friendly based on the user's device  
5. Show loading indicator while fetching the data of the product details from the server
6. Show meaningful message for the user in case of network error that happens during fetching the product details from the server
7. Show meaningful message for the user in case of the number of product was not found

#### Tasks
1. Create ul/ux sketch
2. Create final ui/ux 
3. Implementation of the view layer
4. Implementation of the required logic to handle displaying of the product details including:
    1. state layer
    2. routing
    3. abstraction layer
    4. fetching data from the server
5. Implement the required unit test cases
6. Code review

#### ETA
~5h
-----------

![Use-case diagram](/docs/assets/uscase.jpg?raw=true)

-----------

## Next
1. [Project setup and installations](/docs/setup.md) 
2. [System Architecture Design](/docs/architecture.md)
3. [UI/UX Design](/docs/interface.md)
4. [What can be done better?](/docs/improvements.md)











