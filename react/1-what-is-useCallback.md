# React Hook `useCallback()` What is it? How to use it?

useCallback() [is a React Hook API that cache a function definition between re-render](https://react.dev/reference/react/useCallback)

usage
```ts
const callback = useCallback(fn, dependencies);
```

## Parameter
`fn` is a function value you want to cache. It can take any arguments and return any values. React will return function for you during initial render __it'll not call a function for you__, and will return the same function again if dependencies did not changes.

`dependencies` is a lists of all reactive values that reference inside of `fn`. Which include props, state, and all the variable and function declared.

## Returning
On initial render it will return `fn` function that you have passed.

During subsequent renders, it will return any stored `fn` function from last render, or return `fn` function if dependencies have change.