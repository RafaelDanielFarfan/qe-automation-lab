# Agrupar tests por suite (map/reduce)

**Bloque:** coding · **Nivel:** Media

Recibes [{suite, name}]. Devuelve un objeto suite → lista de nombres, conservando el orden. Usa reduce en JS/TS.

> **Interview prompt:** Group test cases by suite: return an object mapping suite to the list of test names.

### Ejemplo 1

**Entrada**

```
cases = [
  { suite: "auth", name: "login ok" },
  { suite: "cart", name: "add item" },
  { suite: "auth", name: "logout" }
]
```

**Salida esperada**

```
{
  auth: ["login ok", "logout"],
  cart: ["add item"]
}
```

Cada suite agrupa los nombres de sus tests, en el orden original.

### Ejemplo 2

**Entrada**

```
cases = []
```

**Salida esperada**

```
{ }
```

### Reglas y casos borde

- Dentro de cada suite conserva el orden de entrada.
- En JS/TS intenta resolverlo con reduce; en Java con Collectors.groupingBy.

<details><summary>Pista: guía paso a paso</summary>

reduce con acumulador {} y (acc[s] ??= []).push(name). En Java: Collectors.groupingBy.

1. Empieza con un objeto / mapa vacío.
2. Para cada caso, si su suite no existe en el mapa, créala con una lista vacía.
3. Agrega el name a la lista de su suite.
4. Devuelve el mapa.

</details>

**Follow-up:** Write the Java version with Streams and explain groupingBy + mapping.

## Java

### Documentación para estudiar

- [`Collectors.groupingBy()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html) — groupingBy(clasificador, LinkedHashMap::new, downstream)
- [`Collectors.mapping()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html) — Transformar cada elemento (TestCase → name) dentro del grupo.

### Plantilla

```java
import java.util.*;
import java.util.stream.*;

public class Main {
    record TestCase(String suite, String name) {}

    public static Map<String, List<String>> groupBySuite(List<TestCase> cases) {
        // your code using Streams
        return new HashMap<>();
    }

    public static void main(String[] args) {
        System.out.println(groupBySuite(List.of(
            new TestCase("auth", "login ok"),
            new TestCase("cart", "add item"),
            new TestCase("auth", "logout"))));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static Map<String, List<String>> groupBySuite(List<TestCase> cases) {
    return cases.stream().collect(Collectors.groupingBy(
        TestCase::suite, LinkedHashMap::new,
        Collectors.mapping(TestCase::name, Collectors.toList())));
}
```

</details>

## Python

### Documentación para estudiar

- [`dict.setdefault()`](https://docs.python.org/es/3/library/stdtypes.html#dict.setdefault) — out.setdefault(suite, []).append(name)
- [`collections.defaultdict`](https://docs.python.org/es/3/library/collections.html#collections.defaultdict) — Alternativa sin setdefault.

### Plantilla

```python
def group_by_suite(cases):
    # your code
    pass

```

### Tests

- `group_by_suite([{'suite':'auth','name':'login ok'},{'suite':'cart','name':'add item'},{'suite':'auth','name':'logout'}])` → `{'auth':['login ok','logout'],'cart':['add item']}`

<details><summary>Solución de referencia</summary>

```python
def group_by_suite(cases):
    out = {}
    for c in cases:
        out.setdefault(c['suite'], []).append(c['name'])
    return out
```

</details>

## TypeScript

### Documentación para estudiar

- [`Array.prototype.reduce()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — Acumulador {} que vas llenando.
- [`Asignación lógica nula ??=`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment) — (acc[s] ??= []).push(name)
- [`Desestructuración`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring) — ({ suite, name }) en los parámetros.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
interface TestCase { suite: string; name: string }

function groupBySuite(cases: TestCase[]): Record<string, string[]> {
  // your code
}

```

<details><summary>Solución de referencia</summary>

```ts
function groupBySuite(cases: TestCase[]): Record<string, string[]> {
  return cases.reduce<Record<string, string[]>>((acc, { suite, name }) => {
    (acc[suite] ??= []).push(name);
    return acc;
  }, {});
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Array.prototype.reduce()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) — Acumulador {} que vas llenando.
- [`Asignación lógica nula ??=`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment) — (acc[s] ??= []).push(name)
- [`Desestructuración`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring) — ({ suite, name }) en los parámetros.

### Plantilla

```js
function groupBySuite(cases) {
  // your code
}

console.log(groupBySuite([
  { suite: 'auth', name: 'login ok' },
  { suite: 'cart', name: 'add item' },
  { suite: 'auth', name: 'logout' },
]));
```

### Tests

- `groupBySuite([{suite:'auth',name:'login ok'},{suite:'cart',name:'add item'},{suite:'auth',name:'logout'}])` → `{auth:['login ok','logout'],cart:['add item']}`
- `groupBySuite([])` → `{}`
