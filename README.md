# nest-auth

This repository is designed for testing backend authentication services with Nest.js, a powerful and popular Node.js framework. The project aims to demonstrate how to implement secure and efficient authentication mechanisms using Nest.js.

## Conventional Commits

To maintain a clean and organized commit history, this project follows the Conventional Commits format for commit messages. The commit message should adhere to the following rules:

```
<type>[optional scope]: <description>
[optional body]
[optional footer(s)]
```

- Use the imperative mood when writing the description.
- Keep the description concise.
- Start the message with a prefix: build, feat, chore, docs, style, refactor, perf, test.
- Optionally reference relevant issues or tickets using: "Closes issue #456".
- Use proper grammar and punctuation.

### Examples

To commit changes using Conventional Commits, follow these examples:

```console
git add .
git commit -m "chore!: Drop support for Node 6"
git commit -m "BREAKING CHANGE: Use JavaScript features not available in Node 6." --no-verify
git push
```

```console
git add .
git commit -m "feat(api)!: send an email to the customer when a product is shipped"
git push
```

## Routes and Functionality

The project includes various routes and functionalities to demonstrate authentication mechanisms. Below are some of the key routes and their purposes:

1. `/auth/signup`: Allows users to register and create an account.

2. `/auth/signin`: Enables users to log in using their credentials.

3. `/auth/logout`: Logs out the authenticated user.

4. `/protected-route`: A protected route that requires authentication. Unauthorized users will be redirected to the login page.

## Guards and Interceptors

Guards and Interceptors are essential components in Nest.js that help handle the authentication and authorization processes. They protect certain routes from unauthorized access and add extra functionalities before and after request processing. In this project, we've implemented guards and interceptors to ensure secure and authenticated access to protected routes.

## Decorator @roles

The custom decorator `@roles` is used to restrict access to specific routes based on the user's role. When applied to a route handler, this decorator checks if the authenticated user has the required role to access that route. If the user doesn't have the necessary role, access will be denied.

Please note that this is a simplified demonstration of authentication in Nest.js and may not be suitable for production use. In real-world applications, you should consider using more advanced authentication strategies, such as OAuth, JWT, or Passport, depending on your requirements.

For more in-depth understanding and advanced usage of Nest.js and authentication, please refer to the official Nest.js documentation and explore various authentication libraries and strategies available for Nest.js.
