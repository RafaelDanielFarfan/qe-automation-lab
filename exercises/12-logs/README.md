# Parsear logs de CI

**Bloque:** coding · **Nivel:** Media

Cada línea tiene el formato "LEVEL [module] message". Devuelve cuántos ERROR hay por módulo.

> **Interview prompt:** Each log line looks like "LEVEL [module] message". Return the number of ERROR lines per module.

### Ejemplo 1

**Entrada**

```
lines = [
  "INFO [auth] user logged in",
  "ERROR [cart] timeout after 30000ms",
  "ERROR [cart] element not found",
  "WARN [search] slow response",
  "ERROR [auth] 401 Unauthorized",
  "garbage line"
]
```

**Salida esperada**

```
{ cart: 2, auth: 1 }
```

Solo se cuentan las líneas ERROR. "garbage line" no tiene formato válido y se ignora.

### Ejemplo 2

**Entrada**

```
lines = ["INFO [x] ok"]
```

**Salida esperada**

```
{ }
```

### Reglas y casos borde

- Formato: NIVEL [módulo] mensaje.
- Ignora líneas mal formadas sin lanzar error.

<details><summary>Pista: guía paso a paso</summary>

Regex: ^(\w+) \[(.+?)\]. Solo cuenta si LEVEL === 'ERROR'.

1. Define una regex que capture el nivel y el módulo: ^(\w+) \[(.+?)\]
2. Para cada línea, aplica la regex; si no coincide, ignórala.
3. Si el nivel capturado es ERROR, suma 1 al módulo capturado en un mapa.
4. Devuelve el mapa.

</details>

**Follow-up:** How would you make this robust to malformed lines?

## Java

### Documentación para estudiar

- [`Pattern y Matcher`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html) — Pattern.compile() una vez; matcher.find() y group(n).
- [`Map.merge()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html) — Contar por módulo.

### Plantilla

```java
import java.util.*;
import java.util.regex.*;

public class Main {
    public static Map<String, Integer> errorsByModule(List<String> lines) {
        // your code
        return new HashMap<>();
    }

    public static void main(String[] args) {
        System.out.println(errorsByModule(List.of(
            "ERROR [cart] timeout", "INFO [auth] ok", "ERROR [cart] 500")));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
private static final Pattern P = Pattern.compile("^(\\w+) \\[(.+?)\\]");
public static Map<String, Integer> errorsByModule(List<String> lines) {
    Map<String, Integer> out = new HashMap<>();
    for (String line : lines) {
        Matcher m = P.matcher(line);
        if (m.find() && m.group(1).equals("ERROR")) out.merge(m.group(2), 1, Integer::sum);
    }
    return out;
}
```

</details>

## Python

### Documentación para estudiar

- [`Módulo re: re.match()`](https://docs.python.org/es/3/library/re.html#re.match) — m.group(1), m.group(2).
- [`Raw strings r"..."`](https://docs.python.org/es/3/library/re.html#raw-string-notation) — Evitan escapar dos veces las barras.

### Plantilla

```python
import re

def errors_by_module(lines):
    # your code
    pass

print(errors_by_module(['ERROR [cart] timeout', 'INFO [auth] ok']))
```

### Tests

- `errors_by_module(LINES)` → `{'cart':2,'auth':1}`
- `errors_by_module([])` → `{}`

<details><summary>Solución de referencia</summary>

```python
import re

def errors_by_module(lines):
    out = {}
    for line in lines:
        m = re.match(r'^(\w+) \[(.+?)\]', line)
        if m and m.group(1) == 'ERROR':
            out[m.group(2)] = out.get(m.group(2), 0) + 1
    return out
```

</details>

## TypeScript

### Documentación para estudiar

- [`String.prototype.match()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match) — Devuelve null o un array con los grupos.
- [`Expresiones regulares`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions) — Grupos de captura ( ).
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function errorsByModule(lines: string[]): Record<string, number> {
  // your code
}

console.log(errorsByModule(['ERROR [cart] timeout', 'INFO [auth] ok']));
```

<details><summary>Solución de referencia</summary>

```ts
function errorsByModule(lines: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const line of lines) {
    const m = line.match(/^(\w+) \[(.+?)\]/);
    if (m && m[1] === 'ERROR') out[m[2]] = (out[m[2]] ?? 0) + 1;
  }
  return out;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`String.prototype.match()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/match) — Devuelve null o un array con los grupos.
- [`Expresiones regulares`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions) — Grupos de captura ( ).

### Plantilla

```js
function errorsByModule(lines) {
  // your code
}

console.log(errorsByModule([
  'INFO [auth] user logged in',
  'ERROR [cart] timeout after 30000ms',
  'ERROR [cart] element not found',
  'WARN [search] slow response',
  'ERROR [auth] 401 Unauthorized',
]));
```

### Tests

- `errorsByModule(LINES)` → `{cart:2,auth:1}`
- `errorsByModule([])` → `{}`
- `errorsByModule(['INFO [x] ok'])` → `{}`
