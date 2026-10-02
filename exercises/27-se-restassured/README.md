# REST Assured: crear y validar usuario

**Bloque:** selenium · **Nivel:** API

Con REST Assured: POST /users con JSON, valida 201, que el body tenga id y email correcto, luego GET /users/{id} y valida 200 y el nombre.

> **Interview prompt:** Use REST Assured to create a user, validate status and body, then fetch it by id.

### Qué debe incluir tu solución

1. POST /users con body JSON { name, email } → statusCode 201.
2. Validar que id no es null y que email es el enviado.
3. Extraer el id y hacer GET /users/{id} → 200 y name correcto.

<details><summary>Pista: guía paso a paso</summary>

given().contentType(JSON).body(map).when().post("/users").then().statusCode(201).extract().path("id")

1. given(): baseUri, contentType(JSON) y body(map).
2. when().post("/users").
3. then(): statusCode(201) y body("campo", matcher).
4. extract().path("id") para usar el id en el GET siguiente.

</details>

**Follow-up:** How would you validate the response against a JSON schema?

## Java

### Documentación para estudiar

- [`REST Assured: Usage`](https://github.com/rest-assured/rest-assured/wiki/Usage) — given / when / then, extract.
- [`Hamcrest matchers`](https://hamcrest.org/JavaHamcrest/tutorial) — equalTo, notNullValue…

### Plantilla

```java
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import io.restassured.http.ContentType;
import org.testng.annotations.Test;
import java.util.Map;

public class UserApiTest {

    @Test
    public void createAndFetchUser() {
        // your code
    }
}
```

<details><summary>Solución de referencia</summary>

```java
@Test
public void createAndFetchUser() {
    Map<String, String> body = Map.of("name", "Maria", "email", "maria@test.com");
    String id = given().baseUri(BASE_URL).contentType(ContentType.JSON).body(body)
        .when().post("/users")
        .then().statusCode(201)
            .body("id", notNullValue())
            .body("email", equalTo("maria@test.com"))
        .extract().path("id");

    given().baseUri(BASE_URL)
        .when().get("/users/{id}", id)
        .then().statusCode(200).body("name", equalTo("Maria"));
}
```

</details>
