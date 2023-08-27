(function ($, $document, Coral) {
    $document.on("dialog-ready", function() {

        console.log('====== DIALOG READY ======');

        const form = document.querySelector('form.cq-dialog');

        var carsfield = {},
            carsdata = [];

        function getCars() {
            $.ajax({
                url: `/etc.clientlibs/myproject/clientlibs/clientlib-base/resources/data/cars.json`,
                async: true,
                dataType: 'json',
                success: function (data) {
                    carsdata = data.cars;
                }
            });
        }

        function getContent(i) {
            var content = {};
            $.ajax({
                url: `${form.action}/cars/item${i}.json`,
                async: false,
                dataType: 'json',
                success: function (data) {
                    content.make = data.make;
                    content.model = data.model;
                }
            });
            return content;
        }

        function getElementIndex(node) {
            var index = 0;
            while ( (node = node.previousElementSibling) ) {
                index++;
            }
            return index;
        }

        function getModels(make) {
            for (var i = 0, len = carsdata.length; i < len; ++i) {
                if (make == carsdata[i].make) {
                    return carsdata[i].models;
                }
            }
        }

        function populateModel(select, make) {
            var models = getModels(make);
            Coral.commons.ready(select, function (component) {
                component.items.clear();
                models.forEach(function (model) {
                    var option = document.createElement('coral-select-item');
                    option.textContent = model;
                    component.items.add(option);
                });
            });
        }

        /**
         * @param {*} select (element)
         * @param {*} content (jcr:content)
         */
        function populateItem(select, key, content) {
            for (var i = 0, len = carsdata.length; i < len; ++i) {
                if (key == 'make') {
                    var option = document.createElement('coral-select-item');
                    option.textContent = carsdata[i].make
                    select.appendChild(option);
                } else if (content.make == carsdata[i].make) { // models
                    carsdata[i].models.forEach(function (model) {
                        var option = document.createElement('coral-select-item');
                        option.textContent = model;
                        select.appendChild(option);
                    });
                }
            }

            Coral.commons.ready(select, function (component) {
                if (key == 'make') {
                    if (content) {
                        component.value = content.make;
                    }
                    component.addEventListener('change', function(evt) {
                        // cascade selection
                        var item = select.closest('[role=listitem]');
                        var i = getElementIndex(item);
                        var select2 = item.querySelector(`coral-select[name="./cars/item${i}/./model"]`);
                        populateModel(select2, component.value);
                    });
                } else if (content) {
                    component.value = content.model;
                }
            });
        }

        function populateItems() {
            for (var i = 0, len = carsfield.items.length; i < len; ++i) {
                var content = getContent(i);
                var select1 = carsfield.items[i].querySelector(`coral-select[name="./cars/item${i}/./make"]`);
                populateItem(select1, 'make', content);
                var select2 = carsfield.items[i].querySelector(`coral-select[name="./cars/item${i}/./model"]`);
                populateItem(select2, 'model', content);
            }
        }

        function init() {
            try {
                carsfield.root = form.querySelector('[data-granite-coral-multifield-name="./cars"]');
                carsfield.add = carsfield.root.querySelector('button[coral-multifield-add]');
                carsfield.items = carsfield.root.querySelectorAll('coral-multifield-item');
            }
            catch(err) {
                console.log(err.message + ', likely due to N/A component');
                return;
            }

            getCars();

            if (carsfield.items) {
                // give coral a sec to inject fields
                setTimeout(function(){
                    populateItems();
                }, 500);
            }

            carsfield.add.addEventListener('click', function() {
                // give coral a sec to inject fields
                setTimeout(function(){
                    carsfield.items = carsfield.root.querySelectorAll('coral-multifield-item');
                    var index = carsfield.items.length - 1,
                        select = carsfield.items[index].querySelector(`coral-select[name="./cars/item${index}/./make"]`);
                    populateItem(select, 'make', null);
                }, 500);
            });
        }

        init();
    });

 })($, $(document), Coral);