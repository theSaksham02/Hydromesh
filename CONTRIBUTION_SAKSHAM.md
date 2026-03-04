# Individual Statement - Saksham Mishra

## Part 1: Contribution Statement

I was responsible for implementing the Real-Time Flood Map (F-07) 
in the HydroMesh prototype. Specifically, I developed:

- Map rendering component using Flutter and flutter_map (Leaflet equivalent).
- Flood zone overlay visualization with risk-level color coding (Red for High Risk, Orange for Medium Risk).
- User location tracking and display mapping.
- Integration of mock api sensors onto the map visually.

My commits can be found in the GitLab repository under the main branch. I collaborated with the team to ensure the Map UI visually aligns with the main dashboard screens and accurately uses data structures defined for sensor node reporting.

Key challenges included optimizing map tile loading, handling API connections without a live backend, and visually translating lat/long coordinates onto custom drawn polygons, which I resolved by utilizing `flutter_map` PolygonLayers and creating an API simulation service.

## Part 2: Generative AI Statement

The following prompts were input into AI assistants (Gemini):

**Prompt:** "Create a flutter based application frontend at least, if I give you the github repo... Build out F-07 (The Real-Time Flood Map)"

**Output obtained:** Basic MapWidget class with tile layer setup, mock API dummy state, and unit tests.

**Modifications made:** I guided the specific implementation requirements, provided the exact grading rubric to ensure the map output explicitly mapped to feature F-07 requirements (colors, locations, mock markers), and triggered independent validation tests ensuring the map and layers rendered correctly without crashing. I exercised independent judgement by steering the iterative development and version control flow.