# EMOTIONS 'Я US

We can help you feel as you wish to feel...

Choose from our carefully curated packages of items and imaginaria to induce the feelings you need at the moment...

## Development Setup

### Server & client

```
  git clone
  npm i
  npm run seed
  npm run start-dev
```

### Google OAUTH

Environment variables (either in a local file - do not push to github - or Heroku app env vars)

```
  GOOGLE_CLIENT_ID = 'hush hush'
  GOOGLE_CLIENT_SECRET = 'pretty secret'
  GOOGLE_CALLBACK = '/auth/google/callback'
```

## TODO ------

[ ] emotions should show for guests

[x] buy button, clear cart

[ ] show a message on successful purchase

[ ] show an error on failed purchase

[ ] generalized "flash" area at top of page: you already have one of these in cart, you just bought, errors, etc

[x] css: minimal - grid for emotions, small pix for cart

[ ] css: catalog space between spreads unfilled last line out - want a grid, leave space at end

[ ] tests!

[ ] api auth: minimal - middleware isAuthenticatedUser

[ ] cart icon in upper right

[ ] cart on rhs? responsive: not in mobile width

[ ] show old orders (open, shipped, cancel)

[ ] tiers (emotions -> tiers; tiers can be purchased)

## Deployment

Ready to go world wide? Here's a guide to deployment! There are two (compatible) ways to deploy:

* automatically, via continuous integration
* manually, from your local machine

Either way, you'll need to set up your deployment server to start:

### Prep

1.  Set up the [Heroku command line tools](https://devcenter.heroku.com/articles/heroku-cli)
2.  `heroku login`
3.  Add a git remote for heroku:

* **If you're creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a name in mind.
  2.  `heroku addons:create heroku-postgresql:hobby-dev` to add ("provision") a postgres database to your heroku dyno

* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

### When you're ready to deploy

#### Option A: Automatic Deployment via Continuous Integration

(_**NOTE**: This step assumes that you already have Travis-CI testing your code._)

CI is not about testing per se – it's about _continuously integrating_ your changes into the live application, instead of periodically _releasing_ new versions. CI tools can not only test your code, but then automatically deploy your app. Boilermaker comes with a `.travis.yml` configuration almost ready for deployment; follow these steps to complete the job.

1.  Run `git checkout master && git pull && git checkout -b f/travis-deploy` (or use some other new branch name).
2.  Un-comment the bottom part of `.travis.yml` (the `before_deploy` and `deploy` sections)
3.  Add your Heroku app name to `deploy.app`, where it says "YOUR HEROKU APP NAME HERE". For example, if your domain is `cool-salty-conifer.herokuapp.com`, your app name is `cool-salty-conifer`.
4.  Install the Travis CLI tools by following [the instructions here](https://github.com/travis-ci/travis.rb#installation).
5.  Run `travis encrypt $(heroku auth:token) --org` to encrypt your Heroku API key. _**Warning:** do not run the `--add` command suggested by Travis, that will rewrite part of our existing config!_
6.  Copy-paste your encrypted API key into the `.travis.yml` file under `deploy.api_key.secure`, where it says "YOUR ENCRYPTED API KEY HERE".
7.  `git add -A && git commit -m 'travis: activate deployment' && git push -u origin f/travis-deploy`
8.  Make a PR for the new branch, get it approved, and merge it into master.

That's it! From now on, whenever `master` is updated on GitHub, Travis will automatically push the app to Heroku for you.

#### Option B: Manual Deployment from your Local Machine

Some developers may prefer to control deployment rather than rely on automation. Your local copy of the application can be pushed up to Heroku at will, using Boilermaker's handy deployment script:

1.  Make sure that all your work is fully committed and pushed to your master branch on Github.
2.  If you currently have an existing branch called "deploy", delete it now (`git branch -d deploy`). We're going to use a dummy branch with the name "deploy" (see below), so if you have one lying around, the script below will error
3.  `npm run deploy` - this will cause the following commands to happen in order:

* `git checkout -b deploy`: checks out a new branch called "deploy". Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify when we push to our heroku remote.
* `webpack -p`: webpack will run in "production mode"
* `git add -f public/bundle.js public/bundle.js.map`: "force" add the otherwise gitignored build files
* `git commit --allow-empty -m 'Deploying'`: create a commit, even if nothing changed
* `git push --force heroku deploy:master`: push your local "deploy" branch to the "master" branch on heroku
* `git checkout master`: return to your master branch
* `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our production server to be cluttered up with dev dependencies like webpack, but at the same time we don't want our development git-tracking to be cluttered with production build files like bundle.js! By doing these steps, we make sure our development and production environments both stay nice and clean!
