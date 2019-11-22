## Classes

<dl>
<dt><a href="#WidgetBase">WidgetBase</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#saveDocument">saveDocument</a></dt>
<dd><p>Save a Mendix file document</p></dd>
<dt><a href="#entityIsPersistable">entityIsPersistable</a></dt>
<dd><p>Is Entity persistent or not</p></dd>
<dt><a href="#entityIsImage">entityIsImage</a></dt>
<dd><p>Is Entity an instance of a System.Image or not</p></dd>
<dt><a href="#entityIsFileDocument">entityIsFileDocument</a></dt>
<dd><p>Is Entity an instance of a System.FileDocument or not</p></dd>
<dt><a href="#objectIsPersistable">objectIsPersistable</a></dt>
<dd><p>Return whether or not a Mendix object is persistable or not</p></dd>
<dt><a href="#executeMicroflow">executeMicroflow</a></dt>
<dd><p>Execute a microflow as Promise</p></dd>
<dt><a href="#executeNanoFlow">executeNanoFlow</a></dt>
<dd><p>Execute a Nanoflow as Promise</p></dd>
<dt><a href="#openPage">openPage</a></dt>
<dd><p>Open a page</p></dd>
<dt><a href="#executeAction">executeAction</a></dt>
<dd><p>Execute an action</p></dd>
<dt><a href="#debug">debug</a></dt>
<dd><p>Mendix debugger console</p></dd>
<dt><a href="#createObject">createObject</a></dt>
<dd><p>Create a Mendix Object</p></dd>
<dt><a href="#commitObject">commitObject</a></dt>
<dd><p>Commit a Mendix Object</p></dd>
<dt><a href="#deleteObjectGuid">deleteObjectGuid</a></dt>
<dd><p>Delete a Mendix Object based on Guid</p></dd>
<dt><a href="#deleteObject">deleteObject</a></dt>
<dd><p>Delete a Mendix Object</p></dd>
<dt><a href="#getObject">getObject</a></dt>
<dd><p>Get a Mendix Object</p></dd>
<dt><a href="#getObjects">getObjects</a></dt>
<dd><p>Get a list of Mendix Objects</p></dd>
<dt><a href="#fetchAttr">fetchAttr</a></dt>
<dd><p>Fetch an attribute from a Mendix Object</p></dd>
<dt><a href="#getObjectContext">getObjectContext</a></dt>
<dd><p>Get context for a Mendix Object, used in actions</p></dd>
<dt><a href="#fetchByXPath">fetchByXPath</a></dt>
<dd><p>Fetch Mendix objects over an XPath</p></dd>
</dl>

<a name="WidgetBase"></a>

## WidgetBase
**Kind**: global class  

