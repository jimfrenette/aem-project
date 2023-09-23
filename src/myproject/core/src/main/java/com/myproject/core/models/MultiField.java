/*
 *  Example usage
 *
 *  <div data-sly-use.foo="${'com.myproject.core.models.MultiField' @ multifieldNodeName='foo'}"
 *       data-sly-test="${foo}" class="foo-container"
 *       data-sly-list.foo="${foo.itemsList}">
 *       ${foo.text @ context='html'}
 *  </div>
 */

package com.myproject.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.Collections;
import java.util.Iterator;

@Model(adaptables = SlingHttpServletRequest.class, adapters = MultiField.class)
public class MultiField {

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
