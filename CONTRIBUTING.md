# Contributing to BLiP Toolkit
:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to BLiP Toolkit and its components, which are hosted in the [Take](http://take.net) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Tests

We are trying to cover all of our components with tests to make more consistent and reliable code. So, whenever possible, write some tests while creating new components.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Reference issues and pull requests liberally at the end of line

### JavaScript Styleguide

All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/).

* Use the object spread operator (`{...anotherObj}`) instead of `Object.assign()`
* Inline **named** `export`s with expressions whenever possible
```js
  // Use this:
  export class ClassName {

  }

  // Instead of:
  export default class ClassName {

  }
```

### Specs Styleguide

- Include thoughtfully-worded, well-structured [Jasmine](https://jasmine.github.io/) specs in the `./spec/tests` folder.
- Treat `describe` as a noun or situation.
- Treat `it` as a statement about state or how an operation changes state.

#### Example

```coffee
describe 'a dog', ->
 it 'barks', ->
 # spec here
 describe 'when the dog is happy', ->
  it 'wags its tail', ->
  # spec here
```
