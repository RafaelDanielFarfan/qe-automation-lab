# Primer carácter no repetido

**Bloque:** coding · **Nivel:** Media

Devuelve el primer carácter que no se repite. Si no hay, devuelve null (None en Python).

> **Interview prompt:** Return the first non-repeating character in a string, or null if there is none.

### Ejemplo 1

**Entrada**

```
s = "swiss"
```

**Salida esperada**

```
"w"
```

s aparece 3 veces, w 1 vez, i 1 vez. La primera con 1 aparición, leyendo de izquierda a derecha, es "w".

### Ejemplo 2

**Entrada**

```
s = "keyboard"
```

**Salida esperada**

```
"k"
```

### Ejemplo 3

**Entrada**

```
s = "aabb"
```

**Salida esperada**

```
null  (None en Python)
```

Todos se repiten.

### Reglas y casos borde

- "Primero" se refiere a la posición en el string, no al orden alfabético.
- Si no hay ninguno, devuelve null / None.

<details><summary>Pista: guía paso a paso</summary>

Primera pasada: contar. Segunda pasada: el primero con conteo 1.

1. Primera pasada: cuenta cuántas veces aparece cada carácter en un mapa.
2. Segunda pasada: recorre el string de nuevo, en orden.
3. El primer carácter cuyo conteo sea 1 es la respuesta.
4. Si terminas sin encontrar ninguno, devuelve null / None.

</details>

**Follow-up:** Which Java Map keeps insertion order and why would it help here?

## Java

### Documentación para estudiar

- [`LinkedHashMap`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/LinkedHashMap.html) — Mantiene el orden de inserción: puedes recorrer entrySet().
- [`Map.merge()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html) — Contar ocurrencias.

### Plantilla

```java
import java.util.*;

public class Main {
    public static Character firstUnique(String s) {
        // your code
        return null;
    }

    public static void main(String[] args) {
        System.out.println(firstUnique("swiss"));
        System.out.println(firstUnique("aabb"));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static Character firstUnique(String s) {
    Map<Character, Integer> count = new LinkedHashMap<>();
    for (char c : s.toCharArray()) count.merge(c, 1, Integer::sum);
    for (Map.Entry<Character, Integer> e : count.entrySet())
        if (e.getValue() == 1) return e.getKey();
    return null;
}
```

</details>

## Python

### Documentación para estudiar

- [`dict (orden de inserción)`](https://docs.python.org/es/3/library/stdtypes.html#mapping-types-dict) — Desde Python 3.7 los dict conservan el orden.
- [`None`](https://docs.python.org/es/3/library/constants.html#None) — Valor de "no hay resultado".

### Plantilla

```python
def first_unique(s):
    # your code
    pass

print(first_unique('swiss'))
```

### Tests

- `first_unique('swiss')` → `'w'`
- `first_unique('aabb')` → `None`
- `first_unique('keyboard')` → `'k'`

<details><summary>Solución de referencia</summary>

```python
def first_unique(s):
    count = {}
    for c in s:
        count[c] = count.get(c, 0) + 1
    for c in s:
        if count[c] == 1:
            return c
    return None
```

</details>

## TypeScript

### Documentación para estudiar

- [`Map`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map) — get(), set() y orden de inserción garantizado.
- [`Union types: string | null`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) — Tipar un resultado que puede no existir.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function firstUnique(s: string): string | null {
  // your code
}

console.log(firstUnique('swiss'));
```

<details><summary>Solución de referencia</summary>

```ts
function firstUnique(s: string): string | null {
  const count = new Map<string, number>();
  for (const c of s) count.set(c, (count.get(c) ?? 0) + 1);
  for (const c of s) if (count.get(c) === 1) return c;
  return null;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Map`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map) — get(), set() y orden de inserción garantizado.

### Plantilla

```js
function firstUnique(s) {
  // your code
}

console.log(firstUnique('swiss'));
```

### Tests

- `firstUnique('swiss')` → `'w'`
- `firstUnique('aabb')` → `null`
- `firstUnique('keyboard')` → `'k'`
- `firstUnique('')` → `null`
