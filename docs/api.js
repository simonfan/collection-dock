YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "collectionDock"
    ],
    "modules": [
        "attach",
        "attach.exec",
        "attach.initialize",
        "collection-dock",
        "handle-add",
        "handle-add:actions",
        "handle-remove",
        "handle-remove:actions",
        "handle-reset",
        "handle-reset:actions",
        "handle-resort",
        "handle-resort:actions",
        "item",
        "proxy"
    ],
    "allModules": [
        {
            "displayName": "attach",
            "name": "attach",
            "description": "Defines methods that will be available\non dock instances."
        },
        {
            "displayName": "attach.exec",
            "name": "attach.exec",
            "description": "Defines an action runner."
        },
        {
            "displayName": "attach.initialize",
            "name": "attach.initialize",
            "description": "Initialization logic for attach."
        },
        {
            "displayName": "collection-dock",
            "name": "collection-dock",
            "description": "Object that connects data to the html."
        },
        {
            "displayName": "handle-add",
            "name": "handle-add",
            "description": "Defines the event handler for 'add' events on the collection."
        },
        {
            "displayName": "handle-add:actions",
            "name": "handle-add:actions",
            "description": "Defines a series of actions (steps)\nthat deal with adding models to the view."
        },
        {
            "displayName": "handle-remove",
            "name": "handle-remove",
            "description": "Defines the event handler for 'remove' events on the collection."
        },
        {
            "displayName": "handle-remove:actions",
            "name": "handle-remove:actions",
            "description": "Defines a series of actions (steps)\nthat deal with removing models from the view."
        },
        {
            "displayName": "handle-reset",
            "name": "handle-reset",
            "description": "Defines the event handler for 'reset' events on the collection."
        },
        {
            "displayName": "handle-reset:actions",
            "name": "handle-reset:actions",
            "description": "Defines a series of actions (steps)\nthat deal with resetting models to the view."
        },
        {
            "displayName": "handle-resort",
            "name": "handle-resort",
            "description": "Defines the event handler for 'resort' events on the collection."
        },
        {
            "displayName": "handle-resort:actions",
            "name": "handle-resort:actions",
            "description": "Defines a series of actions (steps)\nthat deal with resorting models of the view."
        },
        {
            "displayName": "item",
            "name": "item",
            "description": "Defines methods that generate item-related templates and data.\nMethods here should be overwritten for custom behaviour."
        },
        {
            "displayName": "proxy",
            "name": "proxy",
            "description": "Proxies methods to the collection, if it is present."
        }
    ]
} };
});