# Contributing

Thanks for contributing to this project! You should follow these steps:

You need to install [yarn 1.x.x](https://classic.yarnpkg.com/en/docs/install).

1. Fork the project
2. Clone the project locally
3. Install the dependencies running in the project's root directory `yarn`
4. Make the changes making sure you follow [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/) when committing
5. You can test them locally after running `yarn build` inside the `examples` folder or use [yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) to test the changes in another project as follows:
   a. `cd` inside the package that you want to test
   b. `yarn link`. Copy the package name that gets printed
   c. Go over to your project and run `yarn link <PACKAGE_NAME>`
   d. To finish linking you have to `yarn unlink <PACKAGE_NAME>`
6. Create a PR

## Publish

In order to publish, if you have the necessary permissions, you should run one of the followings workflows:

-   Publish
-   Publish Beta
-   Publish Alpha

This will determine the next version using [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/), update the CHANGELOGs and publish to NPM the new version.
