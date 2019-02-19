# Ambercat

Stupidly simple static site generator based on Vue.js and Tailwind CSS.

## How to Install

Init your npm project first:

``` bash
npm init <your-blog-directory> && cd <your-blog-directory>
```

then add this repo as local dependency:

``` bash
npm install ambercat --save
```

then run this command to init blog project:

``` bash
npx ambercat init
```

## Run Dev Server

To run dev server, run:

``` bash
npx ambercat dev
```

The homepage will be accessible on `http://localhost:3000`.

## Adding Posts

To add a post, run:

``` bash
npx ambercat post <your post title>
```

By default, the command will create `YYYY-MM-DD-your-post-title.md` file in your `src/posts` directory. The date prefix will be used to determine the post date.

## Build Static Site

To build static site, run:

``` bash
npx ambercat build
```

Static site files will be generated in your `build` directory. You can upload them to Github Pages or your chosen web service.

Ambercat doesn't provide you with any kind of deployment flow so you need to configure it yourself.

## Customize Your Blog UI

All of UI code are stored inside of `src` directory. Pay attention that there are two kind of entry files:

1. `entry-client.js`. This file will be used to build js file to be served along with your static site.
2. `entry-server.js`. This file will be used to generate the static site. In most cases, you don't need to work with this file.

### HomePage

The `HomePage.vue` component will accept `data` object. The `data.posts` contains an array of the most recent posts with these properties:

| Name | Type | Description |
| ---- | ---- | ----------- |
| title | `String` | Title of the post |
| summary | `String` | Summary of the post. Can be empty |
| date | `String` | Date of the post |
| path | `String` | Path to the post |
| readingTime | `Object` | Reading time estimation. The values are `{ String: text, Int: minutes, Int: time, Int: words }` |

### PostPage

The `PostPage.vue` component will accept `content` HTML text and `data` object. The `data` object contains exactly the same properties as the `data.posts` on `HomePage.vue` description with additional properties:

| Name | Type | Description |
| ---- | ---- | ----------- |
| newerPost | `Object` | `{ title, summary, date, path, readingTime }` |
| olderPost | `Object` | `{ title, summary, date, path, readingTime }` |

### Adding new static pages

Create your custom static page component on `src/components` directory, then edit `src/routes.js`. On your `ambercat.config.js`, register new static pages by adding it into `staticPages` property.

``` js
// ambercat.config.js

module.exports = {
  ...
  staticPages: [
    { filename: 'index', title: 'Ambercat' },
    { filename: '404', title: '404' },
    { filename: 'your-custom-static-page', title: 'Your custom static page' },
  ],
  ...
};
```

The `title` values will be used to set title page. The `filename` should be matched with the route you just registered on `src/routes.js`.

### Customize tailwind.js

The default configurations from the original `tailwind init` have mostly been edited following to the default theme design. However, the edited values are left commented out so you can easily enable them. Refer to https://tailwindcss.com/docs/configuration for further guideline.

## Configuration

All of project configurations are stored in `ambercat.config.js` file.
