# Picnic Recruitment Task #

Please read the following instructions carefully and make sure that you fulfill
all requirements listed.

## Overview ##

This is an Angular programming assignment we've created specifically for our
recruitment process. You were given a link to GitHub, which when you visited that link,
created a private fork of this repository. Only you and developers at Picnic
can see the code you push to this repository.

High-level instructions:
1. Read and follow the task specified below.
2. Make a local clone of this repository on your machine, and do your work on a
   branch other than `master`. Do not make any changes to the `master` branch.
3. Push your changes as frequently as you like to `origin/your-branch-name`,
   and create a pull request to merge your changes back into the `master`
   branch. Don't merge your pull request. Once you're finished with the
   assignment, we will do a code review of your pull request.
4. When you're finished, [create and add](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels) the label `done` to
   your pull request. This will notify us that your code is ready to be
   reviewed. Please do **NOT** publish your solution on a publicly available
   location (such as a public GitHub repository, your personal website, _et
   cetera_). Also, please refrain from tagging or assigning specific Picnic
   employees as reviewers of your PR; we have an internal round-robin system to
   determine who will review your code.

This process closely mimics our actual development and review cycle. We hope
you enjoy it!

## Task ##

The assignment is to create a small SPA that does the following:

1. A list of products is retrieved from a REST endpoint.
2. This list of products is displayed using a responsive Grid with the following requirements:
    * URL: `/list`
    * Mobile device: 2 items per row 
    * Tablet device: 3 items per row 
    * Desktop: 6 items per row
3. Each product item contains the following information: 
    * Name
    * Price
    * Image
4. The list of products can be filtered, by typing a query in a text field at the top of the list.
5. A product container is a clickable / tappable element, which has the following logic:
    * If the user is on mobile device, it redirects to a separate view with product details. URL: `/list/productID`
    * If the user is on desktop, it triggers a “popup/lightbox” view with product details.
6. The details of the clicked product are retrieved from a REST endpoint as well.
7. A User can also access product pages on the desktop directly by going to `/list/productID`

## API Overview ##

You can obtain the list of products from the following REST endpoint:

`https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/list`

```
  method: GET
  parameters: none
```

A product can be obtained from the following endpoint:

`https://s3-eu-west-1.amazonaws.com/developer-application-test/cart/{product_id}/detail`

```
  method: GET
  parameters: product_id
```

## Notes ##

* It’s okay to use any third party libraries you seem fit, but please attach a brief description of why you’ve selected it.
* Please *do not* use third party CSS libraries (e.g. no Bootstrap!). Angular Material is okay to use.
* Please also provide a brief description of the overall app architecture and the reasoning behind picking it over any other possible alternative.
* Please state your **full name** in the title of the pull request.

