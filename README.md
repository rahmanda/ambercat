# Ambercat

Stupidly simple static site generator based on Vue.js and Tailwind CSS ([Demo here](https://ambercat.rahmanda.net)).

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

To start dev server, run:

``` bash
npx ambercat dev
```

For local development, the homepage will be accessible on `http://localhost:3000`.

If you want to preview your blog on your device, you can use the public url which will be printed on your command line. Make sure that your device and your computer are connected to the same network.

Every changes to theme and posts will be triggering browser reload across devices.

## Add a Post

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

The `HomePage.vue` component will accept `data` object with properties below:

| Name | Type | Description |
| ---- | ---- | ----------- |
| url | `String` | Url of homepage |
| data | `Object { posts[], title }` | Contains array of posts and title of homepage |

The `data.posts` contains an array of the most recent posts with these properties:

| Name | Type | Description |
| ---- | ---- | ----------- |
| url | `String` | Url of the post |
| content | `String` | Content HTML of the post |
| data.title | `String` | Title of the post |
| data.summary | `String` | Summary of the post. Can be empty |
| data.date | `String` | Date of the post |
| data.path | `String` | Path to the post |
| data.readingTime | `Object` | Reading time estimation. The values are `{ String: text, Int: minutes, Int: time, Int: words }` |

### PostPage

The `PostPage.vue` component will accept these properties:

| Name | Type | Description |
| ---- | ---- | ----------- |
| url | `String` | Url of the post |
| content | `String` | Content HTML of the post |
| data.title | `String` | Title of the post |
| data.summary | `String` | Summary of the post. Can be empty |
| data.date | `String` | Date of the post |
| data.path | `String` | Path to the post |
| data.readingTime | `Object` | Reading time estimation. The values are `{ String: text, Int: minutes, Int: time, Int: words }` |
| data.newerPost | `Object` | Contains newer post with the same properties as PostPage |
| data.olderPost | `Object` | Contains older post with the same properties as PostPage |

### Add a new static page

Create your custom static page component on `src/components` directory, then edit `src/router.js`.

``` js
// src/router.js
...
  routes: [
    {
      path: '/',
      component: Homepage,
    },
    {
      path: '/index.html',
      component: Homepage,
    },
    {
      path: '/404.html',
      component: FourOhFourPage,
    },
    {
      // .html extension is important
      path: '/your-custom-static-page.html',
      component: YourCustomStaticPage,
    },
  ],
...
```

On your `ambercat.config.js`, register new static pages by adding it into `staticPages` property.

``` js
// ambercat.config.js

module.exports = {
  ...
  staticPages: [
    { filename: 'index', title: 'Ambercat', description: '....' },
    { filename: '404', title: '404' },
    { filename: 'your-custom-static-page', title: 'Your custom static page' },
  ],
  ...
};
```

The `title` values will be used to set title page. The `filename` should be matched with the route you just registered on `src/routes.js`. The optional `description` value will be used for meta description on your page.

### Customize tailwind.js

The default configurations from the original `tailwind init` have mostly been edited following to the default theme design. However, the edited values are left commented so you can easily enable them later. Refer to https://tailwindcss.com/docs/configuration for further guideline.

## Configuration

All of project configurations are stored in `ambercat.config.js` file and should be self explanatory. Below are descriptions for advanced usage.

### Webpack

You can add your webpack config by using `configureWebpack` hook. The returned object will be merged with internal webpack configuration. Use `isServer` flag to avoid misconfiguration.

This hook should always return an object if you decide to use it. If you don't need to add anything, simply exclude it from your configuration.

### Asset Injector

Sometimes you want to add extra scripts like analytics or css tags on template. However, it is forbidden to add it via Vue.js component. By its nature, Vue.js will reject tags with side-effects like `<script>` and `<link>`. By using `assetInjector` hook, you can add your extras without messing with Vue.js compilation process. Below are parameters which `assetInjector` accepts.

| Param | Type | Description |
| ----- | ---- | ----------- |
| assetType | `String` | Determine asset type ('css' or 'js') |
| pageType | `String` | Determine page type ('page' for regular static page, and 'post' for article page) |

This hook should always return a string if you decide to use it. If you don't need to add anything, simply exclude it from your configuration.

## Transform a Post

To extend your blogging system further like adding a special syntax on markdown, sometimes you need an access to a post compiler. By using `transformPost` hook, you can transform your posts to your liking before they are being written into static files. Below are parameters which `transformPost` accepts.

| Param | Type | Description |
| ----- | ---- | ----------- |
| content | `String` | Unprocessed post content in markdown |

To avoid unexpected behavior, you should always return your transformed post text on this hook. If you don't need to add anything, simply exclude this hook from your configuration.

To get you an idea of what this hook is capable of, below example shows you how to add emoji feature on your post by using the hook.

``` js
// ambercat.config.js
const emoji = require('node-emoji');

module.exports = {
 // ...
 transformPost(content) {
   const replacer = (match) => emoji.emojify(match);
   return content.replace(/(:.*)/g, replacer);
 },
};
```
