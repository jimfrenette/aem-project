(function ($) {
    var CFM = window.Dam.CFM,
        MASTER = "master",
        CFM_EDITOR_SEL = ".content-fragment-editor",
        CORAL_MF_ITEM = "coral-multifield-item",
        EAEM_COMPOSITE_ITEM_VALUE = "data-eaem-composite-item-value",
        MF_NAME_ATTR = "data-granite-coral-multifield-name",
        COMPOSITE_MF_SEL = "[data-granite-coral-multifield-composite]";

    CFM.Core.registerReadyHandler(getMultifieldsContent);

    extendRequestSave();

    function getMultifieldsContent(){
        if(!compositeMutifieldsExist()){
            return;
        }

        var url = CFM.EditSession.fragment.urlBase + "/jcr:content/data.2.json";

        $.ajax(url).done(loadContentIntoMultiFields);
    }

    function loadContentIntoMultiFields(data){
        var $composites = $(COMPOSITE_MF_SEL), mfValArr, mfAddEle,
            vData = data[getVariation()], $lastItem;

        if(_.isEmpty(vData)){
            return;
        }

        _.each($composites, function(mField){
            mfValArr = vData[getNameDotSlashRemoved(($(mField)).attr(MF_NAME_ATTR))];

            if(_.isEmpty(mfValArr)){
                return;
            }

            mfAddEle = mField.querySelector("[coral-multifield-add]");

            _.each(mfValArr, function(mfMap){
                mfAddEle.click();

                $lastItem = $(mField).find(CORAL_MF_ITEM).last();

                $lastItem.attr(EAEM_COMPOSITE_ITEM_VALUE, mfMap);

                Coral.commons.ready($lastItem[0], function (lastItem) {
                    fillMultifieldItems(lastItem);
                });
            });
        });
    }

    function fillMultifieldItems(mfItem){
        if(mfItem == null){
            return;
        }

        var mfMap = mfItem.getAttribute(EAEM_COMPOSITE_ITEM_VALUE);

        if(_.isEmpty(mfMap)){
            return;
        }

        mfMap = JSON.parse(mfMap);

        _.each(mfMap, function(fValue, fKey){
            let field = mfItem.querySelector("[name$='" + fKey + "']");

            if(field == null){
                return;
            }

            setFieldValue(field, fValue);
        });
    }

    function setFieldValue(field, value){
        if( field.tagName == "CORAL-CHECKBOX"){
            field.checked = (field.getAttribute("value") == value);
        }else{
            field.value = value;
        }
    }

    function getVariation(){
        var variation = $(CFM_EDITOR_SEL).data('variation');

        variation = variation || "master";

        return variation;
    }

    function compositeMutifieldsExist(){
        return !_.isEmpty($(COMPOSITE_MF_SEL));
    }

    function extendRequestSave(){
        var orignFn = CFM.editor.Page.requestSave;

        CFM.editor.Page.requestSave = requestSave;

        function requestSave(callback, options) {
            orignFn.call(this, callback, options);

            if(!compositeMutifieldsExist()){
                return;
            }

            var mfsData = getMultifieldData();

            if(_.isEmpty(mfsData)){
                return;
            }

            var url = CFM.EditSession.fragment.urlBase + ".cfm.content.json",
                variation = getVariation(),
                createNewVersion = (options && !!options.newVersion) || false;

            var data = {
                ":type": "multiple",
                ":newVersion": createNewVersion,
                "_charset_": "utf-8"
            };

            if(variation !== MASTER){
                data[":variation"] = variation;
            }

            var request = {
                url: url,
                method: "post",
                dataType: "json",
                data: _.merge(data, mfsData),
                cache: false
            };

            CFM.RequestManager.schedule({
                request: request,
                type: CFM.RequestManager.REQ_BLOCKING,
                condition: CFM.RequestManager.COND_EDITSESSION,
                ui: (options && options.ui)
            })
        }
    }

    function getMultifieldData(){
        var $composites = $(COMPOSITE_MF_SEL), value,
            mfData = {}, values, $fields;

        _.each($composites, function(mField){
            values = [];

            _.each(mField.items.getAll(), function(item) {
                $fields = $(item.content).find("[name]");

                value = {};

                _.each($fields, function(field){
                    if(canbeSkipped(field)){
                        return;
                    }

                    value[getNameDotSlashRemoved(field.getAttribute("name"))] =  getFieldValue(field);
                });

                values.push(JSON.stringify(value));
            });

            mfData[ getNameDotSlashRemoved(($(mField)).attr(MF_NAME_ATTR))] = values;
        });

        return mfData;
    }

    function getFieldValue(field){
        var value;

        if(field.tagName == "CORAL-CHECKBOX"){
            value = field.checked ? field.getAttribute("value") : "";
        }else{
            value = field.value;
        }

        return value;
    }

    function canbeSkipped(field){
        return (($(field).attr("type") == "hidden") || (field.type == "checkbox"));
    }

    function getNameDotSlashRemoved(name){
        if(_.isEmpty(name)){
            return name;
        }

        var parts = name.split("/");
        return parts[parts.length-1];
    }


}(jQuery));