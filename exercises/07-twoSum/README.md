# Two Sum

**Bloque:** coding · **Nivel:** Media

Devuelve los índices de los dos números que suman el objetivo. Si no existen, devuelve un array vacío.

> **Interview prompt:** Given an array and a target, return the indices of the two numbers that add up to the target, or an empty array.

### Ejemplo 1

**Entrada**

```
nums = [2, 7, 11, 15], target = 9
```

**Salida esperada**

```
[0, 1]
```

nums[0] + nums[1] = 2 + 7 = 9.

### Ejemplo 2

**Entrada**

```
nums = [3, 2, 4], target = 6
```

**Salida esperada**

```
[1, 2]
```

2 + 4 = 6. No vale usar el 3 dos veces.

### Ejemplo 3

**Entrada**

```
nums = [1, 2], target = 10
```

**Salida esperada**

```
[]
```

Ningún par suma 10.

### Reglas y casos borde

- Devuelve índices (posiciones), no valores.
- No puedes usar el mismo elemento dos veces.
- Índice menor primero.
- Objetivo: O(n) con un mapa.

<details><summary>Pista: guía paso a paso</summary>

Un mapa valor → índice. Para cada n, busca target - n antes de insertar n.

1. Crea un mapa: valor → índice donde lo viste.
2. Para cada posición i, calcula el complemento: target - nums[i].
3. Si el complemento ya está en el mapa, devuelve [índiceDelComplemento, i].
4. Si no, guarda nums[i] → i en el mapa y sigue.
5. Si terminas el recorrido, devuelve un array vacío.

</details>

**Follow-up:** The brute force is O(n²). Explain why the map version is O(n).

## Java

### Documentación para estudiar

- [`HashMap<Integer, Integer>`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/HashMap.html) — get() devuelve null si la clave no existe.

### Plantilla

```java
import java.util.*;

public class Main {
    public static int[] twoSum(int[] nums, int target) {
        // your code
        return new int[0];
    }

    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9)));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> idx = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        Integer j = idx.get(target - nums[i]);
        if (j != null) return new int[]{j, i};
        idx.put(nums[i], i);
    }
    return new int[0];
}
```

</details>

## Python

### Documentación para estudiar

- [`enumerate()`](https://docs.python.org/es/3/library/functions.html#enumerate) — Recorrer índice y valor a la vez.
- [`dict y operador in`](https://docs.python.org/es/3/library/stdtypes.html#mapping-types-dict) — Búsqueda O(1).

### Plantilla

```python
def two_sum(nums, target):
    # your code
    pass

print(two_sum([2, 7, 11, 15], 9))
```

### Tests

- `two_sum([2,7,11,15],9)` → `[0,1]`
- `two_sum([3,2,4],6)` → `[1,2]`
- `two_sum([1,2],10)` → `[]`

<details><summary>Solución de referencia</summary>

```python
def two_sum(nums, target):
    idx = {}
    for i, n in enumerate(nums):
        if target - n in idx:
            return [idx[target - n], i]
        idx[n] = i
    return []
```

</details>

## TypeScript

### Documentación para estudiar

- [`Map`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map) — get() devuelve undefined si no existe.
- [`Igualdad estricta`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Strict_inequality) — Compara con !== undefined (el índice 0 es falsy).
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function twoSum(nums: number[], target: number): number[] {
  // your code
}

console.log(twoSum([2, 7, 11, 15], 9));
```

<details><summary>Solución de referencia</summary>

```ts
function twoSum(nums: number[], target: number): number[] {
  const idx = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const j = idx.get(target - nums[i]);
    if (j !== undefined) return [j, i];
    idx.set(nums[i], i);
  }
  return [];
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Map`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Map) — get() devuelve undefined si no existe.
- [`Igualdad estricta`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Strict_inequality) — Compara con !== undefined (el índice 0 es falsy).

### Plantilla

```js
function twoSum(nums, target) {
  // your code
}

console.log(twoSum([2, 7, 11, 15], 9));
```

### Tests

- `twoSum([2,7,11,15],9)` → `[0,1]`
- `twoSum([3,2,4],6)` → `[1,2]`
- `twoSum([3,3],6)` → `[0,1]`
- `twoSum([1,2],10)` → `[]`