* [WidgetBase](#WidgetBase)
    * [new WidgetBase()](#new_WidgetBase_new)
    * [.getContext](#WidgetBase.getContext)
    * [.debug](#WidgetBase.debug)

<a name="new_WidgetBase_new"></a>

### new WidgetBase()
<p>Widget base with convenient methods for building widgets fast</p>

<a name="WidgetBase.getContext"></a>

### WidgetBase.getContext
<p>Get a new context, used for actions</p>

**Kind**: static property of [<code>WidgetBase</code>](#WidgetBase)  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object (optional)</p> |

<a name="WidgetBase.debug"></a>

### WidgetBase.debug
<p>Log messages in your widget for debugging. Uses the Mendix logger (set to loglevel.DEBUG)</p>

**Kind**: static property of [<code>WidgetBase</code>](#WidgetBase)  

| Param | Description |
| --- | --- |
| args | <p>Arguments to pass down the Mendix Logger</p> |

<a name="saveDocument"></a>

## saveDocument
<p>Save a Mendix file document</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| name | <p>File name</p> |
| file | <p>Blob</p> |
| obj | <p>Mendix Object (FileDocument)</p> |

<a name="entityIsPersistable"></a>

## entityIsPersistable
<p>Is Entity persistent or not</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| entity | <p>Entity name</p> |

<a name="entityIsImage"></a>

## entityIsImage
<p>Is Entity an instance of a System.Image or not</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| entity | <p>Entity name</p> |

<a name="entityIsFileDocument"></a>

## entityIsFileDocument
<p>Is Entity an instance of a System.FileDocument or not</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| entity | <p>Entity name</p> |

<a name="objectIsPersistable"></a>

## objectIsPersistable
<p>Return whether or not a Mendix object is persistable or not</p>

**Kind**: global variable  

| Param | Description |
| --- | --- |
| obj | <p>Mendix object</p> |

<a name="executeMicroflow"></a>

## executeMicroflow
<p>Execute a microflow as Promise</p>

**Kind**: global variable  
**Category**: Actions  

| Param | Description |
| --- | --- |
| microflow | <p>Microflow name</p> |
| context | <p>Context in which the microflow is ececuted. This is populated by the Mendix Object that is passed down to the microflow</p> |
| origin | <p>The mxform that is part of the widget that executes the microflow</p> |
| showError | <p>Show a Mendix error or not</p> |

<a name="executeNanoFlow"></a>

## executeNanoFlow
<p>Execute a Nanoflow as Promise</p>

**Kind**: global variable  
**Category**: Actions  

| Param | Description |
| --- | --- |
| nanoflow | <p>Nanoflow</p> |
| context | <p>Context in which the microflow is ececuted. This is populated by the Mendix Object that is passed down to the microflow</p> |
| origin | <p>The mxform that is part of the widget that executes the microflow</p> |
| showError | <p>Show a Mendix error or not</p> |

<a name="openPage"></a>

## openPage
<p>Open a page</p>

**Kind**: global variable  
**Category**: Actions  

| Param | Description |
| --- | --- |
| pageAction | <p>Page action containing the <code>pageName</code> and optional <code>openAs</code></p> |
| context | <p>Context that is provided to the page. This is tied to an object</p> |
| showError | <p>Show a Mendix error or not</p> |

<a name="executeAction"></a>

## executeAction
<p>Execute an action</p>

**Kind**: global variable  
**Category**: Actions  

| Param | Description |
| --- | --- |
| action | <p>Action object</p> |
| showError | <p>Show error in ui or not</p> |
| context | <p>Context for the action</p> |
| mxform | <p>Form coming from the widget</p> |

<a name="debug"></a>

## debug
<p>Mendix debugger console</p>

**Kind**: global variable  
**Category**: Debug  

| Param | Description |
| --- | --- |
| id | <p>ID for the debugger, coming from the widget (const id = this.props.friendlyId || this.widgetId;)</p> |

<a name="createObject"></a>

## createObject
<p>Create a Mendix Object</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| entity | <p>Entity type for the created object</p> |

<a name="commitObject"></a>

## commitObject
<p>Commit a Mendix Object</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| mxobj | <p>Mendix Object that will be committed to the server</p> |

<a name="deleteObjectGuid"></a>

## deleteObjectGuid
<p>Delete a Mendix Object based on Guid</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| guid | <p>Object guid of the deleted object</p> |

<a name="deleteObject"></a>

## deleteObject
<p>Delete a Mendix Object</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object</p> |

<a name="getObject"></a>

## getObject
<p>Get a Mendix Object</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| guid | <p>Object guid of the Mendix Object that you try to return</p> |

<a name="getObjects"></a>

## getObjects
<p>Get a list of Mendix Objects</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| guid | <p>Object guid of the Mendix Object that you try to return</p> |

<a name="fetchAttr"></a>

## fetchAttr
<p>Fetch an attribute from a Mendix Object</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object</p> |
| attr | <p>Attribute</p> |

<a name="getObjectContext"></a>

## getObjectContext
<p>Get context for a Mendix Object, used in actions</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| obj | <p>Mendix Object</p> |

<a name="fetchByXPath"></a>

## fetchByXPath
<p>Fetch Mendix objects over an XPath</p>

**Kind**: global variable  
**Category**: Objects  

| Param | Description |
| --- | --- |
| contextObject | <p>Mendix Object</p> |
| entityName | <p>Entity name for the xpath (//EntityName[Constraint])</p> |
| constraint | <p>Constraint</p> |

