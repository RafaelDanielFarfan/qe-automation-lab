# equals() y hashCode() en un User

**Bloque:** coding · **Nivel:** Media

Crea la clase User(email, name). Dos usuarios son iguales si tienen el mismo email ignorando mayúsculas. Demuestra que un HashSet no guarda duplicados.

> **Interview prompt:** Implement a User class where two users are equal if their emails match case-insensitively. Show that a HashSet de-duplicates them.

### Ejemplo 1

**Entrada**

```
new User("QA@example.com", "Maria")
new User("qa@example.com", "María P.")
```

**Salida esperada**

```
users.size() == 1
```

Mismo email ignorando mayúsculas → son el mismo usuario, aunque el nombre sea distinto.

### Reglas y casos borde

- Sobrescribe equals() y hashCode() usando el email.
- Ambos métodos deben normalizar el email de la misma forma.

<details><summary>Pista: guía paso a paso</summary>

Normaliza el email en el constructor o en equals y hashCode, de forma coherente.

1. En equals: si es el mismo objeto devuelve true; si no es un User devuelve false.
2. Compara los emails con equalsIgnoreCase().
3. En hashCode: calcula el hash del email normalizado en minúsculas.
4. Prueba en main que el HashSet queda con tamaño 1.

</details>

**Follow-up:** What happens if you override equals() but not hashCode()?

## Java

### Documentación para estudiar

- [`Object.equals() y hashCode()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Object.html) — Lee el "contrato" en la documentación de ambos métodos.
- [`instanceof con pattern matching`](https://docs.oracle.com/en/java/javase/21/language/pattern-matching-instanceof.html) — if (!(o instanceof User u)) return false;
- [`String.toLowerCase(Locale.ROOT)`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html) — Normalizar sin depender del idioma del sistema.

### Plantilla

```java
import java.util.*;

public class Main {
    static class User {
        private final String email;
        private final String name;

        User(String email, String name) {
            this.email = email;
            this.name = name;
        }

        // override equals and hashCode
    }

    public static void main(String[] args) {
        Set<User> users = new HashSet<>();
        users.add(new User("QA@example.com", "Maria"));
        users.add(new User("qa@example.com", "María P."));
        System.out.println(users.size()); // expected: 1
    }
}
```

<details><summary>Solución de referencia</summary>

```java
@Override public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof User other)) return false;
    return email.equalsIgnoreCase(other.email);
}
@Override public int hashCode() {
    return email.toLowerCase(Locale.ROOT).hashCode();
}
```

</details>
