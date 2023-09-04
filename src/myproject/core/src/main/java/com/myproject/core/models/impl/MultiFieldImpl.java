package com.myproject.core.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import com.myproject.core.models.MultiField;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Collections;
import java.util.Iterator;

@Model(adaptables = SlingHttpServletRequest.class, adapters = MultiField.class)
public final class MultiFieldImpl implements MultiField {

	private Iterator<Resource> nodesItemList;

	@Inject
	private String multifieldNodeName;

	@Inject
	private Resource resource;

	@PostConstruct
	public void activate() {
		nodesItemList = Collections.emptyIterator();

		Resource multiFieldNode = resource.getChild(multifieldNodeName);
		if (multiFieldNode != null) {
			nodesItemList = multiFieldNode.listChildren();
		}
	}

	public Iterator<Resource> getItemsList() {
		return nodesItemList;
	}

}
