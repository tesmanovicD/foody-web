## Multiplatform food ordering system - employee part
See [foody-mobile](https://github.com/tesmanovicD/foody-mobile) for customer part of this multiplatform project.

## Web part of the application
![Dashboard of the page](https://i.imgur.com/oIn8KKp.png)

## Some of the functionalities that logged employee have on the website
* view/add/edit/delete customers
* view/add/edit/delete employee
* view/add/edit/delete categories with/without image placeholder
* view/add/edit/delete products with/without image placeholder
* get notified by OneSignal if new order is submited
* get detailed view of customer order, with list of purchased items.
* can denie/accept user order based of purchased item (customer get notified about your decision)
* view/add/edit/delete coupons for products discount

Coupons can be fixed or percentage type, so based on the type price is decreased. They have use limitations, activity date and status(active/inactive), so you can make multiple conditions.

Employee is able to see full details about order, so he can make decision to denie or accept customer order. Whatever he choose, the customer get automatically notification about his order, so he can be in sync with his order.

>Note: Project is still in dev mode, if you want you can pull request with new feautures!

## Used technologies for this part of project
* React (with Redux and other dependencies)
* Node.js (with express and other dependencies)
* MySQL RDBMS 
