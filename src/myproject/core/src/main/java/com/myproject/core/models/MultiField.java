package com.myproject.core.models;

import java.util.Iterator;

import org.apache.sling.api.resource.Resource;

public interface MultiField {
    public Iterator<Resource> getItemsList();
}