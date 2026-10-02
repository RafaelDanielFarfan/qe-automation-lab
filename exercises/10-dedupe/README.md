# Quitar duplicados conservando orden

**Bloque:** coding · **Nivel:** Fácil

Elimina duplicados de una lista de strings conservando el orden de la primera aparición.

> **Interview prompt:** Remove duplicates from a list of strings, keeping the order of first appearance.

### Ejemplo 1

**Entrada**

```
items = ["login", "cart", "login", "checkout", "cart"]
```

**Salida esperada**

```
["login", "cart", "checkout"]
```

Se queda la primera aparición de cada uno, en su orden original.

### Ejemplo 2

**Entrada**

```
items = []
```

**Salida esperada**

```
[]
```

### Reglas y casos borde

- Conserva el orden de la primera aparición.
- No ordenes alfabéticamente.

<details><summary>Pista: guía paso a paso</summary>

Java: LinkedHashSet. JS: new Set mantiene orden de inserción. Python: dict.fromkeys.

1. Usa una estructura que no admita repetidos y que conserve el orden de inserción.
2. Inserta los elementos en orden.
3. Convierte el resultado de nuevo a lista.

</details>

**Follow-up:** What's the difference between HashSet, LinkedHashSet and TreeSet?

## Java

### Documentación para estudiar

- [`LinkedHashSet`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/LinkedHashSet.html) — Set sin duplicados que mantiene el orden de inserción.
- [`ArrayList(Collection)`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html) — new ArrayList<>(set) para volver a lista.

### Plantilla

```java
import java.util.*;

public class Main {
    public static List<String> dedupe(List<String> items) {
        // your code
        return items;
    }

    public static void main(String[] args) {
        System.out.println(dedupe(List.of("login", "cart", "login", "checkout", "cart")));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static List<String> dedupe(List<String> items) {
    return new ArrayList<>(new LinkedHashSet<>(items));
}
```

</details>

## Python

### Documentación para estudiar

- [`dict.fromkeys()`](https://docs.python.org/es/3/library/stdtypes.html#dict.fromkeys) — list(dict.fromkeys(items)) conserva el orden.

### Plantilla

```python
def dedupe(items):
    # your code
    pass

print(dedupe(['login', 'cart', 'login', 'checkout', 'cart']))
```

### Tests

- `dedupe(['login','cart','login','checkout','cart'])` → `['login','cart','checkout']`
- `dedupe([])` → `[]`

<details><summary>Solución de referencia</summary>

```python
def dedupe(items):
    return list(dict.fromkeys(items))
```

</details>

## TypeScript

### Documentación para estudiar

- [`Set`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set) — Mantiene el orden de inserción.
- [`Spread [...set]`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — Volver a array.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function dedupe(items: string[]): string[] {
  // your code
}

console.log(dedupe(['login', 'cart', 'login', 'checkout', 'cart']));
```

<details><summary>Solución de referencia</summary>

```ts
function dedupe(items: string[]): string[] {
  return [...new Set(items)];
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Set`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set) — Mantiene el orden de inserción.
- [`Spread [...set]`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — Volver a array.

### Plantilla

```js
function dedupe(items) {
  // your code
}

console.log(dedupe(['login', 'cart', 'login', 'checkout', 'cart']));
```

### Tests

- `dedupe(['login','cart','login','checkout','cart'])` → `['login','cart','checkout']`
- `dedupe([])` → `[]`
