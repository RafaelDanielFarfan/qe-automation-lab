# Segundo mayor distinto

**Bloque:** coding · **Nivel:** Media

Devuelve el segundo valor más grande distinto. Si no existe, null (None).

> **Interview prompt:** Return the second largest distinct value in the array, or null if it doesn't exist.

### Ejemplo 1

**Entrada**

```
nums = [5, 1, 5, 3]
```

**Salida esperada**

```
3
```

Valores distintos: 5, 3, 1. El segundo mayor es 3 (el 5 repetido no cuenta dos veces).

### Ejemplo 2

**Entrada**

```
nums = [-1, -5, -3]
```

**Salida esperada**

```
-3
```

### Ejemplo 3

**Entrada**

```
nums = [7, 7, 7]
```

**Salida esperada**

```
null  (None en Python)
```

Solo hay un valor distinto.

### Reglas y casos borde

- "Distinto" significa ignorar repeticiones del máximo.
- Array vacío o con un solo valor distinto → null / None.

<details><summary>Pista: guía paso a paso</summary>

Una sola pasada con dos variables: first y second. Cuidado con duplicados del máximo.

1. Usa dos variables: first (el mayor) y second (el segundo mayor), empezando vacías / -∞.
2. Para cada n: si n > first, el antiguo first pasa a second y n pasa a first.
3. Si no, y n < first y n > second, actualiza second.
4. Los iguales al máximo se ignoran (así cumples "distinto").
5. Al final, si second sigue vacío devuelve null / None.

</details>

**Follow-up:** What edge cases would you test for this function?

## Java

### Documentación para estudiar

- [`Integer (wrapper) y null`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html) — Usar Integer permite representar "no hay valor".

### Plantilla

```java
import java.util.*;

public class Main {
    public static Integer secondLargest(int[] nums) {
        // your code
        return null;
    }

    public static void main(String[] args) {
        System.out.println(secondLargest(new int[]{5, 1, 5, 3}));
        System.out.println(secondLargest(new int[]{7, 7, 7}));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static Integer secondLargest(int[] nums) {
    Integer first = null, second = null;
    for (int n : nums) {
        if (first == null || n > first) { second = first; first = n; }
        else if (n < first && (second == null || n > second)) second = n;
    }
    return second;
}
```

</details>

## Python

### Documentación para estudiar

- [`set() y sorted(reverse=True)`](https://docs.python.org/es/3/library/functions.html#sorted) — Alternativa corta: valores distintos ordenados de mayor a menor.
- [`float("-inf")`](https://docs.python.org/es/3/library/functions.html#float) — Valor inicial más pequeño que cualquier número.

### Plantilla

```python
def second_largest(nums):
    # your code
    pass

print(second_largest([5, 1, 5, 3]))
```

### Tests

- `second_largest([5,1,5,3])` → `3`
- `second_largest([7,7,7])` → `None`
- `second_largest([-1,-5,-3])` → `-3`

<details><summary>Solución de referencia</summary>

```python
def second_largest(nums):
    distinct = sorted(set(nums), reverse=True)
    return distinct[1] if len(distinct) > 1 else None
```

</details>

## TypeScript

### Documentación para estudiar

- [`-Infinity`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Infinity) — Valor inicial más pequeño que cualquier número.
- [`Union types: number | null`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) — Tipar un resultado opcional.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function secondLargest(nums: number[]): number | null {
  // your code
}

console.log(secondLargest([5, 1, 5, 3]));
```

<details><summary>Solución de referencia</summary>

```ts
function secondLargest(nums: number[]): number | null {
  let first = -Infinity, second = -Infinity;
  for (const n of nums) {
    if (n > first) { second = first; first = n; }
    else if (n < first && n > second) second = n;
  }
  return second === -Infinity ? null : second;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`-Infinity`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Infinity) — Valor inicial más pequeño que cualquier número.

### Plantilla

```js
function secondLargest(nums) {
  // your code
}

console.log(secondLargest([5, 1, 5, 3]));
```

### Tests

- `secondLargest([5,1,5,3])` → `3`
- `secondLargest([7,7,7])` → `null`
- `secondLargest([])` → `null`
- `secondLargest([-1,-5,-3])` → `-3`
