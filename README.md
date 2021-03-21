# aem-project

### Resources

#### Archetype 24

* [AEM Maven Project Button Component](https://jimfrenette.com/aem/components/aem-button-component/)

#### Archetype 23

* [AEM Maven Project Message Component](https://jimfrenette.com/aem/components/aem-message-component/)
* [AEM Maven Project Copyright Component](https://jimfrenette.com/aem/components/aem-copyright-component/)
* [AEM Maven Project Archetype 23](https://jimfrenette.com/2020/02/aem-maven-project-archetype-23/)

#### Archetype 22

* [AEM Maven Project](https://jimfrenette.com/2019/10/aem-maven-project/)
* [AEM Maven Project Part II](https://jimfrenette.com/2020/01/aem-maven-project-part-2/)

### Docker Dispatcher

Given that `appId="myproject"` was used when creating the archetype project.

Build the docker image
```bash
cd src/myproject

docker build \
    -t myproject/dispatcher:latest \
    --build-arg MODULE_URL=https://download.macromedia.com/dispatcher/download/dispatcher-apache2.4-linux-x86_64-4.3.3.tar.gz \
    .
```

After starting the publish instance, if needed, build and deploy `myproject` to publish instance running on port 4503
```bash
mvn -PautoInstallPackage -Daem.port=4503 clean install
```

validate `myproject` running on publish
http://localhost:4503/content/myproject/us/en.html

```bash
docker-compose up -d
```

validate `myproject` running on dispatcher:
http://myproject.mycompany.local/content/myproject/us/en.html

For more info, https://blogs.perficient.com/2021/01/05/setting-up-a-local-aem-dispatcher-with-docker/