# JavaScript Type Notation (JSTN)

## Basic Types

- `any` / `*`
- `undefined` / `void`
- `null`
- `boolean`
- `number`
- `string`
- `CLASS`

<dl>
<dt><code>CLASS</code></dt>
<dd>A placeholder for a class name</dd>
</dl>

Example:

```
name: string
age: number
isMarried: boolean
birthDay: Date
```

## Complex Types

- `array` / `[...TYPE]` / `[TYPE, TYPE]` / `[TYPE, ...TYPE]`
- `object` / `{ ...[TYPE]: TYPE }` / `{ KEY: TYPE, KEY: TYPE }` / `{ KEY: TYPE, ...[TYPE]: TYPE }`
- `function` / `(...TYPE) => TYPE` / `(TYPE, TYPE) => TYPE` / `(TYPE, ...TYPE) => TYPE`
- `Class { KEY: TYPE, KEY: TYPE }` / `Class Extends CLASS { KEY: TYPE, KEY: TYPE }`

<dl>
<dt>Spread (<code>...</code>)</dt>
<dd>Indicates one or more item with the same definition.</dd>

<dt><code>TYPE</code></dt>
<dd>A placeholder for any basic or complex type.</dd>

<dt><code>KEY</code></dt>
<dd>A placeholder for a key or property/method name.</dd>

<dt><code>CLASS</code></dt>
<dd>A placeholder for a class name</dd>
</dl>

Example:

```
listOfNames: [...string]
productInfo: { 
	name: string
	quantity: number
	description: string
}
ProductClass: class {
	name: string
	quantity: number
	description: string
	construction: (string, number, string) => void
}
```

## Value Type

Use the actual value in the type definition. Use quotes around string values.

When used with mix type, this can be used to define an enumeration.

Example:

```
pi: 3.141592653589793238462643383279502884197
```

For arrays, objects and functions, wrap the value inside double angle brackets (`<<>>`).

```
arrayConstant: <<[true, true, false]>>
objecCconstant: <<{ 
  name: 'John,
  age: 20,
  birthDay: new Date('1995-12-17T03:24:00')
}>>
sum: <<(a, b) => a + b>>
```

## Mix Types

Use the pipe (`|`) symbol.

Example:

```
optionalNumberOrString: undefined|null|number|string
```

## Default Value In Function Arguments

Follow the type definition with the equal symbol (`=`) and the value.

Example:

```
sum: (number = 0, number = 0) => number
```

## Alias

Alias are type definition that is not mapped to an existing variable. Use title case.

Example:

```
AnyObject: { ...[any]: any }
AnyArray: [...any]
AnyFunction: (...any) => any
FalsyValue: undefined|null|false|0|''
```

## Comment

Add at the end with a double slash (`//`) prefix.

Example:

```
addInfo: ( // Function for adding info.
  name: string,                            // Name. Use something descriptive.
  quantity: number = 0,                    // Quantity. Defaults to 0.
  description: string|FalsyValue = null,   // Optional. Description. Defaults to null.
) => void
```
