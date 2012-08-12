## Project Euler JavaScript solutions
This is a collection of solutions to [Project Euler](http://projecteuler.net) problems using
JavaScript. This is a work in progress.

## Contributing
Feel free to submit pull requests with solutions!

In lieu of a formal style guide, take care to maintain the existing coding style and lint your
changes using [grunt](https://github.com/cowboy/grunt).

## Generating docs
_Code documentation in this project uses jsDoc format._

Documentation is generated using docco-husky. The docco-husky defaults for this project are
included in `package.json`. To regenerate the docs after making a change, run the following:

    $ docco-husky app.js routes/index.js

## Run locally

    $ git clone git://github.com/fiveisprime/euler.nodester.git
    $ cd euler.nodester
    $ npm install
    $ node app.js

Once the app is running, navigate to http://localhost:20109 to see the result.

## License
Copyright (c) 2012 Matt Hernandez
Licensed under Creative Commons license.
