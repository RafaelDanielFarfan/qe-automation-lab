# Encontrar duplicados

**Bloque:** coding · **Nivel:** Fácil

Devuelve los valores que aparecen más de una vez, sin repetir y ordenados ascendentemente.

> **Interview prompt:** Return the values that appear more than once, without repetition, sorted ascending.

### Ejemplo 1

**Entrada**

```
nums = [4, 3, 2, 7, 8, 2, 3, 1, 3]
```

**Salida esperada**

```
[2, 3]
```

El 2 aparece 2 veces y el 3 aparece 3 veces. Cada uno se devuelve una sola vez.

### Ejemplo 2

**Entrada**

```
nums = [10, -1, 10, -1, 5]
```

**Salida esperada**

```
[-1, 10]
```

Ordenado de menor a mayor.

### Ejemplo 3

**Entrada**

```
nums = [1, 2, 3]
```

**Salida esperada**

```
[]
```

### Reglas y casos borde

- Cada duplicado aparece una sola vez en el resultado.
- Resultado ordenado ascendentemente.

<details><summary>Pista: guía paso a paso</summary>

Dos sets: seen y duplicates. Al final ordena.

1. Crea dos sets: seen (ya vistos) y duplicates.
2. Recorre los números: si ya está en seen, agrégalo a duplicates; si no, a seen.
3. Convierte duplicates a lista y ordénala ascendentemente.
4. Complejidad: O(n) para recorrer + O(k log k) para ordenar.

</details>

**Follow-up:** Why a HashSet and not a List for 'seen'? What is the complexity of contains() in each?

## Java

### Documentación para estudiar

- [`HashSet.add()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashSet.html) — Devuelve false si el elemento ya existía: útil para detectar duplicados.
- [`TreeSet`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TreeSet.html) — Set que se mantiene ordenado automáticamente.

### Plantilla

```java
import java.util.*;

public class Main {
    public static List<Integer> findDuplicates(int[] nums) {
        // your code
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(findDuplicates(new int[]{4, 3, 2, 7, 8, 2, 3, 1, 3}));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static List<Integer> findDuplicates(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    Set<Integer> dup = new TreeSet<>();
    for (int n : nums) if (!seen.add(n)) dup.add(n);
    return new ArrayList<>(dup);
}
```

</details>

## Python

### Documentación para estudiar

- [`set`](https://docs.python.org/es/3/library/stdtypes.html#set-types-set-frozenset) — Membresía O(1) con "in".
- [`sorted()`](https://docs.python.org/es/3/library/functions.html#sorted) — Devuelve una lista ordenada nueva.

### Plantilla

```python
def find_duplicates(nums):
    # your code
    pass

print(find_duplicates([4, 3, 2, 7, 8, 2, 3, 1, 3]))
```

### Tests

- `find_duplicates([4,3,2,7,8,2,3,1,3])` → `[2,3]`
- `find_duplicates([1,2,3])` → `[]`
- `find_duplicates([10,-1,10,-1,5])` → `[-1,10]`

<details><summary>Solución de referencia</summary>

```python
def find_duplicates(nums):
    seen, dup = set(), set()
    for n in nums:
        (dup if n in seen else seen).add(n)
    return sorted(dup)
```

</details>

## TypeScript

### Documentación para estudiar

- [`Set`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set) — has() y add() en O(1).
- [`Array.prototype.sort() con comparador`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — Números: sort((a, b) => a - b). Sin comparador ordena como texto.
- [`Spread [...set]`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — Convertir un Set en array.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function findDuplicates(nums: number[]): number[] {
  // your code
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1, 3]));
```

<details><summary>Solución de referencia</summary>

```ts
function findDuplicates(nums: number[]): number[] {
  const seen = new Set<number>();
  const dup = new Set<number>();
  for (const n of nums) (seen.has(n) ? dup : seen).add(n);
  return [...dup].sort((a, b) => a - b);
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Set`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set) — has() y add() en O(1).
- [`Array.prototype.sort() con comparador`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) — Números: sort((a, b) => a - b). Sin comparador ordena como texto.
- [`Spread [...set]`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax) — Convertir un Set en array.

### Plantilla

```js
function findDuplicates(nums) {
  // your code
}

console.log(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1, 3]));
```

### Tests

- `findDuplicates([4,3,2,7,8,2,3,1,3])` → `[2,3]`
- `findDuplicates([1,2,3])` → `[]`
- `findDuplicates([10,-1,10,-1,5])` → `[-1,10]`
