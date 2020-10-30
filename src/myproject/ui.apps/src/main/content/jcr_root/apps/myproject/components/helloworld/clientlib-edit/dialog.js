(function ($, $document, Coral) {
    $document.on("dialog-ready", function() {

        console.log('====== DIALOG READY ======');

        const form = document.querySelector('form.cq-dialog');

        var cars, carsAdd;
        var carsdata = [];
        var carscontent = [];

        function getCars() {
            $.getJSON("/etc.clientlibs/myproject/clientlibs/clientlib-base/resources/data/cars.json").done(function(data) {
                carsdata = data.cars;
                console.log(carsdata);
            });
        }

        function getSavedCars() {
            $.getJSON(form.action + '.json').done(function(data) {

                // setMake(data.make);
            });
        }

        function setMakeItem(make, data) {
            makeItems = make.querySelectorAll(`coral-select-item`);
            Array.from(makeItems).forEach((el, index) => {
                if (data[index] == el.value) {
                    el.selected = true;
                }
            });
        }

        function setMake(data) {
            makes = form.querySelectorAll(`coral-select[name="./make"]`);
            Array.from(makes).forEach((el) => {
                setMakeItem(el, data);
            });
        }

        function populateMakes(makes) {
            const items = makes.querySelectorAll('coral-select-item');
            const inputHandle = makes.querySelector('input[handle]');

            for (var i = 0, len = carsdata.length; i < len; ++i) {
                var item = document.createElement('coral-select-item');
                item.textContent = carsdata[i].make;
                item.value = carsdata[i].make;
                makes.appendChild(item);
            }

            Coral.commons.ready(makes, function (component) {
                component.addEventListener('change', function(evt) {
                    console.log(inputHandle.value);
                });
            });
        }

        function init() {
            try {
                cars = form.querySelector('[data-granite-coral-multifield-name="./cars"]');
                carsAdd = cars.querySelector('button[coral-multifield-add]');
            }
            catch(err) {
                console.log(err.message + ', likely due to N/A component');
                return;
            }

            getSavedCars();
            getCars();

            carsAdd.addEventListener('click', function() {
                // allow time for coral to inject field
                setTimeout(function(){
                    const nodes = cars.querySelectorAll('coral-multifield-item');
                    var index = nodes.length - 1,
                        last = nodes[index],
                        makes = last.querySelector(`coral-select[name="./cars/item${index}/./make"]`);
                    populateMakes(makes);
                }, 1000);
            });
        }

        init();
    });

 })($, $(document), Coral);