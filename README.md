# Archimedes

Archimedes is a series of architectural concepts that are implemented in different languages. Using a given Archimedes implementation provides a set of solid and flexible architectural pieces. This is the implementation of Archimedes in TypeScript.

[Checkout the documentation](https://www.archimedesfw.io/).

## Usage

Install any `archimedes` packages:

```bash
npm i @archimedes/utils -SE
npm i @archimedes/arch -SE
npm i @archimedes/components -SE
```

## Development

To start working run `npm i` followed by `npm run bootstrap`. After you add any dependency you should run `npm run boostrap` again.

If you want to test locally without publishing the libraries you can do as follows:

1. `npm run build`
2. `npm link`. Copy the file url that gets printed
3. Go over to your project and run `npm link <URL_YOU_COPIED>`
4. To finish linking you have to `npm unlink <URL_YOU_COPIED>`

### Deployment

`npm run version`
