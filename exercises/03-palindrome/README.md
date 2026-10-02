# Palíndromo

**Bloque:** coding · **Nivel:** Fácil

Devuelve true si el texto es palíndromo, ignorando mayúsculas, espacios y signos de puntuación.

> **Interview prompt:** Return true if the input is a palindrome, ignoring case, spaces and punctuation.

### Ejemplo 1

**Entrada**

```
s = "A man, a plan, a canal: Panama"
```

**Salida esperada**

```
true
```

Sin espacios ni signos queda "amanaplanacanalpanama", que se lee igual al revés.

### Ejemplo 2

**Entrada**

```
s = "race a car"
```

**Salida esperada**

```
false
```

"raceacar" al revés es "racaecar".

### Ejemplo 3

**Entrada**

```
s = ""
```

**Salida esperada**

```
true
```

Un texto vacío se considera palíndromo.

### Reglas y casos borde

- Ignora mayúsculas/minúsculas.
- Ignora todo lo que no sea letra o dígito (espacios, comas, dos puntos…).

<details><summary>Pista: guía paso a paso</summary>

Normaliza (minúsculas + solo letras/dígitos) y compara con dos punteros.

1. Normaliza: pasa a minúsculas y quédate solo con letras y dígitos.
2. Pon un puntero al inicio (i) y otro al final (j).
3. Mientras i < j, compara los caracteres; si son distintos devuelve false.
4. Avanza i y retrocede j. Si terminas el loop, devuelve true.

</details>

**Follow-up:** Can you do it in O(1) extra space?

## Java

### Documentación para estudiar

- [`Character.isLetterOrDigit()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Character.html) — Saltar signos y espacios.
- [`Character.toLowerCase()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Character.html) — Comparar sin mayúsculas.
- [`String.replaceAll() con regex`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html) — Alternativa: s.replaceAll("[^A-Za-z0-9]", "")

### Plantilla

```java
public class Main {
    public static boolean isPalindrome(String s) {
        // your code
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));
        System.out.println(isPalindrome("race a car"));
    }
}
```

<details><summary>Solución de referencia</summary>

```java
public static boolean isPalindrome(String s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
        while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
        if (Character.toLowerCase(s.charAt(i++)) != Character.toLowerCase(s.charAt(j--))) return false;
    }
    return true;
}
```

</details>

## Python

### Documentación para estudiar

- [`str.isalnum()`](https://docs.python.org/es/3/library/stdtypes.html#str.isalnum) — ¿Es letra o dígito?
- [`str.lower()`](https://docs.python.org/es/3/library/stdtypes.html#str.lower) — Minúsculas.
- [`Slicing [::-1]`](https://docs.python.org/es/3/library/stdtypes.html#common-sequence-operations) — Invertir una secuencia (aquí sí se permite).

### Plantilla

```python
def is_palindrome(s):
    # your code
    pass

print(is_palindrome('A man, a plan, a canal: Panama'))
```

### Tests

- `is_palindrome('A man, a plan, a canal: Panama')` → `True`
- `is_palindrome('race a car')` → `False`
- `is_palindrome('')` → `True`

<details><summary>Solución de referencia</summary>

```python
def is_palindrome(s):
    c = [ch.lower() for ch in s if ch.isalnum()]
    return c == c[::-1]
```

</details>

## TypeScript

### Documentación para estudiar

- [`String.prototype.toLowerCase()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) — Minúsculas.
- [`String.prototype.replace() con regex`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace) — s.replace(/[^a-z0-9]/g, "")
- [`Expresiones regulares`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions) — Clases de caracteres [^...]
- [`Tipos básicos de TypeScript`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — number[], string, tipos de retorno.
- [`Funciones en TypeScript`](https://www.typescriptlang.org/docs/handbook/2/functions.html) — Tipar parámetros y resultado.

### Plantilla

```ts
function isPalindrome(s: string): boolean {
  // your code
}

console.log(isPalindrome('A man, a plan, a canal: Panama'));
```

<details><summary>Solución de referencia</summary>

```ts
function isPalindrome(s: string): boolean {
  const c = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (let i = 0, j = c.length - 1; i < j; i++, j--) {
    if (c[i] !== c[j]) return false;
  }
  return true;
}
```

</details>

## JavaScript

### Documentación para estudiar

- [`String.prototype.toLowerCase()`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) — Minúsculas.
- [`String.prototype.replace() con regex`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace) — s.replace(/[^a-z0-9]/g, "")
- [`Expresiones regulares`](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions) — Clases de caracteres [^...]

### Plantilla

```js
function isPalindrome(s) {
  // your code
}

console.log(isPalindrome('A man, a plan, a canal: Panama'));
```

### Tests

- `isPalindrome('A man, a plan, a canal: Panama')` → `true`
- `isPalindrome('race a car')` → `false`
- `isPalindrome('')` → `true`
- `isPalindrome('Anita lava la tina')` → `true`
