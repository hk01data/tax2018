# Calculator for Hong Kong Salaries Tax

Demo: [https://hk01data.github.io/tax2018/](https://hk01data.github.io/tax2018/)

Hong Kong Government Budget 2018 is announced, there are several new financial policies, updating Tax Computation.

-----

> Salaries Tax Calculator

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Update for new Budget

"STCOut1" is a prop of "taxNewYear" component passing to Tax*thisyear*_data.js as "STCOutNew" from `Hello_data.js`.


"STCOut1" (in `Hello_data.js`) (in Tax*thisyear*_data.js) is old pay.

"STCOutNew" is copied the user input from "STCOut1".

"STCOut2" is next year pay, please see therate: get_rate(), using "STCOutNew" input to calculate new year pay.

1. Update 
    - migrate get_rate() from Tax*lastyear*_data.js --> `Hello_data.js`
    - edit get_rate () { year = 'xxxx-yyyy'
    - edit this.AssessYear === 'xxxx-yyyy'
    - edit get_deduction () { var YrValue = 'xxxx-yyyy'

2. The latest Tax policy mentioned in Budget, input to Tax*thisyear*_data.js

    - clone Tax*lastyear*_data.js to Tax*thisyear*_data.js
    - edit Tax*thisyear*_data.js on-day
    - edit get_rate () { year = 'xxxx-yyyy'
    - edit this.AssessYear === 'xxxx-yyyy'
    - edit get_deduction () { var YrValue = 'xxxx-yyyy'

note: update article id for trackingProd

## Reference:
- [Tax Rate Table (2017/18)](https://www.ird.gov.hk/eng/pdf/pam61e.pdf)
- [Tax Computation (Chinese) - IRD](https://www.ird.gov.hk/chi/ese/st_comp_2017_18/cstcfrm.htm)
- [Tax Computation (English) - IRD](https://www.ird.gov.hk/eng/ese/st_comp_2017_18/stcfrm.htm)

