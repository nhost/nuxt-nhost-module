# @nhost/nuxt

Nuxt.js wrapper for [nhost-js-sdk](https://github.com/nhost/nhost-js-sdk).

## Installation

First install the package:

```
npm install --save @nhost/nuxt
```

or using Yarn:

```
yarn add @nhost/nuxt
```

Then, add it to your Nuxt config `modules`.

```js
{
  modules: ["@nhost/nuxt"];
}
```

You can configure it like so:

```js
{
  modules: [
    '@nhost/nuxt'
  ],
  nhost: {
    baseURL: "https://backend-url.nhost.app"
    // Your options go here
  }
}
```

Check out our [documentation](https://docs.nhost.io/libraries/nhost-js-sdk#setup) for all the available options.

## Middleware

We provide middleware that automatically handles auth guards for your convenience. To enable it, follow the below steps:

1. Add `nhost/auth` to your Nuxt config middleware:

```js
{
  router: {
    middleware: ['nhost/auth']
  }
}
```

2. Define the `home` and `logout` routes on the nhost config

```js
{
  nhost: {
    routes: {
      home: '/dashboard',
      logout: '/'
    }
  }
}
```

Users who attempt to access auth guarded pages without being logged in will be redirected to the `logout` route and users who are logged in and attempt to access guest pages will be redirected to the `home` route.

These routes can also be set to either `undefined` or `false` which will disable their respective functionality. They are also available under `this.$nhost.$options.routes` on Vue components or `ctx.$nhost.$options.routes` on the Nuxt Context.

3. Finally, add an `nhostAuth` property to your Nuxt pages:

```js
export default {
  nhostAuth: true,
};
```

This property takes the following values:

1. `true`: User has to be authenticated to access this page. Users who are logged out will be redirected to the `logout` route.
2. `false`: This is the default value; no authentication required.
3. `'guest'`: This page can only be accessed by unauthenticated users. Users who are logged in will be redirected to the `home` route.

## Typescript

If you're using Typescript, make sure to include `@nhost/nuxt` to your Typescript config types:

```js
{
  compilerOptions: {
    types: ["@nhost/nuxt"];
  }
}
```

## Usage

Exposes an `$nhost` property on the `Vue` object and on the Nuxt `Context` which is an instance of `NHostClient`
