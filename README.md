# React Async I/O Testbed

This repo attempts to recreate the the IO demo from
Dan Abramov's Beyond React 16 talk:

https://reactjs.org/blog/2018/03/01/sneak-peek-beyond-react-16.html

## Example

The latest version of this repo is deployed here:

[https://react-async-io-testbed.netlify.com/](https://react-async-io-testbed.netlify.com/)

## Screenshots

<img src="./List.png" style="max-width: 400px" />
<img src="./Details.png" style="max-width: 400px" />

## Observations

It is possible to recreate the exact user experience as Dan created in his
talk, which is great!

In this version all the async state code has ended up centralised in the `App`
component. In Dan's talk it was co-located with each components that needed
async state.

Managing async state that depends on other async state (in this case loading
the poster image after the details have been loaded) needed to be managed
explicitly and it was a little more intricate the ensure that the `MoviePage`
component counted as being loaded only after details, image, and the component
itself were loaded.
