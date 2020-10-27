(function ($, $document, Coral) {
    $document.on("dialog-ready", function() {

        console.log('====== DIALOG READY ======');

        var carsdata = [];

        $.getJSON("/etc.clientlibs/myproject/clientlibs/clientlib-base/resources/data/cars.json").done(function(data) {
            carsdata = data.cars;
            console.log(carsdata);
        });

        const form = document.querySelector('form.cq-dialog');
        const cars = form.querySelector('[data-granite-coral-multifield-name="./cars"]');
        const carsAdd = cars.querySelector('button[coral-multifield-add]');

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

        carsAdd.addEventListener('click', function() {
            // allow time for coral to inject field
            setTimeout(function(){
                const nodes = cars.querySelectorAll('coral-multifield-item');
                var index = nodes.length - 1,
                    last = nodes[index],
                    makes = last.querySelector(`coral-select[name="./make"]`);
                populateMakes(makes);
            }, 1000);
        });


    });

 })($, $(document), Coral);