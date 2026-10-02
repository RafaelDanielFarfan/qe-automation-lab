# Filtrar pares sin mutar

**Bloque:** coding · **Nivel:** Warm-up

Dado un array de enteros, devuelve un array nuevo solo con los números pares, sin modificar el original.

> **Interview prompt:** Given an integer array, return a new array containing only the even numbers, without modifying the original array.

### Ejemplo 1

**Entrada**

```
nums = [1, 2, 3, 4, 5, 6]
```

**Salida esperada**

```
[2, 4, 6]
```

Solo se conservan los números divisibles entre 2, en el mismo orden.

### Ejemplo 2

**Entrada**

```
nums = [-3, -2, 0, 7]
```

**Salida esperada**

```
[-2, 0]
```

Los negativos pares y el 0 también son pares.

### Ejemplo 3

**Entrada**

```
nums = []
```

**Salida esperada**

```
[]
```

Array vacío → array vacío, sin error.

### Reglas y casos borde

- No modifiques el array original: después de llamar la función, nums debe seguir igual.
- Mantén el orden en que aparecen.
- Complejidad esperada: O(n).

<details><summary>Pista: guía paso a paso</summary>

Recorre una vez y agrega a una colección nueva. Ojo con los negativos: -2 % 2 === 0, pero -3 % 2 es -1 en Java y JS.

1. Crea una colección nueva y vacía: ahí irá el resultado (así no tocas la original).
2. Recorre cada número del array.
3. Comprueba si es par con el operador resto: n % 2 == 0.
4. Si es par, agrégalo a la colección nueva.
5. Devuelve la colección nueva. Bonus: hazlo en una línea con filter / stream / comprehension.

</details>

**Follow-up:** What is the time and space complexity? How would you do it with Streams?

## Java

### Documentación para estudiar

- [`Arrays.stream(int[])`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html) — Convierte el array en un IntStream.
- [`IntStream.filter() y toArray()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/IntStream.html) — Filtra y vuelve a int[].
- [`Operador % (resto)`](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op1.html) — n % 2 == 0 indica par.

### Plantilla

```java
import java.util.*;

public class Main {
    public static int[] filterEven(int[] nums) {
        // your code
        return new int[0];
    }

    public static void main(String[] args) {
        int[] input = {1, 2, 3, 4, 5, 6};
        System.out.println(Arrays.toString(filterEven(input)));
        System.out.println(Arrays.toString(input));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static int[] filterEven(int[] nums) {
    if (nums == null) return new int[0];
    return Arrays.stream(nums).filter(n -> n % 2 == 0).toArray();
}
```

</details>

## Python

### Documentación para estudiar

- [`List comprehensions`](https://docs.python.org/es/3/tutorial/datastructures.html#list-comprehensions) — [n for n in nums if ...]
- [`Operador % (módulo)`](https://docs.python.org/es/3/library/stdtypes.html#numeric-types-int-float-complex) — n % 2 == 0 indica par.

### Plantilla

```python
def filter_even(nums):
    # your code
    pass

print(filter_even([1, 2, 3, 4, 5, 6]))
```

### Tests

- `filter_even([1,2,3,4,5,6])` → `[2,4,6]`
- `filter_even([])` → `[]`
- `filter_even([-3,-2,0,7])` → `[-2,0]`

<details><summary>Solución de referencia</summary>

```python
def filter_even(nums):
    return [n for n in nums if n % 2 == 0]
```

</details>

## TypeScript

### Documentación para estudiar

- [`Array.prototype.filter()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) — Devuelve un array NUEVO; no muta el original.
- [`Operador resto %`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Remainder) — Ojo: -3 % 2 es -1.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function filterEven(nums: number[]): number[] {
  // your code
}

console.log(filterEven([1, 2, 3, 4, 5, 6]));
```

<details><summary>Solución de referencia</summary>

```ts
function filterEven(nums: number[]): number[] {
  return nums.filter(n => n % 2 === 0);
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Array.prototype.filter()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) — Devuelve un array NUEVO; no muta el original.
- [`Operador resto %`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Remainder) — Ojo: -3 % 2 es -1.

### Plantilla

```js
function filterEven(nums) {
  // your code
}

console.log(filterEven([1, 2, 3, 4, 5, 6]));
```

### Tests

- `filterEven([1,2,3,4,5,6])` → `[2,4,6]`
- `filterEven([])` → `[]`
- `filterEven([-3,-2,0,7])` → `[-2,0]`
- `(()=>{const a=[1,2,3,4];filterEven(a);return a})()` → `[1,2,3,4]`
