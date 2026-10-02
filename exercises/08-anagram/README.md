# Anagramas

**Bloque:** coding · **Nivel:** Fácil

Devuelve true si dos palabras son anagramas (ignora mayúsculas y espacios).

> **Interview prompt:** Return true if two strings are anagrams of each other, ignoring case and spaces.

### Ejemplo 1

**Entrada**

```
a = "Listen", b = "Silent"
```

**Salida esperada**

```
true
```

Mismas letras, mismas cantidades.

### Ejemplo 2

**Entrada**

```
a = "Dormitory", b = "Dirty room"
```

**Salida esperada**

```
true
```

Se ignoran mayúsculas y espacios.

### Ejemplo 3

**Entrada**

```
a = "aab", b = "ab"
```

**Salida esperada**

```
false
```

La "a" aparece 2 veces en uno y 1 en el otro.

### Reglas y casos borde

- Ignora mayúsculas y espacios.
- Las cantidades de cada letra deben coincidir exactamente.

<details><summary>Pista: guía paso a paso</summary>

Ordenar ambos (O(n log n)) o contar con un mapa (O(n)).

1. Normaliza ambos textos: minúsculas y sin espacios.
2. Opción A (O(n log n)): ordena los caracteres de cada uno y compara.
3. Opción B (O(n)): cuenta caracteres del primero en un mapa y resta con el segundo; todo debe quedar en 0.
4. Si las longitudes normalizadas difieren, ya puedes devolver false.

</details>

**Follow-up:** Compare both approaches. Which one would you pick and why?

## Java

### Documentación para estudiar

- [`Arrays.sort(char[])`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html) — Ordenar caracteres.
- [`Arrays.equals()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html) — Comparar dos arrays elemento a elemento.

### Plantilla

```java
import java.util.*;

public class Main {
    public static boolean isAnagram(String a, String b) {
        // your code
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("Listen", "Silent"));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static boolean isAnagram(String a, String b) {
    char[] x = a.replace(" ", "").toLowerCase().toCharArray();
    char[] y = b.replace(" ", "").toLowerCase().toCharArray();
    Arrays.sort(x); Arrays.sort(y);
    return Arrays.equals(x, y);
}
```

</details>

## Python

### Documentación para estudiar

- [`sorted()`](https://docs.python.org/es/3/library/functions.html#sorted) — sorted("abc") devuelve una lista de caracteres.
- [`collections.Counter`](https://docs.python.org/es/3/library/collections.html#collections.Counter) — Counter(a) == Counter(b).

### Plantilla

```python
def is_anagram(a, b):
    # your code
    pass

print(is_anagram('Listen', 'Silent'))
```

### Tests

- `is_anagram('Listen','Silent')` → `True`
- `is_anagram('Dormitory','Dirty room')` → `True`
- `is_anagram('abc','abd')` → `False`

<details><summary>Solución de referencia</summary>

```python
def is_anagram(a, b):
    norm = lambda s: sorted(s.lower().replace(' ', ''))
    return norm(a) == norm(b)
```

</details>

## TypeScript

### Documentación para estudiar

- [`split / sort / join`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split) — s.split("").sort().join("")
- [`String.prototype.replace()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace) — Quitar espacios con /\s/g.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function isAnagram(a: string, b: string): boolean {
  // your code
}

console.log(isAnagram('Listen', 'Silent'));
```

<details><summary>Solución de referencia</summary>

```ts
function isAnagram(a: string, b: string): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/\s/g, '').split('').sort().join('');
  return norm(a) === norm(b);
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`split / sort / join`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split) — s.split("").sort().join("")
- [`String.prototype.replace()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace) — Quitar espacios con /\s/g.

### Plantilla

```js
function isAnagram(a, b) {
  // your code
}

console.log(isAnagram('Listen', 'Silent'));
```

### Tests

- `isAnagram('Listen','Silent')` → `true`
- `isAnagram('Dormitory','Dirty room')` → `true`
- `isAnagram('abc','abd')` → `false`
- `isAnagram('aab','ab')` → `false`
