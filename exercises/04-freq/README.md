# Frecuencia de caracteres

**Bloque:** coding · **Nivel:** Fácil

Devuelve un mapa con cuántas veces aparece cada carácter (ignora espacios).

> **Interview prompt:** Return a map with the count of each character in the string, ignoring spaces.

### Ejemplo 1

**Entrada**

```
s = "hello world"
```

**Salida esperada**

```
{ h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }
```

La "l" aparece 3 veces, la "o" 2 veces; el espacio no se cuenta.

### Ejemplo 2

**Entrada**

```
s = "aaa"
```

**Salida esperada**

```
{ a: 3 }
```

### Ejemplo 3

**Entrada**

```
s = ""
```

**Salida esperada**

```
{ }
```

Mapa vacío.

### Reglas y casos borde

- Distingue mayúsculas: "A" y "a" son caracteres distintos.
- No cuentes los espacios.
- El orden de las claves no importa para los tests.

<details><summary>Pista: guía paso a paso</summary>

Un HashMap / dict / objeto. En Java: map.merge(c, 1, Integer::sum).

1. Crea un mapa vacío: clave = carácter, valor = cantidad.
2. Recorre cada carácter del string.
3. Si es un espacio, sáltalo (continue).
4. Si el carácter ya está en el mapa, suma 1; si no, ponlo en 1.
5. Devuelve el mapa.

</details>

**Follow-up:** How would you return the most frequent character? What if there's a tie?

## Java

### Documentación para estudiar

- [`HashMap / LinkedHashMap`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) — LinkedHashMap mantiene el orden de inserción.
- [`Map.merge()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html) — map.merge(c, 1, Integer::sum) suma 1 o inicializa en 1.
- [`String.toCharArray()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html) — Recorrer carácter por carácter.

### Plantilla

```java
import java.util.*;

public class Main {
    public static Map<Character, Integer> charFrequency(String s) {
        // your code
        return new HashMap<>();
    }

    public static void main(String[] args) {
        System.out.println(charFrequency("hello world"));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static Map<Character, Integer> charFrequency(String s) {
    Map<Character, Integer> freq = new LinkedHashMap<>();
    for (char c : s.toCharArray()) {
        if (c != ' ') freq.merge(c, 1, Integer::sum);
    }
    return freq;
}
```

</details>

## Python

### Documentación para estudiar

- [`dict y dict.get()`](https://docs.python.org/es/3/library/stdtypes.html#dict.get) — freq.get(c, 0) + 1
- [`collections.Counter`](https://docs.python.org/es/3/library/collections.html#collections.Counter) — Lo resuelve en una línea (menciónalo en la entrevista).

### Plantilla

```python
def char_frequency(s):
    # your code
    pass

print(char_frequency('hello world'))
```

### Tests

- `char_frequency('hello world')` → `{'h':1,'e':1,'l':3,'o':2,'w':1,'r':1,'d':1}`
- `char_frequency('')` → `{}`

<details><summary>Solución de referencia</summary>

```python
def char_frequency(s):
    freq = {}
    for c in s:
        if c != ' ':
            freq[c] = freq.get(c, 0) + 1
    return freq
```

</details>

## TypeScript

### Documentación para estudiar

- [`for...of`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of) — Recorre los caracteres de un string.
- [`Objetos como diccionario`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_objects) — freq[c] = (freq[c] ?? 0) + 1
- [`Nullish coalescing ??`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) — Valor por defecto si es undefined.
- [`Record<K, V>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) — Tipo para objetos clave → valor.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function charFrequency(s: string): Record<string, number> {
  // your code
}

console.log(charFrequency('hello world'));
```

<details><summary>Solución de referencia</summary>

```ts
function charFrequency(s: string): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const c of s) {
    if (c === ' ') continue;
    freq[c] = (freq[c] ?? 0) + 1;
  }
  return freq;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`for...of`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for...of) — Recorre los caracteres de un string.
- [`Objetos como diccionario`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_objects) — freq[c] = (freq[c] ?? 0) + 1
- [`Nullish coalescing ??`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing) — Valor por defecto si es undefined.

### Plantilla

```js
function charFrequency(s) {
  // return an object like { a: 2, b: 1 }
}

console.log(charFrequency('hello world'));
```

### Tests

- `charFrequency('hello world')` → `{h:1,e:1,l:3,o:2,w:1,r:1,d:1}`
- `charFrequency('')` → `{}`
- `charFrequency('aaa')` → `{a:3}`
