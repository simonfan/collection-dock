YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "collectionDock"
    ],
    "modules": [
        "attach",
        "attach.initialize",
        "collection-dock",
        "event-hanlders",
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
            "displayName": "event-hanlders",
            "name": "event-hanlders",
            "description": "Defines the event handler for 'add' events on the collection."
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