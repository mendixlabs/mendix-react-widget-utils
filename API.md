## Classes

<dl>
<dt><a href="#WidgetBase">WidgetBase</a></dt>
<dd><p>Widget base with convenient methods for building widgets fast</p></dd>
</dl>

## Members

<dl>
<dt><a href="#executeMicroflow">executeMicroflow</a></dt>
<dd><p>Execute a Nanoflow as Promise</p></dd>
<dt><a href="#executeNanoFlow">executeNanoFlow</a></dt>
<dd><p>Open a page</p></dd>
<dt><a href="#createObject">createObject</a></dt>
<dd><p>Commit a Mendix Object</p></dd>
<dt><a href="#commitObject">commitObject</a></dt>
<dd><p>Delete a Mendix Object based on Guid</p></dd>
<dt><a href="#deleteObjectGuid">deleteObjectGuid</a></dt>
<dd><p>Delete a Mendix Object</p></dd>
<dt><a href="#deleteObject">deleteObject</a></dt>
<dd><p>Get a Mendix Object</p></dd>
<dt><a href="#getObject">getObject</a></dt>
<dd><p>Fetch an attribute from a Mendix Object</p></dd>
<dt><a href="#fetchAttr">fetchAttr</a></dt>
<dd><p>Get context for a Mendix Object, used in actions</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#executeMicroflow">executeMicroflow(microflow, context, origin, showError)</a></dt>
<dd><p>Execute a microflow as Promise</p></dd>
<dt><a href="#createObject">createObject(entity)</a></dt>
<dd><p>Create a Mendix Object</p></dd>
</dl>

<a name="WidgetBase"></a>

## WidgetBase
<p>Widget base with convenient methods for building widgets fast</p>

**Kind**: global class  

* [WidgetBase](#WidgetBase)
    * [.getContext(obj)](#WidgetBase+getContext)
    * [.executeAction(action, showError, obj)](#WidgetBase+executeAction)
    * [.debug(...args)](#WidgetBase+debug)

<a name="WidgetBase+getContext"></a>

### widgetBase.getContext(obj)
<p>Get a new context, used for actions</p>

**Kind**: instance method of [<code>WidgetBase</code>](#WidgetBase)  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object (optional)</p> |

<a name="WidgetBase+executeAction"></a>

### widgetBase.executeAction(action, showError, obj)
<p>Execute an Action as a Promise</p>

**Kind**: instance method of [<code>WidgetBase</code>](#WidgetBase)  

| Param | Default | Description |
| --- | --- | --- |
| action |  | <p>Action contains a microflow/nanoflow/page</p> |
| showError | <code>false</code> | <p>When an error occurs in the executed action, show it using <code>mx.ui.error</code></p> |
| obj |  | <p>Optional: Mendix object. If this is omitted, it will assume to use the context object of the widget</p> |

<a name="WidgetBase+debug"></a>

### widgetBase.debug(...args)
<p>Log messages in your widget for debugging. Uses the Mendix logger (set to loglevel.DEBUG)</p>

**Kind**: instance method of [<code>WidgetBase</code>](#WidgetBase)  

| Param | Description |
| --- | --- |
| ...args | <p>Arguments to pass down the Mendix Logger</p> |

<a name="executeMicroflow"></a>

## executeMicroflow
<p>Execute a Nanoflow as Promise</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| nanoflow | <p>Nanoflow</p> |
| context | <p>Context in which the microflow is ececuted. This is populated by the Mendix Object that is passed down to the microflow</p> |
| origin | <p>The mxform that is part of the widget that executes the microflow</p> |
| showError | <p>Show a Mendix error or not</p> |

<a name="executeNanoFlow"></a>

## executeNanoFlow
<p>Open a page</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| pageAction | <p>Page action containing the <code>pageName</code> and optional <code>openAs</code></p> |
| context | <p>Context that is provided to the page. This is tied to an object</p> |
| showError | <p>Show a Mendix error or not</p> |

<a name="createObject"></a>

## createObject
<p>Commit a Mendix Object</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| mxobj | <p>Mendix Object that will be committed to the server</p> |

<a name="commitObject"></a>

## commitObject
<p>Delete a Mendix Object based on Guid</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| guid | <p>Object guid of the deleted object</p> |

<a name="deleteObjectGuid"></a>

## deleteObjectGuid
<p>Delete a Mendix Object</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object</p> |

<a name="deleteObject"></a>

## deleteObject
<p>Get a Mendix Object</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| guid | <p>Object guid of the Mendix Object that you try to return</p> |

<a name="getObject"></a>

## getObject
<p>Fetch an attribute from a Mendix Object</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object</p> |
| attr | <p>Attribute</p> |

<a name="fetchAttr"></a>

## fetchAttr
<p>Get context for a Mendix Object, used in actions</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object</p> |

<a name="executeMicroflow"></a>

## executeMicroflow(microflow, context, origin, showError)
<p>Execute a microflow as Promise</p>

**Kind**: global function  

| Param | Default | Description |
| --- | --- | --- |
| microflow |  | <p>Microflow name</p> |
| context |  | <p>Context in which the microflow is ececuted. This is populated by the Mendix Object that is passed down to the microflow</p> |
| origin |  | <p>The mxform that is part of the widget that executes the microflow</p> |
| showError | <code>false</code> | <p>Show a Mendix error or not</p> |

<a name="createObject"></a>

## createObject(entity)
<p>Create a Mendix Object</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| entity | <p>Entity type for the created object</p> |

