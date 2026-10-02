# javac-17.jar

`jdk.compiler` + `java.compiler` module classes extracted from Eclipse Temurin
OpenJDK 17.0.20.1+1 (`jmod extract` on `jmods/jdk.compiler.jmod` and
`jmods/java.compiler.jmod`, repackaged as a flat jar). Used as the classpath
for `com.sun.tools.javac.Main` running inside [CheerpJ](https://cheerpj.com)
so the Lab's Java exercises can compile and run entirely in the browser when
the app is not embedded in a Claude Artifact. Bumped from Java 11 to 17
because some exercises use `record` types (Java 16+ syntax).

OpenJDK is GPLv2 with the Classpath Exception, so redistributing these
compiled class files is permitted. Source: https://github.com/adoptium/temurin17-binaries
(release jdk-17.0.20.1+1, aarch64 mac build), extracted 2026-10-02.
