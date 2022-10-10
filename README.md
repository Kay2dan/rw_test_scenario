# Issues in the repo

There are 2 issues in the repo.

## 1- dbAuth error

> graphql-server Error building context. Error: Exception in getCurrentUser: Invalid session

### Steps

After running the following commands & updating the schema.prisma file to include the password etc fields:

```bash
yarn rw setup auth dbAuth
```

& then

```bash
yarn rw generate dbAuth
```

I am able to signup & then login. However, upon logging in, I get the above error (within quotes) in the terminal.

Any attempt to get the [context.currentUser](https://redwoodjs.com/docs/graphql#context) from within a services file results in the same error in the terminal.

## 2- tsconfig.json alias paths not correctly resolved

In `web/tsconfig.json`, within the `paths`, I have added a custom folder alias:

```json
    "paths": {
      "src/*": [
        "./src/*",
        ...
      ],
      // custom alias to components folder
      "@components/*": ["./src/components/*"],
      ...
```

However, the alias is not correctly resolved. For example, in `web/src/pages/HomePage/HomePage.tsx`, the following import fails: `import BtnDefault from '@components/Btn/BtnDefault'` with the terminal error:

```bash
web | ERROR in ./src/pages/HomePage/HomePage.tsx 5:0-56
web | Module not found: Error: Can't resolve '@components/Btn/BtnDefault.tsx' in '/home/sk/www/rw_test/web/src/pages/HomePage'
web | resolve '@components/Btn/BtnDefault.tsx' in '/home/sk/www/rw_test/web/src/pages/HomePage'
web |   Parsed request is a module
web |   using description file: /home/sk/www/rw_test/web/package.json (relative path: ./src/pages/HomePage)
web |     Field 'browser' doesn't contain a valid alias configuration
web |     resolve as module
...
```
