# Invertir un string

**Bloque:** coding · **Nivel:** Warm-up

Invierte un string sin usar métodos de reverse incorporados.

> **Interview prompt:** Reverse a string without using any built-in reverse method.

### Ejemplo 1

**Entrada**

```
s = "playwright"
```

**Salida esperada**

```
"thgirwyalp"
```

### Ejemplo 2

**Entrada**

```
s = "Ab C"
```

**Salida esperada**

```
"C bA"
```

Los espacios y las mayúsculas se mantienen, solo cambia el orden.

### Ejemplo 3

**Entrada**

```
s = ""
```

**Salida esperada**

```
""
```

### Reglas y casos borde

- Prohibido: reverse(), [::-1], reversed(), StringBuilder.reverse().
- Recorre con un índice o con dos punteros.

<details><summary>Pista: guía paso a paso</summary>

Dos punteros o recorrer desde el final. En Java, StringBuilder es eficiente; concatenar String en un loop es O(n²).

1. Crea un resultado vacío (string o lista de caracteres).
2. Recorre el string desde el último índice (length - 1) hasta 0.
3. Agrega cada carácter al resultado.
4. Alternativa: dos punteros (i al inicio, j al final) intercambiando en un array de caracteres.

</details>

**Follow-up:** Why is String concatenation in a loop slow in Java? What is StringBuilder?

## Java

### Documentación para estudiar

- [`String.charAt() / toCharArray()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html) — Acceder a cada carácter.
- [`StringBuilder.append()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/StringBuilder.html) — Construir strings en un loop de forma eficiente.

### Plantilla

```java
public class Main {
    public static String reverse(String s) {
        // your code
        return "";
    }

    public static void main(String[] args) {
        System.out.println(reverse("playwright"));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static String reverse(String s) {
    char[] c = s.toCharArray();
    for (int i = 0, j = c.length - 1; i < j; i++, j--) {
        char t = c[i]; c[i] = c[j]; c[j] = t;
    }
    return new String(c);
}
```

</details>

## Python

### Documentación para estudiar

- [`range() con paso negativo`](https://docs.python.org/es/3/library/stdtypes.html#range) — range(len(s) - 1, -1, -1)
- [`str.join()`](https://docs.python.org/es/3/library/stdtypes.html#str.join) — Unir una lista de caracteres.

### Plantilla

```python
def reverse_string(s):
    # your code (no s[::-1], no reversed)
    pass

print(reverse_string('playwright'))
```

### Tests

- `reverse_string('playwright')` → `'thgirwyalp'`
- `reverse_string('')` → `''`
- `reverse_string('Ab C')` → `'C bA'`

<details><summary>Solución de referencia</summary>

```python
def reverse_string(s):
    out = []
    for i in range(len(s) - 1, -1, -1):
        out.append(s[i])
    return ''.join(out)
```

</details>

## TypeScript

### Documentación para estudiar

- [`for clásico`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for) — for (let i = s.length - 1; i >= 0; i--)
- [`String: acceso por índice`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String#acceso_a_caracteres) — s[i] o s.charAt(i)
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function reverseString(s: string): string {
  // your code
}

console.log(reverseString('playwright'));
```

<details><summary>Solución de referencia</summary>

```ts
function reverseString(s: string): string {
  let out = '';
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`for clásico`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/for) — for (let i = s.length - 1; i >= 0; i--)
- [`String: acceso por índice`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String#acceso_a_caracteres) — s[i] o s.charAt(i)

### Plantilla

```js
function reverseString(s) {
  // your code
}

console.log(reverseString('playwright'));
```

### Tests

- `reverseString('playwright')` → `'thgirwyalp'`
- `reverseString('')` → `''`
- `reverseString('a')` → `'a'`
- `reverseString('Ab C')` → `'C bA'`
