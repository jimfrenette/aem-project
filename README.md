# aem-project

## Branches

As of 2024, develop branch will be used for new work going forward. Tags created from develop are being used for blog post source code links. For example, [hellomultifield](https://github.com/jimfrenette/aem-project/releases/tag/hellomultifield)

When a component example such as [hellomultifield](https://github.com/jimfrenette/aem-project/releases/tag/hellomultifield) contains a new sling model that is a likely candidate for use in other components, it will also be in the master branch.

Aside from the above tagged commits in develop, these older branches still exists since they are linked to [jimfrenette.com](https://jimfrenette.com/) AEM posts.

* [coral-ui-3](https://github.com/jimfrenette/aem-project/tree/coral-ui-3)
* [feature/foldingpanel](https://github.com/jimfrenette/aem-project/tree/feature/foldingpanel "https://jimfrenette.com/aem/components/aem-foldingpanel-component/")
* [archetype-23-react](https://github.com/jimfrenette/aem-project/tree/archetype-23-react "https://jimfrenette.com/2020/04/aem-maven-project-react-part-1/")
* [feature/message](https://github.com/jimfrenette/aem-project/tree/feature/message "https://jimfrenette.com/aem/components/aem-message-component/")
* [stubdata](https://github.com/jimfrenette/aem-project/tree/stubdata "https://jimfrenette.com/aem/javascript-use-api-stub-data/")


### Resources

#### Archetype 43

* [AEM Maven Project Multifield Component](https://jimfrenette.com/aem/components/multifield-component/)

Step 1, backup previous archetype project. For example,
```
cd src

mv myproject myproject24
```

Step 2, create new archetype-project. For example
```
mvn -B org.apache.maven.plugins:maven-archetype-plugin:3.2.1:generate \
 -D archetypeGroupId=com.adobe.aem \
 -D archetypeArtifactId=aem-project-archetype \
 -D archetypeVersion=43 \
 -D aemVersion=6.5.0 \
 -D appTitle="My Project" \
 -D appId="myproject" \
 -D groupId="com.myproject" \
 -D language=en \
 -D country=us \
 -D singleCountry=n \
 -D frontendModule=general
```

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
If connection to registry-1.docker.io fails "unauthorized: incorrect username or password", use
```bash
docker logout
```
and retry the build


If you need to setup a publish instance ...

create publish folder and rename the aem distro quickstart jar
```bash
mkdir publish
cd publish

java -jar cq5-publish-p4503.jar -unpack
```

update the `crx-quickstart/bin/`**start** script to use the publish port, e.g.,
```bash
# TCP port used for stop and status scripts
if [ -z "$CQ_PORT" ]; then
    CQ_PORT=4503
fi
```
```bash
# runmode(s)
# will not be used if repository is already present
if [ -z "$CQ_RUNMODE" ]; then
    CQ_RUNMODE='publish'
fi
```

After starting the publish instance, if needed, build and deploy `myproject` to publish instance running on port 4503
```bash
mvn -PautoInstallPackage -Daem.port=4503 clean install
```

validate `myproject` running on publish
http://localhost:4503/content/myproject/us/en.html

update your hosts file to map 127.0.0.1 to the entries in `docker-compose.yml`
```bash
# AEM myproject dispatcher
127.0.0.1	author.mycompany.local
127.0.0.1	myproject.mycompany.local
```

Start the container
```bash
docker-compose up -d
```

validate `myproject` running on dispatcher:
http://myproject.mycompany.local/content/myproject/us/en.html

For more info, https://blogs.perficient.com/2021/01/05/setting-up-a-local-aem-dispatcher-with-docker/

### WSL2 Environment

Running AEM on the Windows file system while building and deploying code from WSL2 Linux.

* Add this [resolv.sh](https://gist.github.com/jimfrenette/21c7f19bc12c94c60628bebbf943a974) script to your WSL2 Linux.

* Run `resolv` anywhere given `$HOME/bin` is in your environment PATH. Place `resolv.sh` in the `/bin` directory and make it executable. e.g., `chmod +x resolv.sh`. Rename it resolv, e.g., `mv resolv.sh resolv`.

For example
```bash
> $ resolv                                                                                            ⬡ 14.18.1 [±archetype-43 ✓]
Enter hostname to add or update, e.g., win.localhost
HOSTNAME: win.localhost
192.168.96.1
win.localhost was not found in your /etc/hosts
Adding win.localhost to your /etc/hosts
[sudo] password for <user>:
win.localhost was added succesfully:
192.168.96.1 win.localhost
```

* Run AEM using Powershell
```
cd author\crx-quickstart\bin
> ./start.bat
```

* Maven build with `win.localhost` in our Linux `etc/hosts` file added / updated by the resolv script.
```bash
mvn -PautoInstallSinglePackage -Daem.host=win.localhost clean install
```

* [.repo](https://jimfrenette.com/2019/12/aem-developer-file-transfers/#aem-repo-tool) example.
```
server=http://win.localhost:4502
credentials=admin:admin
```