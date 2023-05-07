# LoMap ES4C

**Participantes:**
 - Pelayo del Campo González
 - Raúl Álvarez Álvarez
 - Iván Vega Prieto
 - Alba Guerrero García


[![Actions Status](https://github.com/arquisoft/lomap_es4c/workflows/CI%20for%20LOMAP_ES4C/badge.svg)](https://github.com/arquisoft/lomap_es4c/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es4c&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es4c)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Arquisoft_lomap_es4c&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Arquisoft_lomap_es4c)

<p float="left">
<img src="https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg" height="100">
<img src="https://miro.medium.com/max/1200/0*RbmfNyhuBb8G3LWh.png" height="100">
<img src="https://miro.medium.com/max/365/1*Jr3NFSKTfQWRUyjblBSKeg.png" height="100">
</p>

## Deploy in Vercel
[Lomap](https://lomap-es4c-eeyat2o8a-lomap4c.vercel.app/map)


This project is a basic example of website using **React** with **Typescript** and an endpoint using **NodeJS** with **express**.

## Quick start guide
<mark>In case you already have node.js and npm, make sure you update them before attempting to build the images</mark>

If you want to execute the project you will need [git](https://git-scm.com/downloads), [Node.js and npm](https://www.npmjs.com/get-npm) and [Docker](https://docs.docker.com/get-docker/). Make sure the three of them are installed in your system. Download the project with `git clone https://github.com/arquisoft/lomap_es4c`. The fastest way to launch everything is with docker:
```bash
docker-compose up --build
```
This will create two docker images as they don't exist in your system (the webapp and the restapi) and launch a mongo container database. It will also launch Prometheus and Grafana containers to monitor the webservice. You should be able to access everything from here:
 - [Webapp - http://localhost:3000](http://localhost:3000)
 
 
If you want to run it without docker. Compile and run the the webapp:

```shell
cd webapp
npm install
npm start
```

You should be able to access the application in [http://localhost:3000](http://localhost:3000).

## More information
You can get more information about the repository in the other README files:
- Documentation: https://github.com/arquisoft/lomap_es4c/tree/master/docs
- Webapp: https://github.com/arquisoft/lomap_es4c/tree/master/webapp



