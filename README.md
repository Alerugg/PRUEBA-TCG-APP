# AntiScamTcgApp

Web app en **Next.js** para estimar riesgo en compraventa de cartas TCG con presets de marketplace.

## Features

- Ruta `/tool` con presets: `wallapop`, `vinted`, `ebay`, `cardmarket`, `in_person`.
- Formulario sin texto libre (excepto `nota opcional`) con red flags ampliadas.
- Endpoint `POST /api/analyze` que:
  - Calcula score de riesgo `0-100` usando reglas JSON en `/rules/*.json`.
  - Devuelve `score`, `band`, `top_reasons` (máx. 5), `action_plan` (3 pasos), `messages` (3 variantes).
- UI de resultados con semáforo, razones, plan de acción, botones para copiar mensaje y share link, con diseño moderno dark silver.
- Validación de input con `zod`.
- Tests básicos del rule engine con `vitest`.

## Stack

- Next.js 14 (App Router)
- React 18
- Zod
- Vitest

## Cómo correrlo

```bash
npm install
npm run dev
```

Luego abre `http://localhost:3000/tool`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
```

## Estructura relevante

- `app/tool/page.js`: UI principal del toolkit.
- `app/api/analyze/route.js`: API de análisis.
- `lib/ruleEngine.js`: motor de reglas.
- `lib/validation.js`: validación de payload.
- `rules/*.json`: reglas por preset.
- `tests/ruleEngine.test.js`: tests del motor.

## Mejora aplicada

Además de los requisitos, se dejaron reglas por preset separadas y fáciles de ajustar para iterar sin tocar lógica de backend.


## Troubleshooting

Si al abrir el workspace aparece `bash: npm: command not found`, rebuild del contenedor: ahora Node/npm vienen instalados desde el Dockerfile del devcontainer.

1. Rebuild/Reopen del devcontainer (`Dev Containers: Rebuild and Reopen in Container`).
2. Verifica versiones:

```bash
node -v
npm -v
```

3. Si sigue fallando dentro del contenedor, ejecuta el fallback multi-plataforma del repo (sin `sudo`):

```bash
bash .devcontainer/bootstrap-node.sh
node -v
npm -v
```

4. Si Codespaces entra en **recovery mode**, suele ser un fallo de build del devcontainer.
   - Abre **View Creation Log**.
   - Ejecuta **Dev Containers: Rebuild Container**.
   - Cuando reabra, corre `bash .devcontainer/bootstrap-node.sh` y luego `npm install`.
