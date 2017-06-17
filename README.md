# Movie Viewing Website - SPA with ReactJS

This is the front end code for a very simple Video viewing website. It is written in ReactJS and uses Redux and Sagas. The Server has authentication resources ( nothing special, clear text, no cookie or jwt... not even ssl), prepares a list of unlisted youtube videos for viewing, and then displays them. :boom:

Written by Philip A Senger

[philip.a.senger@cngrgroup.com](mailto:philip.a.senger@cngrgroup.com) | mobile: 0404466846 | [CV/Resume](http://www.visualcv.com/philipsenger) | [blog](http://www.apachecommonstipsandtricks.blogspot.com/) | [LinkedIn](http://au.linkedin.com/in/philipsenger) | [twitter](http://twitter.com/PSengerDownUndr) | [keybase](https://keybase.io/psenger)

Website in action is located [here](http://godslight.s3-website-ap-southeast-2.amazonaws.com/)

## TOC

* [Environment Variables](#environment-variables)
* [Command Line](#command-line)
* [Deploying](#deploying)

## Environment Variables

| Mandate  | Name       | Purpose                                                                                                                                                      |
|:---------|:-----------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| required | API_URL    | The base Url to the hosted api server. If not set, it assumes localhost. eg: ``export API_URL=https://aaaaaa.bbbb.com/``                                     |
| required | PUBLIC_URL | The Url to the public html server. Values will be embedded into the processed HTML. defaults to local host. eg: ``export PUBLIC_URL=https://zzzz.dddd.com/`` |
| required | NODE_ENV   | When you deploy, you should set this to 'production'. This will turn off the Redux Logger. default is development. eg: ``export NODE_ENV=production``        |


## Command Line

| Command       | Purpose                                                                                                           |
|:--------------|:------------------------------------------------------------------------------------------------------------------|
| npm run start | Start the dev server and dev api server. if the API_URL is set then the website will use the specificed api. You can point to the production API via the API_URL environment variable. |
| npm run build | This produces production read code and drops it in the `build` directory. |
| npm run test  | Runs all the tests  |

## Deploying

*1.* Set ALL environment variables. And XXXX is the appropriate urls with trailing slashes
```bash
export API_URL=XXXX
export PUBLIC_URL=XXXX
export NODE_ENV=production
```

*2.* Install all node modules.
```bash
npm install
```

*3.* clean the build
```bash
npm run clean
```

*4.* build the app
```bash
npm run build
```

*5.* check everything into git

*6.* build the app
```bash
npm version patch
```

*7.* sync with aws. And XXXX is the S3 Bucket
```bash
cd build
aws s3 sync . s3://XXXX
```
