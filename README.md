# Quiz, Trivia, Flipcards y Encuestas con Drupal GraphQL

Este repositorio contiene un proyecto interactivo que ofrece una combinación de elementos: un quiz, trivia, flipcards (tarjetas volteables) y encuestas. Todo esto se alimenta de datos provenientes de una API GraphQL implementada en Drupal. En desarrollo...

## Características

*   **Diversidad de Contenido:**
    *   **Quiz:** Tests estructurados con preguntas y respuestas, para evaluar el conocimiento.
    *   **Trivia:** Datos interesantes y curiosos presentados de forma concisa.
    *   **Flipcards:** Tarjetas interactivas que muestran información al voltearse (ej: definición en un lado, término en el otro).
    *   **Encuestas:**  Recopilación de opiniones y feedback a través de preguntas de selección múltiple o abiertas.
*   **API GraphQL en Drupal:**  La aplicación consume datos desde una API GraphQL de Drupal, permitiendo una fácil gestión y actualización de contenido.
*   **Interfaz Amigable:** Diseño intuitivo y responsivo para una experiencia de usuario óptima en diferentes dispositivos.
*   **Personalización:**  Posibilidad de personalizar la apariencia y el comportamiento de los elementos (quiz, trivia, flipcards, encuestas) a través de la configuración.
*   **Integración con Drupal (Posible):**  Si el frontend se integra con Drupal, se puede utilizar la autenticación de Drupal y la personalización de perfiles.
*   **Resultados y Análisis (Opcional):**  Implementación de un sistema para guardar resultados de quiz y encuestas, y generar análisis de datos.


## Configuración y Ejecución



##  Uso

1.  **Navega por las secciones:**  Utiliza la interfaz para acceder a los elementos del proyecto: Quiz, Trivia, Flipcards, Encuestas.
2.  **Realiza el Quiz:** Responde a las preguntas y envía tus respuestas para ver tu puntuación.
3.  **Lee la Trivia:** Disfruta de los datos curiosos y la información interesante.
4.  **Explora las Flipcards:**  Voltea las tarjetas para descubrir la información oculta.
5.  **Completa las Encuestas:**  Responde a las preguntas y envía tus respuestas.

##  API GraphQL en Drupal

*   **Endpoint:**  `http://<TU_DRUPAL_URL>/graphql`  (o la URL que hayas configurado en el archivo `.env`).
*   **Documentación:**  Puedes acceder a la documentación de la API GraphQL (ej: usando GraphiQL o GraphQL Playground) en el endpoint especificado.  Explora el esquema y realiza consultas para comprender la estructura de los datos.
*   **Tipos de Contenido (Content Types) y Campos:**  Asegúrate de que Drupal tenga los tipos de contenido (content types) y campos necesarios para el quiz, trivia, flipcards y encuestas.  Esto incluye campos para las preguntas, respuestas, títulos, descripciones, etc.  La API GraphQL debe estar configurada para consultar estos campos.

