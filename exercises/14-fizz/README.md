# FizzBuzz

**Bloque:** coding · **Nivel:** Warm-up

Devuelve una lista de 1 a n: 'Fizz' si es múltiplo de 3, 'Buzz' de 5, 'FizzBuzz' de ambos; si no, el número como string.

> **Interview prompt:** Return a list from 1 to n with Fizz/Buzz/FizzBuzz rules; other numbers as strings.

### Ejemplo 1

**Entrada**

```
n = 5
```

**Salida esperada**

```
["1", "2", "Fizz", "4", "Buzz"]
```

### Ejemplo 2

**Entrada**

```
n = 15  (último elemento)
```

**Salida esperada**

```
"FizzBuzz"
```

15 es múltiplo de 3 y de 5.

### Ejemplo 3

**Entrada**

```
n = 0
```

**Salida esperada**

```
[]
```

### Reglas y casos borde

- Múltiplo de 3 → "Fizz"; de 5 → "Buzz"; de ambos → "FizzBuzz".
- Los demás números van como texto: "1", no 1.

<details><summary>Pista: guía paso a paso</summary>

Comprueba primero el múltiplo de 15.

1. Recorre k desde 1 hasta n (incluido).
2. Comprueba primero si k es múltiplo de 15 (de 3 y de 5).
3. Luego múltiplo de 3 → "Fizz", de 5 → "Buzz".
4. Si no, agrega el número convertido a texto.

</details>

**Follow-up:** How would you make the rules configurable (Open/Closed principle)?

## Java

### Documentación para estudiar

- [`ArrayList`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ArrayList.html) — add() para construir la lista.
- [`String.valueOf()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html) — Convertir int a String.

### Plantilla

```java
import java.util.*;

public class Main {
    public static List<String> fizzBuzz(int n) {
        // your code
        return new ArrayList<>();
    }

    public static void main(String[] args) {
        System.out.println(fizzBuzz(15));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static List<String> fizzBuzz(int n) {
    List<String> out = new ArrayList<>();
    for (int k = 1; k <= n; k++) {
        if (k % 15 == 0) out.add("FizzBuzz");
        else if (k % 3 == 0) out.add("Fizz");
        else if (k % 5 == 0) out.add("Buzz");
        else out.add(String.valueOf(k));
    }
    return out;
}
```

</details>

## Python

### Documentación para estudiar

- [`range(1, n + 1)`](https://docs.python.org/es/3/library/stdtypes.html#range) — El final es exclusivo.
- [`str()`](https://docs.python.org/es/3/library/stdtypes.html#str) — Convertir a texto.

### Plantilla

```python
def fizz_buzz(n):
    # your code
    pass

print(fizz_buzz(15))
```

### Tests

- `fizz_buzz(5)` → `['1','2','Fizz','4','Buzz']`
- `fizz_buzz(15)[14]` → `'FizzBuzz'`
- `fizz_buzz(0)` → `[]`

<details><summary>Solución de referencia</summary>

```python
def fizz_buzz(n):
    out = []
    for k in range(1, n + 1):
        s = ('Fizz' if k % 3 == 0 else '') + ('Buzz' if k % 5 == 0 else '')
        out.append(s or str(k))
    return out
```

</details>

## TypeScript

### Documentación para estudiar

- [`Array.from()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from) — Array.from({ length: n }, (_, i) => ...)
- [`String()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/String) — Convertir número a texto.
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function fizzBuzz(n: number): string[] {
  // your code
}

console.log(fizzBuzz(15));
```

<details><summary>Solución de referencia</summary>

```ts
function fizzBuzz(n: number): string[] {
  return Array.from({ length: n }, (_, i) => {
    const k = i + 1;
    return k % 15 === 0 ? 'FizzBuzz' : k % 3 === 0 ? 'Fizz' : k % 5 === 0 ? 'Buzz' : String(k);
  });
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`Array.from()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from) — Array.from({ length: n }, (_, i) => ...)
- [`String()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/String) — Convertir número a texto.

### Plantilla

```js
function fizzBuzz(n) {
  // your code
}

console.log(fizzBuzz(15));
```

### Tests

- `fizzBuzz(5)` → `['1','2','Fizz','4','Buzz']`
- `fizzBuzz(15)[14]` → `'FizzBuzz'`
- `fizzBuzz(0)` → `[]`
