/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
new hobs.TestSuite("myproject Tests", {path:"/apps/myproject/tests/SampleTests.js", register: true})

    .addTestCase(new hobs.TestCase("Hello World component on english page")
        .navigateTo("/content/myproject/en.html")
        .asserts.location("/content/myproject/en.html", true)
        .asserts.visible(".helloworld", true)
    )

    .addTestCase(new hobs.TestCase("Hello World component on french page")
        .navigateTo("/content/myproject/fr.html")
        .asserts.location("/content/myproject/fr.html", true)
        .asserts.visible(".helloworld", true)
    );
